# Repository Tracker

## Portfolio Presence Audit — Progress Log (20 Aug 2026)

### Already completed (pre–Social Preview)

- FYP public-positioning cleanup
- GitHub README positioning
- SchoolIEP / ClinicOS additions
- CV consistency + AutiSmart stack correction
- Home page consistency
- 13 featured projects vs complete archive structure
- `project-archive.html` creation/expansion
- AutiSmart case-study correction
- EduConnect verification
- Rules to avoid repeating the same work

### Social Preview / Open Graph Audit — ACTIVE → mostly DONE

**Goal:** LinkedIn / WhatsApp / Facebook / X share previews work on all public hubs.

**Standard block used everywhere:**
- `link rel="canonical"` (absolute)
- `og:title`, `og:description`, `og:type=website`, `og:url`
- `og:image` → `https://alishah1029384756.github.io/AliShah1029384756/images/portfolio-cover.png`
- `og:image:width=1200`, `og:image:height=630`
- `twitter:card=summary_large_image` + matching title/description/image

**Temporary image policy:** all hubs share `portfolio-cover.png` until hub-specific 1200×630 assets exist.

#### Live-verified ✅ (20 Aug 2026)

| Hub | Repo / path | Commit (approx) | Live OG |
|-----|-------------|-----------------|---------|
| Main portfolio home | `AliShah1029384756` | prior | ✅ |
| Sites directory | `sites.html` | prior | ✅ |
| University Course Projects Hub | `university-course-projects-hub` | `c8a90166…` | ✅ |
| EduCore Open Learning Hub | `educore-open-learning-hub` | `32eda568…` | ✅ |
| Web Dev Learning Hub | `web-dev-learning-hub` | `0c72725a…` | ✅ |
| High-Impact Student Projects Hub | `high-impact-student-projects-hub` | `41965eca…` | ✅ |

#### Pending

| Hub | Status |
|-----|--------|
| **FAST-NUCES Resources** | Meta block prepared; full `index.html` ~92KB — connector full-file replace deferred to avoid risk. Apply the standard OG/Twitter block after the existing description meta, then deploy. |

### Safety rules (do not violate)

1. Do **not** force incomplete HTML overwrites on large hubs.
2. Prefer additive head/meta patches; never destroy body/CSS/JS.
3. Re-verify live pages after GitHub Pages deploy before marking done.
4. Shared cover image is temporary — plan hub-specific previews later.
5. Document every hub fix here so the next session does not re-audit completed pages.

### Next steps after FAST is patched

1. Live re-check FAST OG tags
2. Optional: hub-specific 1200×630 preview images
3. Final cross-page consistency pass (title/description vs on-page H1)
4. Close Social Preview phase in this log
