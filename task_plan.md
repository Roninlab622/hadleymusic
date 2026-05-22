# Hadley Music — Task Plan

## Goal
Phase 1 build of hadleymusic site per `hadleymusic.md`: browsable archive of
all 16 Hadley Band concert videos, filterable by ensemble + year, with detail
pages, on a static stack deployable to Cloudflare Pages.

## Decisions locked
- Stack: vanilla HTML/CSS/JS, no build step, no framework.
- Player: lite-youtube-embed pattern → click-thumbnail-to-play, iframe points
  at `youtube-nocookie.com/embed/<id>`. Thumbs from `i.ytimg.com`.
- Detail pages: single `concert.html?id=<video_id>` template, JS reads param
  and looks up the concert in `data/concerts.json`.
- Filters: ensemble chips (All / HES / Hopkins / District) + year selector.
- Sort: newest first.
- Palette: parchment `#f8f3e7`, hadley blue `#2c4a6b`, hopkins royal `#1f3fc8`,
  brass `#d4a14a`, ink `#1f2933`, muted `#6b7280`.
- Typography: humanist serif for display (Fraunces or Source Serif 4), clean
  sans for body (Inter or system). Self-host woff2 if used, like localbitcoiners.
- "Coming soon" page covers: Donate link, Shop link. Per-concert Download
  button shows on detail pages but greyed/disabled with a "coming soon" tooltip.
- No draft banner.

## Data schema (concerts.json)
Each entry mirrors what an RSS/Pod 2.0 feed item carries so phase-4 swap is
shallow:

```json
{
  "id": "RXnfp1S2o6Q",
  "video_id": "RXnfp1S2o6Q",
  "title": "Hopkins Academy Spring Concert",
  "raw_title": "2026 Hopkins Academy Spring Concert",
  "date": "2026-05-15",
  "date_precision": "month",
  "ensemble": "hopkins",
  "season": "spring",
  "year": 2026,
  "duration_seconds": 6549,
  "description": "",
  "download_url": null
}
```

- `ensemble`: `"hes" | "hopkins" | "district"`
- `season`: `"winter" | "spring" | "holiday"`
- `date_precision`: `"day"` when YouTube title carries an exact date,
  `"month"` when we only know season+year (will be refined later)
- `id` stays stable forever (becomes the eventual feed GUID); `video_id` and
  `download_url` are media pointers that can change

## File layout
```
/home/user/ronin/hadleymusic/
├── index.html                  homepage: filters + concert grid
├── concert.html                detail template (reads ?id=)
├── coming-soon.html            placeholder for Donate / Shop
├── data/concerts.json          16 entries, sorted newest-first
├── assets/
│   ├── css/styles.css          one stylesheet for the whole site
│   ├── js/
│   │   ├── data.js             loads + caches concerts.json
│   │   ├── home.js             renders grid + handles filters
│   │   ├── concert.js          renders detail page + lite-embed swap
│   │   └── lite-youtube.js     thumbnail → iframe swap helper
│   ├── logos/                  hes.png, hopkins-seal.png (school assets)
│   └── favicon.png             placeholder until something custom exists
├── _headers                    Cloudflare Pages: CSP, caching
├── _redirects                  Cloudflare Pages: nice URLs if needed
└── .gitignore
```

`_recon/` and the `*.md` planning files stay out of deploy (excluded via
gitignore + Pages publishes from root, not from a build dir, so we keep recon
in a clearly non-deployable subdir for now).

## Phases

| # | Phase                            | Status         |
|---|----------------------------------|----------------|
| 1 | Build concerts.json from the 16  | complete       |
| 2 | Scaffold HTML + CSS shell        | complete       |
| 3 | Homepage grid + filters          | complete       |
| 4 | Detail page + lite-embed         | complete       |
| 5 | Coming-soon page + wired links   | complete       |
| 6 | Cloudflare _headers + _redirects | complete       |
| 7 | Mobile responsive sweep          | complete (CSS-only; needs real-device check) |
| 8 | Smoke test in a local server     | complete (no headless browser available)     |

## Open questions for later (not blockers)
- Real donation URL for Boosters → swap into coming-soon when known.
- Real merch/shop URL → same.
- School colors/logo usage: brief doesn't say the schools have approved
  using their logos. Phase-1 will use them as small ensemble badges
  (icon-sized) + footer attribution, not splashy hero imagery. Easy to
  pull or swap later.
- Exact concert dates for the "year-only" titles — best-guessed for now,
  user will refine when working with the schools.

## Errors Encountered
| Error                            | Attempt | Resolution                         |
|----------------------------------|---------|------------------------------------|
| FB CDN logo URL returned 12B txt |   1     | FB URLs are time-signed; skipped that one, used the two hadleyschools.org logos |
