# Findings

## Playlist contents (pulled 2026-05-22 via yt-dlp, flat-playlist)

Source: https://youtube.com/playlist?list=PLYsYdNHw5JmmHq6Gp2jPnj92SCFRc7R7X
16 videos. `upload_date` came back NA from the flat-playlist endpoint — the
date in each title is the only date signal we have for now. Will need to
either (a) fetch each video individually for real upload dates, or (b) trust
the title-encoded date and parse it.

| Video ID     | Title                                                       | Duration | Inferred ensemble | Inferred season | Inferred year |
|--------------|-------------------------------------------------------------|----------|-------------------|-----------------|---------------|
| RXnfp1S2o6Q  | 2026 Hopkins Academy Spring Concert                         | 1:49:09  | Hopkins Academy   | Spring          | 2026          |
| 8WDPm4k_bP8  | 2026 Hadley Schools All District Concert                    | 2:02:30  | All District      | (TBD)           | 2026          |
| w1MEWUAF_44  | HES Winter Concert: 12-18-25                                | 0:26:20  | HES (Elementary)  | Winter          | 2025          |
| z7yk1JwGsZE  | Hopkins Academy Winter Concert: 12-11-25                    | 1:43:10  | Hopkins Academy   | Winter          | 2025          |
| AFXD7T1zUfk  | Hadley Elementary School Spring Concert 2025                | 0:45:47  | HES (Elementary)  | Spring          | 2025          |
| nFikgo9OaSY  | Hopkins Academy Spring Concert 2025                         | 1:07:45  | Hopkins Academy   | Spring          | 2025          |
| sJ6HLHQuT2U  | All District Concert 2025                                   | 1:01:12  | All District      | (TBD)           | 2025          |
| MkuZQj_SQnY  | Hopkins Academy Winter Concert 2024                         | 1:01:16  | Hopkins Academy   | Winter          | 2024          |
| VAVMqxFJdYY  | Hadley Elementary School Winter Concert 2024                | 0:31:50  | HES (Elementary)  | Winter          | 2024          |
| TZLQIDDuIGY  | Hadley Elementary School Spring Concert 2024                | 0:45:25  | HES (Elementary)  | Spring          | 2024          |
| QyXOo81cFpA  | Hopkins Academy Spring Concert 2024                         | 1:04:28  | Hopkins Academy   | Spring          | 2024          |
| 081BdP4UVCU  | All District Concert 2024                                   | 1:01:49  | All District      | (TBD)           | 2024          |
| Qq9YuKvZ1zg  | 2023 Hadley Elementary School Holiday Concert: 12-7-23      | 0:45:45  | HES (Elementary)  | Holiday/Winter  | 2023          |
| 34WcnCAA2S0  | Hadley Elementary School Concert: 6/7/23                    | 0:37:03  | HES (Elementary)  | Spring          | 2023          |
| rDv_HcexuTc  | Hadley Schools All District Concert: 3-15-23                | 0:58:05  | All District      | (TBD)           | 2023          |
| zUldVb-55S4  | Hopkins Academy Winter Concert 2022                         | 1:20:50  | Hopkins Academy   | Winter          | 2022          |

### Observations
- Three ensembles in rotation: **Hadley Elementary (HES)**, **Hopkins Academy**, **All District** (which combines the two).
- Two seasons per year: **Winter** (Dec) and **Spring** (May/June). One outlier labeled "Holiday" (Dec 2023).
- Range so far: 2022 → 2026. Roughly 3 concerts/year × 4 years = expected ~12 — we have 16, so coverage is decent but not gapless.
- Title formats are inconsistent (`2026 Hopkins Academy Spring Concert` vs `Hopkins Academy Spring Concert 2025` vs `HES Winter Concert: 12-18-25`). The display layer should normalize, not the data file.

## Reference site (localbitcoiners.com)
- Repo: ReedBTC/localbitcoiners
- Vanilla HTML/CSS/JS — no React/Next on the marketing pages (the login-widget React app is only for boost/zap flows, which we're skipping).
- Cloudflare Pages hosted. `functions/` dir for Pages Functions (RSS, sitemap, middleware).
- Single `index.html` is the homepage with the episode list.
- Palette: cream `#f5eedc`, navy `#1e3a5f`, orange `#f7931a`, brown text `#2d2010`. Fonts: Playfair Display (display) + Source Serif 4 (body), self-hosted woff2.
- Strong CSP, structured data (schema.org), open graph, RSS autodiscovery, PWA manifest — good baseline to mirror.

## Decisions still open
See task_plan.md (to be written after design discussion).
