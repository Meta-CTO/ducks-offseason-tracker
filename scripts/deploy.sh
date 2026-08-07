#!/usr/bin/env bash
# Build and publish to S3 + CloudFront.
#   ./scripts/deploy.sh
set -euo pipefail

. "$(dirname "$0")/_config.sh"
PROFILE="$AWS_PROFILE_NAME"
BUCKET="$S3_BUCKET"
DIST_ID="$CLOUDFRONT_DISTRIBUTION_ID"

cd "$ROOT"

echo "==> building"
npm run build

echo "==> syncing hashed assets (immutable, 1yr)"
aws s3 sync dist/ "s3://$BUCKET/" --profile "$PROFILE" --delete \
  --exclude "*.html" --exclude "*.json" \
  --cache-control "public,max-age=31536000,immutable" --only-show-errors

echo "==> syncing html/json (short TTL so content updates land fast)"
aws s3 sync dist/ "s3://$BUCKET/" --profile "$PROFILE" \
  --exclude "*" --include "*.html" --include "*.json" \
  --cache-control "public,max-age=60,must-revalidate" --only-show-errors

echo "==> invalidating CloudFront"
ID=$(aws cloudfront create-invalidation --distribution-id "$DIST_ID" \
  --paths "/*" --profile "$PROFILE" --query "Invalidation.Id" --output text)
aws cloudfront wait invalidation-completed --distribution-id "$DIST_ID" \
  --id "$ID" --profile "$PROFILE"

echo "==> done: https://$SITE_DOMAIN/"
