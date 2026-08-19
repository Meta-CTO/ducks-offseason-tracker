# Infrastructure

How this site is hosted, deployed and operated. **This repository is public**,
so no account numbers, bucket names or distribution IDs appear here. The real
values live in `.env.deploy` (gitignored — see `.env.deploy.example` for the
key names) and in GitHub Actions repository variables.

## The two sites

| Site | What it serves | Status |
|---|---|---|
| `nhl.metacto.com` | The league-wide platform. Opens on the team picker. | Built and deployed; **waiting on DNS** |
| `ducks.metacto.com` | The original Anaheim tracker. Now serves the same platform, defaulting to Anaheim. | Live |

Both are the same build. Which club a visitor lands on is decided in the
browser by `src/lib/team.js`: `?team=` in the URL wins, then the `nhl_team`
cookie, then a per-host default. `ducks.metacto.com` is mapped to `ANA` in
`HOST_DEFAULTS` so its long-standing visitors keep seeing the page they always
saw. Once `ducks.metacto.com` redirects to `nhl.metacto.com/?team=ANA`, that
map entry can be deleted.

## Hosting shape

Each site is one S3 bucket behind one CloudFront distribution:

- The bucket blocks all public access. CloudFront reaches it through an
  **Origin Access Control**, and the bucket policy allows only the
  `cloudfront.amazonaws.com` service principal with a `SourceArn` condition
  naming that one distribution. Adding a site means adding a bucket, an OAC and
  a matching bucket policy — never making a bucket public.
- `DefaultRootObject` is `index.html`, and 403 (and on the newer distribution,
  404) is rewritten to `/index.html` with a 200. That is the SPA fallback: a
  private bucket answers 403 for a missing key, so this is what makes any
  unknown path serve the app rather than an error.
- TLS uses a **wildcard `*.metacto.com` certificate in `us-east-1`**. CloudFront
  only accepts certificates from `us-east-1`, regardless of where the bucket
  lives. Because it is a wildcard, a new `*.metacto.com` subdomain needs **no
  new certificate** — attach the existing ARN.
- `PriceClass_100`, HTTP/2 + HTTP/3, IPv6 on.

Buckets are in `us-west-2`. The AWS profile is recorded as `AWS_PROFILE_NAME`
in `.env.deploy`.

## DNS — the thing that is easy to get wrong

**`metacto.com` DNS is not in Route 53.** The domain's nameservers are Google
(`ns-cloud-b*.googledomains.com`), so the zone is managed in Google Cloud DNS.
The AWS account holds hosted zones for a few *delegated* subdomains, which makes
it look like Route 53 is authoritative when it is not.

Consequences:

- `aws route53 change-resource-record-sets` cannot create a `*.metacto.com`
  record. Attempting it either fails or edits a zone nobody queries.
- Records must be added in Google Cloud DNS. `gcloud` is not installed on the
  maintainer's machine as of this writing.

To point a new subdomain at a distribution, add a **CNAME** to the
`metacto.com` zone in Google Cloud DNS pointing at that distribution's
`*.cloudfront.net` domain (the `NHL_DISTRIBUTION_DOMAIN` value). Verify with:

```sh
dig +short nhl.metacto.com          # expect the cloudfront.net name
curl -sI https://nhl.metacto.com/   # expect 200
```

Until the record exists, the distribution is still reachable and testable at
its `*.cloudfront.net` domain directly.

## Deploying

`scripts/deploy.sh` builds, syncs to S3 with two cache profiles (hashed assets
immutable for a year; HTML and JSON for 60 seconds so content lands fast),
creates a CloudFront invalidation and waits for it.

It reads three variables — `SITE_DOMAIN`, `S3_BUCKET`,
`CLOUDFRONT_DISTRIBUTION_ID` — through `scripts/_config.sh`.

> **`_config.sh` precedence:** `.env.deploy` supplies *defaults*; anything
> already exported in the environment **wins**. This matters. The file
> originally sourced `.env.deploy` with `set -a` unconditionally, which
> silently overrode variables passed on the command line and sent a deploy
> intended for the new bucket to the default one instead. Every deploy now
> prints `==> target: <domain> (bucket <bucket>)` first — read that line.

Deploy the default (Ducks) site:

```sh
npm run deploy
```

Deploy the league platform by exporting the `NHL_*` values under the plain
names:

```sh
SITE_DOMAIN="$NHL_SITE_DOMAIN" \
S3_BUCKET="$NHL_S3_BUCKET" \
CLOUDFRONT_DISTRIBUTION_ID="$NHL_CLOUDFRONT_DISTRIBUTION_ID" \
  bash scripts/deploy.sh
```

## CI

`.github/workflows/ci.yml` runs on every push to `main`:

