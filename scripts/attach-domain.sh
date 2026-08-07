#!/usr/bin/env bash
# Run ONCE, after the ACM validation CNAME has been added to DNS and the
# certificate reaches ISSUED. Attaches ducks.metacto.com + the TLS cert to
# the CloudFront distribution.
#
#   ./scripts/attach-domain.sh
set -euo pipefail

. "$(dirname "$0")/_config.sh"
PROFILE="$AWS_PROFILE_NAME"
DIST_ID="$CLOUDFRONT_DISTRIBUTION_ID"
DOMAIN="$SITE_DOMAIN"
: "${ACM_CERTIFICATE_ARN:?set ACM_CERTIFICATE_ARN in .env.deploy}"
CERT_ARN="$ACM_CERTIFICATE_ARN"

STATUS=$(aws acm describe-certificate --certificate-arn "$CERT_ARN" \
  --region us-east-1 --profile "$PROFILE" --query "Certificate.Status" --output text)
echo "certificate status: $STATUS"
if [ "$STATUS" != "ISSUED" ]; then
  echo "Certificate is not ISSUED yet. Add the validation CNAME to DNS and"
  echo "re-run; validation usually completes within minutes of the record"
  echo "propagating."
  exit 1
fi

TMP=$(mktemp -d)
aws cloudfront get-distribution-config --id "$DIST_ID" --profile "$PROFILE" \
  > "$TMP/current.json"
ETAG=$(python3 -c "import json;print(json.load(open('$TMP/current.json'))['ETag'])")

python3 - "$TMP/current.json" "$TMP/new.json" "$DOMAIN" "$CERT_ARN" <<'PY'
import json, sys
src, dst, domain, cert = sys.argv[1:5]
cfg = json.load(open(src))["DistributionConfig"]
cfg["Aliases"] = {"Quantity": 1, "Items": [domain]}
cfg["ViewerCertificate"] = {
    "ACMCertificateArn": cert,
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021",
    "Certificate": cert,
    "CertificateSource": "acm",
}
json.dump(cfg, open(dst, "w"))
PY

aws cloudfront update-distribution --id "$DIST_ID" --profile "$PROFILE" \
  --if-match "$ETAG" --distribution-config "file://$TMP/new.json" \
  --query "Distribution.{Status:Status,Aliases:DistributionConfig.Aliases.Items}" --output json

echo "==> alias attached. CloudFront will redeploy in a few minutes."
echo "==> then https://$DOMAIN/ goes live."
