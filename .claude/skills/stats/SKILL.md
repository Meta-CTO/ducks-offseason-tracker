---
name: stats
description: Viewership rollup for the Ducks tracker - page views, visitors, trend, traffic sources, devices and geography from CloudFront metrics and access logs. Use when the user asks for stats, traffic, viewership, analytics, how many visitors, or how the site is doing.
---

# Viewership rollup for ducks.metacto.com

Report how the site is actually doing, and interpret the numbers rather than
just printing them.

## Run it

```sh
bash scripts/rollup.sh 7     # last 7 days (default)
bash scripts/rollup.sh 1     # last 24 hours
bash scripts/rollup.sh 30    # last 30 days
```

Pick the window from what was asked. Default to 7 days. If the user asks
"since the Reddit post" or similar, pick the number of days that covers it.
Running two windows is often more informative than one — a 1-day next to a
7-day shows whether today is typical.

## What the numbers mean, and their limits

Be straight about these; a stats tool that overstates its precision is worse
than none.

- **Requests** counts every HTTP hit including images, CSS and JS, so one
  person opening the page generates roughly 30 of them. It comes from free
  CloudFront CloudWatch metrics, retained 15 months.
- **Page views** counts HTML responses only, excluding known bots and file
  requests like `favicon.ico`. This is the number that means "someone opened
  the site."
- **Unique visitors** is distinct IP addresses, which is a rough proxy.
  Mobile users on cellular can change IP, and several people behind one office
  or household NAT look like one visitor. Treat it as an approximation and say
  so.
- **Trend** compares against the immediately preceding equal-length window.
  Early on this is distorted by development and deploy traffic, so a large
  negative swing may just mean the previous window included our own testing.
  Check before reporting a drop as if real.
- **Geography** is the CloudFront edge location that served the request, not
  the user's actual location. LAX means "routed through Los Angeles."
- **Access logs** cover 90 days and land a few minutes behind real time, so
  the current hour always looks light.

## Reporting

Lead with the headline: page views and unique visitors for the window, and
whether that is up or down. Then what is genuinely interesting, which is
usually:

- **Where traffic comes from.** Reddit vs direct vs elsewhere. This is the
  question that actually matters for a fan project.
- **The shape over time.** A spike that decays over several days is the normal
  signature of a link being posted somewhere. Flat and low is organic.
- **Which pages.** If an unexpected path dominates, say so — it usually means
  the URL being shared has that path on it, and the SPA is serving the
  homepage for it regardless.
- **Devices.** Heavily mobile traffic is worth knowing since it justifies the
  mobile layout work.

Skip sections that say nothing. Do not pad a quiet week into a long report.

If the numbers are very small, say the sample is too small to read into,
rather than narrating noise.

## If there are no logs

Access logs only exist from the day logging was enabled, and expire after 90
days. If a window returns nothing, say so plainly and fall back to the
CloudWatch request count, which goes back much further.
