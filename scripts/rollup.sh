#!/usr/bin/env bash
# Viewership rollup: headline numbers, trend against the previous equal
# period, a per-day breakdown, and where the traffic came from.
#
#   ./scripts/rollup.sh          last 7 days
#   ./scripts/rollup.sh 1        last 24 hours
#   ./scripts/rollup.sh 30       last 30 days
#
# Requests and bytes come from free CloudFront CloudWatch metrics (15-month
# retention). Page views, visitors, pages, referrers, geography and devices
# are parsed from access logs, which are kept for 90 days and land a few
# minutes behind real time.
set -euo pipefail

. "$(dirname "$0")/_config.sh"
DIST="$CLOUDFRONT_DISTRIBUTION_ID"
: "${AWS_ACCOUNT_ID:?set AWS_ACCOUNT_ID in .env.deploy}"
: "${LOGS_BUCKET:?set LOGS_BUCKET in .env.deploy}"
LOGS="s3://$LOGS_BUCKET/AWSLogs/$AWS_ACCOUNT_ID/CloudFront/cf"

DAYS=${1:-7}
HOURS=$((DAYS * 24))

# BSD date (macOS) and GNU date (Linux/CI) take different flags.
ago() {
  date -u -v-"$1"H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null \
    || date -u -d "$1 hours ago" +%Y-%m-%dT%H:%M:%SZ
}
day_ago() {
  date -u -v-"$1"d +%Y/%m/%d 2>/dev/null || date -u -d "$1 days ago" +%Y/%m/%d
}

NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
START=$(ago "$HOURS")
PREV_START=$(ago $((HOURS * 2)))

metric() { # name start end
  local v
  v=$(aws cloudwatch get-metric-statistics "${AWS_ARGS[@]}" --region us-east-1 \
    --namespace AWS/CloudFront --metric-name "$1" \
    --dimensions Name=DistributionId,Value="$DIST" Name=Region,Value=Global \
    --start-time "$2" --end-time "$3" --period $((HOURS * 3600)) \
    --statistics Sum --query "sum(Datapoints[].Sum)" --output text 2>/dev/null)
  [ "$v" = "None" ] || [ -z "$v" ] && echo 0 || echo "$v"
}

# Percentage change, guarding divide-by-zero on a first run.
trend() {
  awk -v a="$1" -v b="$2" 'BEGIN{
    if (b == 0) { print (a > 0) ? "  (new)" : ""; exit }
    d = (a - b) / b * 100
    printf "  %s%.0f%% vs prior %s", (d >= 0 ? "+" : ""), d, "period"
  }'
}

REQ=$(metric Requests "$START" "$NOW")
REQ_PREV=$(metric Requests "$PREV_START" "$START")
BYTES=$(metric BytesDownloaded "$START" "$NOW")

echo "=================================================="
echo " $SITE_DOMAIN — viewership rollup"
echo " last $DAYS day(s): ${START%T*} to ${NOW%T*}"
echo "=================================================="
printf " Requests         %'.0f%s\n" "$REQ" "$(trend "$REQ" "$REQ_PREV")"
printf " Data out         %.1f MB\n" "$(echo "$BYTES" | awk '{print $1/1048576}')"

# ---- access logs -------------------------------------------------------
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
for i in $(seq 0 $((DAYS - 1))); do
  aws s3 cp "$LOGS/$DIST/$(day_ago "$i")/" "$TMP/" --recursive "${AWS_ARGS[@]}" \
    --only-show-errors 2>/dev/null || true
done

if [ "$(find "$TMP" -name '*.gz' | wc -l | tr -d ' ')" = "0" ]; then
  echo
  echo " No access logs in this window."
  echo " (Logs appear within ~10 min of a request and are kept 90 days.)"
  exit 0
fi

gzip -dc "$TMP"/*.gz 2>/dev/null | grep -v '^#' > "$TMP/all.tsv" || true

# Fields: 1 date 2 time 3 edge-loc 4 sc-bytes 5 c-ip 6 method 7 host
#         8 uri-stem 9 status 10 referer 11 user-agent ... 30 content-type
#
# A page view is an HTML response. The SPA serves index.html for every
# unmatched path, so requests for a missing favicon.ico or robots.txt also come
# back as HTML 200 and would otherwise be counted as views. Exclude anything
# that is plainly a file request rather than a person opening a page.
HTML="$TMP/html.tsv"
awk -F'\t' '$30 ~ /text\/html/ &&
             $8 !~ /\.(ico|png|jpg|jpeg|svg|css|js|map|txt|xml|webmanifest)$/ &&
             $8 !~ /^\/(robots|sitemap|ads|apple-touch)/' \
  "$TMP/all.tsv" > "$HTML" || true

# Separate humans from crawlers so the headline number means people.
HUMAN="$TMP/human.tsv"
awk -F'\t' '$11 !~ /bot|Bot|crawler|spider|Slurp|facebookexternalhit|Discordbot|redditbot|HeadlessChrome|curl|python/' \
  "$HTML" > "$HUMAN" || true

VIEWS=$(wc -l < "$HUMAN" | tr -d ' ')
VISITORS=$(awk -F'\t' '{print $5}' "$HUMAN" | sort -u | wc -l | tr -d ' ')
BOTS=$(( $(wc -l < "$HTML" | tr -d ' ') - VIEWS ))

printf " Page views       %s  (humans; %s bot/crawler hits excluded)\n" "$VIEWS" "$BOTS"
printf " Unique visitors  %s  (distinct IPs)\n" "$VISITORS"

echo
echo " Per day"
awk -F'\t' '{print $1}' "$HUMAN" | sort | uniq -c \
  | awk '{ bar=""; n=$1; for(i=0;i<n && i<40;i++) bar=bar"#"; printf "   %s  %-4s %s\n", $2, $1, bar }'

echo
echo " Top pages"
if [ "$VIEWS" -gt 0 ]; then
  awk -F'\t' '{print $8}' "$HUMAN" | sort | uniq -c | sort -rn | head -8 \
    | awk '{printf "   %-5s %s\n", $1, $2}'
else
  echo "   (none)"
fi

echo
echo " Traffic sources"
EXT=$(awk -F'\t' -v host="$SITE_DOMAIN" \
  '$10 != "-" && $10 != "" {split($10, a, "/"); if (a[3] != host && a[3] != "") print a[3]}' \
  "$HUMAN" | sort | uniq -c | sort -rn | head -8)
DIRECT=$(awk -F'\t' '$10 == "-" || $10 == ""' "$HUMAN" | wc -l | tr -d ' ')
[ -n "$EXT" ] && echo "$EXT" | awk '{printf "   %-5s %s\n", $1, $2}'
printf "   %-5s %s\n" "$DIRECT" "direct / no referrer"

echo
echo " Devices"
awk -F'\t' '{ua=$11; print (ua ~ /iPhone|iPad|Android|Mobile/) ? "mobile" : "desktop"}' "$HUMAN" \
  | sort | uniq -c | sort -rn | awk '{printf "   %-5s %s\n", $1, $2}'

echo
echo " Geography (CloudFront edge, approximate)"
awk -F'\t' '{print substr($3, 1, 3)}' "$HUMAN" | sort | uniq -c | sort -rn | head -8 \
  | awk '{printf "   %-5s %s\n", $1, $2}'