- `build` — install, lint, build.
- `deploy` — deploys to the site in the plain `SITE_DOMAIN` / `S3_BUCKET` /
  `CLOUDFRONT_DISTRIBUTION_ID` repository variables.
- `deploy-nhl` — deploys to the site in the `NHL_*` repository variables.
  **Gated on the `NHL_DEPLOY_ENABLED` variable being `true`**, so it stays
  dormant until the deploy role has been granted access to the new bucket —
  enabling it earlier just fails with AccessDenied. Its verify step
  checks the real domain once DNS resolves and the `*.cloudfront.net` domain
  before that, so the check is meaningful either way.

Both deploy jobs end by fetching the live page and comparing the served bundle
filename to the one just built, failing if they differ. **Pushing is deploying,
but a push is not shipped until that check passes** — a failed run leaves the
old bundle live.

Credentials come from GitHub OIDC assuming an IAM deploy role; there are no
long-lived AWS keys. Note the trust policy: the Meta-CTO org emits subjects
containing immutable **numeric** org and repo IDs
(`repo:Meta-CTO@<id>/<repo>@<id>:environment:production`), not the plain-name
form in most GitHub documentation.

The role's inline policy is deliberately narrow — `PutObject`/`GetObject`/
`DeleteObject` and `ListBucket` on the site buckets, plus
`CreateInvalidation`/`GetInvalidation` on those distributions, and nothing else.
**Adding a site means adding its bucket ARN and distribution ARN to that
policy**, or CI deploys will fail with AccessDenied.

## Runbook: adding another site under metacto.com

1. Create the bucket in `us-west-2`; block all public access.
2. Create an Origin Access Control for it.
3. Create the distribution: alias = the subdomain, the existing wildcard cert
   ARN, `DefaultRootObject: index.html`, and 403/404 → `/index.html` with 200.
4. Put a bucket policy allowing `cloudfront.amazonaws.com` with a `SourceArn`
   condition naming the new distribution.
5. Add the bucket and distribution ARNs to the IAM deploy role's inline policy.
6. Add the identifiers to `.env.deploy` and to GitHub repository variables.
7. Add the CNAME **in Google Cloud DNS**, not Route 53.
8. Deploy, then confirm the served bundle matches the build.

## Data sources and their limits

- **NHL API** (`api-web.nhle.com`) — teams, rosters, per-club stats. No key
  needed. It **rate-limits a full-league sweep**: firing requests in parallel
  starts returning `429` around the twelfth club. `scripts/fetch-league.mjs`
  therefore serialises requests, paces them, and retries honouring
  `Retry-After`. There is **no transactions endpoint** (404) and no contract or
  cap data at all.
- Player records from that API carry an `assets.nhle.com` headshot URL. Those
  are league photography, which this project does not use; the fetch script
  strips them so nothing downstream can render one. Player images come only
  from Wikimedia Commons under a free licence, via `npm run photos`.
- **PuckPedia** — the only good source for contracts, cap and injuries, and it
  is **not scriptable**: its `robots.txt` names `ClaudeBot` and `anthropic-ai`
  in a disallow list. Cap data is therefore read by a human-directed browser
  visit during an update pass, never by an automated scraper. This is why the
  cap tab exists for Anaheim only.

- **capwages.com** — evaluated as a scriptable replacement for PuckPedia and
  **rejected as a drop-in**. Its `robots.txt` does allow crawlers, its team
  pages are at `/teams/<city_team>` and its player pages at `/players/<slug>`,
  and its *player-level* facts check out: Gauthier shows a $0 expired ELC with
  an `RFA '26` expiry, exactly as the site says. But its *team* totals disagree
  with PuckPedia materially — for Anaheim it reports a $91,202,439 cap hit,
  $12,797,561 of space and a 19/23 roster, against PuckPedia's $94,926,605,
  $9,073,395 and 22/23. That is a ~$3.7M gap and three roster spots, almost
  certainly a different convention about who counts against the active roster.
  Switching the cap tab to it would silently change every number on the page
  with no way to say which is right. It also gates much of its detail behind a
  login and an Upgrade tier, so a wholesale 32-team scrape of a commercial
  product is a different proposition from what robots.txt alone permits. If it
  is ever used, its numbers must be labelled as capwages figures and must never
  be mixed with PuckPedia figures on the same page.

## Analytics

There is no tracking script and no third-party analytics. Traffic reporting
(`npm run stats`, `npm run rollup`) is derived from CloudFront metrics and
access logs in the logs bucket. The only cookie the site sets is `nhl_team`,
which stores a three-letter club code so a return visit lands on the right
team — no identifier, nothing that would make the "no tracking" claim untrue.
