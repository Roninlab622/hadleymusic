# Progress log

## 2026-05-22
- Read `hadleymusic.md` + `custom-prompt.md`.
- Pulled the 16-video playlist via yt-dlp; full table in `findings.md`.
- Reviewed ReedBTC/localbitcoiners for structural reference. Vanilla
  HTML/CSS/JS + Cloudflare Pages confirmed as the model.
- Fetched HES + Hopkins logos. FB CDN logo failed (expired URL).
- Locked stack, palette, schema, file layout. Plan in `task_plan.md`.

### Phase 1 — data
- Wrote `data/concerts.json` with all 16 concerts.
- Schema mirrors RSS/Pod-2.0 item shape (id, title, date, duration, etc.).
- Year-only titles get `date_precision: "month"`; dated titles `"day"`.
- Validated: 16 entries, IDs unique, all 4 ensemble values + 5 years covered.

### Phase 2 — shell + styling
- `assets/css/styles.css`: full mobile-first stylesheet w/ tokens for the
  parchment / hadley-blue / hopkins-royal / brass palette.
- Self-noting: fonts are Google CDN for now (Inter + Fraunces). Swap to
  self-hosted woff2 later for perf + CSP tightening (mirror localbitcoiners).

### Phase 3 — homepage
- `index.html`: sticky nav, hero, ensemble chip filters + year dropdown,
  concert grid container, footer w/ two-org acknowledgment.
- `assets/js/home.js`: loads JSON, renders cards, wires filter chips and
  year select (years derived from data, not hard-coded).

### Phase 4 — detail page
- `concert.html`: shell only — JS injects the rendered content.
- `assets/js/concert.js`: reads `?id=`, looks up concert, renders header +
  player frame + "Watch on YouTube" + greyed "Download (coming soon)" +
  about section.
- `assets/js/lite-youtube.js`: thumbnail-to-iframe swap. Tries
  maxresdefault, falls back to hqdefault on 404. Embed via youtube-nocookie.
- `assets/js/data.js`: shared loader + formatters (date, duration, ensemble
  label, thumbnail URL, embed URL).

### Phase 5 — coming-soon
- `coming-soon.html`: customizes title + body based on `?for=donate|shop`.

### Phase 6 — Cloudflare config
- `_headers`: CSP allowing youtube-nocookie/ytimg/fonts, security headers,
  cache rules for `/assets/*` (1d) and `/data/concerts.json` (5m).
- `_redirects`: empty for now; reserved for future nice-URL rewrites.
- `.gitignore`: excludes `_recon/`.

### Phase 7+8 — validation
- `node --check` clean on all four JS files; JSON parse clean.
- Local static server: index/concert/coming-soon + all assets return 200.
- Node smoke test (with fetch shim) confirms loadConcerts + all formatters
  produce the expected output for newest entry and findById lookup.
- YouTube thumb URLs return 200 for sampled IDs (and 404 correctly for
  fake ID, proving the fallback path will trigger when needed).

## Open / next session
- Wait for user review before any further changes.
- Future: self-host fonts, tighten CSP (drop `unsafe-inline`), wire real
  Boosters donation + shop URLs, add real description text per concert.
