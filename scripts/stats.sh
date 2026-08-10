#!/usr/bin/env bash
# Usage summary for ducks.metacto.com.
#   ./scripts/stats.sh          last 24 hours
#   ./scripts/stats.sh 168      last 7 days
#
# Requests/bytes come from free CloudFront CloudWatch metrics. Top pages,
# referrers and countries are parsed from access logs, which land in S3 a few
# minutes behind real time.
set -euo pipefail

. "$(dirname "$0")/_config.sh"
DIST="$CLOUDFRONT_DISTRIBUTION_ID"
: "${AWS_ACCOUNT_ID:?set AWS_ACCOUNT_ID in .env.deploy}"
: "${LOGS_BUCKET:?set LOGS_BUCKET in .env.deploy}"
# AWS prepends AWSLogs/<account>/CloudFront/ to the configured suffix path.
LOGS="s3://$LOGS_BUCKET/AWSLogs/$AWS_ACCOUNT_ID/CloudFront/cf"
HOURS=${1:-24}

START=$(date -u -v-"${HOURS}"H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d "$HOURS hours ago" +%Y-%m-%dT%H:%M:%SZ)
END=$(date -u +%Y-%m-%dT%H:%M:%SZ)

metric() {
  aws cloudwatch get-metric-statistics "${AWS_ARGS[@]}" --region us-east-1 \
    --namespace AWS/CloudFront --metric-name "$1" \
    --dimensions Name=DistributionId,Value="$DIST" Name=Region,Value=Global \
    --start-time "$START" --end-time "$END" --period $((HOURS * 3600)) \
    --statistics Sum --query "sum(Datapoints[].Sum)" --output text 2>/dev/null
}

echo "=============================================="
echo " $SITE_DOMAIN - last ${HOURS}h"
echo " $START -> $END"
echo "=============================================="

REQ=$(metric Requests); BYTES=$(metric BytesDownloaded)
[ "$REQ" = "None" ] && REQ=0
[ "$BYTES" = "None" ] && BYTES=0
printf " Requests        %s\n" "$(printf "%.0f" "$REQ")"
printf " Data out        %.1f MB\n" "$(echo "$BYTES" | awk '{print $1/1048576}')"
printf " 4xx rate        %s%%\n" "$(metric 4xxErrorRate 2>/dev/null || echo 0)"

# Access logs: gzipped W3C, tab-separated, two header lines per file.
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
DAYS=$(( (HOURS + 23) / 24 ))
for i in $(seq 0 $((DAYS - 1))); do
  D=$(date -u -v-"${i}"d +%Y/%m/%d 2>/dev/null || date -u -d "$i days ago" +%Y/%m/%d)
  aws s3 cp "$LOGS/$DIST/$D/" "$TMP/" --recursive "${AWS_ARGS[@]}" \
    --only-show-errors 2>/dev/null || true
done

COUNT=$(find "$TMP" -name '*.gz' | wc -l | tr -d ' ')
if [ "$COUNT" = "0" ]; then
  echo
  echo " (no access logs yet - they appear within ~10 min of the first hits)"
  exit 0
fi

gzip -dc "$TMP"/*.gz 2>/dev/null | grep -v '^#' > "$TMP/all.tsv" || true

# Field order (from the log header):
#  1 date  2 time  3 edge-loc  4 sc-bytes  5 c-ip  6 method  7 host
#  8 uri-stem  9 status  10 referer  11 user-agent  ...  30 sc-content-type
#
# A "page view" is a response whose content-type is HTML. That is exact and
# avoids guessing from file extensions, since the SPA serves index.html for
# every non-asset path.
HTML="$TMP/html.tsv"
awk -F'\t' '$30 ~ /text\/html/' "$TMP/all.tsv" > "$HTML" || true

VIEWS=$(wc -l < "$HTML" | tr -d ' ')
VISITORS=$(awk -F'\t' '{print $5}' "$HTML" | sort -u | wc -l | tr -d ' ')

echo
printf " Page views      %s\n" "$VIEWS"
printf " Unique IPs      %s\n" "$VISITORS"

echo
echo " Top pages"
awk -F'\t' '{print $8}' "$HTML" | sort | uniq -c | sort -rn | head -8 \
  | awk '{printf "   %-6s %s\n", $1, $2}'

echo
echo " Traffic sources (external referrers)"
EXT=$(awk -F'\t' -v host="$SITE_DOMAIN" '$10 != "-" && $10 != "" {split($10, a, "/"); if (a[3] != host) print a[3]}' "$HTML" \
  | sort | uniq -c | sort -rn | head -8)
if [ -n "$EXT" ]; then
  echo "$EXT" | awk '{printf "   %-6s %s\n", $1, $2}'
else
  echo "   (none yet - direct visits only)"
fi

echo
echo " Edge locations (rough geography)"
awk -F'\t' '{print substr($3, 1, 3)}' "$HTML" | sort | uniq -c | sort -rn | head -6 \
  | awk '{printf "   %-6s %s\n", $1, $2}'

echo
echo " Devices"
awk -F'\t' '{ua=$11; if (ua ~ /iPhone|Android|Mobile/) print "mobile"; else if (ua ~ /bot|Bot|crawler|spider/) print "bot"; else print "desktop" }' "$HTML" \
  | sort | uniq -c | sort -rn | awk '{printf "   %-6s %s\n", $1, $2}'
