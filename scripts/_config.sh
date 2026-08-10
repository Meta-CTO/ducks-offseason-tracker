#!/usr/bin/env bash
# Shared deploy configuration.
#
# Copy .env.deploy.example to .env.deploy and fill in your own values, or
# export the same variables in your shell. .env.deploy is gitignored so that
# infrastructure identifiers stay out of the public repository.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -f "$ROOT/.env.deploy" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT/.env.deploy"
  set +a
fi

missing() {
  echo "Missing required config: $1" >&2
  echo "Copy .env.deploy.example to .env.deploy and fill it in." >&2
  exit 1
}

: "${SITE_DOMAIN:?$(missing SITE_DOMAIN)}"
: "${S3_BUCKET:?$(missing S3_BUCKET)}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?$(missing CLOUDFRONT_DISTRIBUTION_ID)}"

# AWS_PROFILE_NAME is optional. Locally it selects a named profile; in CI it is
# unset and credentials come from the environment (GitHub OIDC role), so the
# --profile flag must be omitted entirely rather than passed empty.
AWS_ARGS=()
if [ -n "${AWS_PROFILE_NAME:-}" ]; then
  AWS_ARGS=(--profile "$AWS_PROFILE_NAME")
fi
