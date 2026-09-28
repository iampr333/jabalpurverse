# JABALPURVERSE — Business & Product Requirements Document (BRD)
### नर्मदे हर 🙏 · A dynamic, feature-rich, near-zero-cost city platform for Jabalpur

**Document:** Final BRD
**Status:** Final — build-ready
**Date:** 28 Sep 2026
**Product:** Jabalpurverse
**Primary Market:** Jabalpur, Madhya Pradesh, India
**Primary Platform:** Dynamic PWA — prerendered shell + interactive islands + Supabase (accounts, realtime, community) + edge functions.
**Maintainer model:** Solo maintainer + community moderators

> **Greeting:** नर्मदे हर 🙏 (Narmade Har)  
> **Tagline:** Explore Jabalpur. Discover its stories. Experience it differently.

---

# A. BUSINESS CONTEXT & OBJECTIVES

## A.1 Problem and opportunity
Information about Jabalpur is scattered across news sites, social pages, map listings and word of mouth, and much of it is stale or unsourced (fares, timings, festival routes, aarti times). There is no single, trusted, bilingual, mobile-first home for the city that residents use daily and visitors and pilgrims trust for planning. Jabalpur, the *Sanskardhani*, whose soul is Maa Narmada, deserves one.

## A.2 Business objectives
| # | Objective | Measure (see §11 and §6.21.6) |
|---|---|---|
| O1 | Become the go-to digital home of Jabalpur for residents, pilgrims and visitors | Search visibility for core queries (Jabalpur tourism, Narmada aarti, Durga Puja pandals, Bhedaghat), weekly visitors |
| O2 | Keep recurring infrastructure at **₹0/month** and maintenance at **≤ 2 hours/week** | Ops metrics in §11 |
| O3 | Build a daily habit, not a one-time visit | DAU/MAU, D1/D7/D30 return, brief open rate |
| O4 | Grow a local ecosystem: creators, samitis, ghat and aarti committees, contributors | Creators listed, contributions/month, Local Guides |
| O5 | Fund upgrades from voluntary support and, later, clearly-labelled sponsorship | Support page conversion, upgrade fund progress (§6.18, §15) |
| O6 | Earn trust: every fact sourced, dated and verifiable | Share of published fields with source and date; correction turnaround |

## A.3 Stakeholders
Owner/maintainer; residents; visitors and Narmada pilgrims; Jabalpur diaspora; creators and photographers; pandal samitis and festival committees; ghat and aarti committees; local businesses (via corrections and, later, listings); volunteers and moderators (Local Guides). Official bodies (district administration, Nagar Nigam, police, tourism council) are **information sources**, not partners by default; any partnership is optional and never a dependency.

## A.4 Scope
**In scope:** the modules in §4 (Narmada Hub, Explore, Getting There, Search, Trip Builder, Accounts, Creators, Support, Today, Utsav Mode, Aaj Jabalpur, Channels, History, Stories, Community, Quest, Food, Events, Essentials, optional Ask), delivered as an installable, bilingual (Hindi and English) web app.
**Out of scope:** native apps, AR/3D, bookings and ticketing, payments other than voluntary UPI support, business portals, live bus or crowd tracking, scraping of third-party platforms, paid ads (unless later validated).

## A.5 Constraints and assumptions
- Design rules R1–R10 (§2) are binding: no recurring cost, no card on file, ≤ 2 h/week maintenance, content in Git, consent-based people features.
- One maintainer plus community moderators; content verification (fares, timings, routes, aarti times, pandal lists) is the main bottleneck, not engineering.
- Free-tier limits and vendor terms can change; every dependency has a fallback (§5.2, §14).
- Official or samiti data for pandals, routes and aarti times is not open data; it must be gathered and re-verified by editors.

## A.6 Milestones tied to the Jabalpur calendar
| Milestone | Target | Why |
|---|---|---|
| M1 — Utsav Sprint (§12, P0.5) | Before Navratri / Durga Puja (≈ 11–12 Oct 2026) | Peak city-wide interest; first daily-return test |
| M2 — Narmada Mahotsav and Sharad Purnima content | ≈ late Oct 2026 (confirm date) | Narmada identity and Bhedaghat traffic |
| M3 — Core launch (P1 incl. Narmada Hub) | Before **Narmada Jayanti / Prakatotsav, ≈ 12–13 Feb 2027** | The biggest Narmada day of the year at Gwarighat |
| M4 — Community and Quest (P3–P4) | After M3, once traffic justifies moderation | Keeps moderation load proportional to traffic |

## A.7 Budget
Recurring infrastructure ₹0. One-time or annual: a domain name. Time is the real cost (see effort estimates in §12). Optional upgrades are triggered only by the tripwires in §14 and funded by support revenue.

---

# 1. PRODUCT OVERVIEW

## 1.1 Concept
Jabalpurverse is a city-focused platform combining places, food, history, stories, events, quests and community photos on one interactive map. It should feel like a living digital Jabalpur, not a directory.

## 1.2 Core loop
```text
DISCOVER → EXPLORE → LEARN → VISIT → SHARE → CONTRIBUTE → EARN → DISCOVER AGAIN
```

## 1.3 North star
**Meaningful discovery of Jabalpur.** A good session ends with: "I discovered a place / learned something / planned something / visited something / contributed something."

## 1.4 Product principles
1. **Local first** — designed around Jabalpur, not a generic template.
2. **Map first** — the map connects every entity type.
3. **Community powered, trust before scale** — every fact has a source, a date and a verification state.
4. **Gamified but useful** — quests drive exploration, not the reverse.
5. **Automation over vigilance** — anything that needs a human to *remember* is redesigned to self-expire, self-heal or self-report.
6. **AI is a layer, never the source of truth.**
7. **Narmada at the heart** — the river, its ghats, its aarti and its festivals shape the brand, the calendar, the map and the daily habit (§6.22).

## 1.5 The soul of the product
Maa Narmada is the soul of Jabalpur, and **"Narmade Har"** is how people greet each other. The site greets in the same voice, treats the river with reverence, and is bilingual from day one. Jabalpur's other identities (Sanskardhani, the cultural capital; Rani Durgavati's Gond legacy; the marble gorge; a city of many faiths and communities) sit alongside it. The Jabalpur coverage checklist is in Appendix B.

---

# 2. DESIGN RULES (NON-NEGOTIABLE CONSTRAINTS)

| # | Rule | Consequence |
|---|---|---|
| R1 | **$0 recurring infra.** Only allowed spend: a domain name (~one small annual fee; check registrar). | Every service must have a permanent free tier, not a trial |
| R2 | **No credit card on any service.** | When a free limit is hit, the feature *degrades*; it never bills |
| R3 | **≤ 2 hours/week steady-state maintenance.** | Every recurring task is automated, self-expiring, or surfaced in a weekly digest |
| R4 | **Content is data in Git.** | Versioned, portable, free backup; contributors can PR |
| R5 | **Volatile data never triggers a site rebuild.** | Weather/events/leaderboards publish as JSON to R2; site builds only for editorial changes |
| R6 | **Vendor exit ≤ 1 day.** | MapLibre style URL, S3-compatible R2, plain Postgres — all swappable |
| R7 | **Never promise what can't be sourced.** | No live status, no "open now" unless hours were verified recently |
| R8 | **Licences are recorded per asset.** | No image or dataset without source + licence; OSM-derived data respects ODbL attribution/share-alike |
| R9 | **Dynamic by default, static only for speed.** | Interactivity, accounts and realtime ship in P1; editorial pages are prerendered purely for SEO/performance |
| R10 | **Consent-based people features.** | Creators, supporters and contributors appear only if they opt in; no scraping of social platforms |

---

# 3. TARGET USERS

| Segment | Primary jobs-to-be-done |
|---|---|
| Local residents | Weekend plans, new places, food, events, local stories |
| Students / young adults | Cafés, hangouts, photography, challenges, sharing on WhatsApp/Instagram |
| Tourists | What to visit, how long, where to eat, Bhedaghat planning, itineraries |
| Families | Parks, temples, short trips, budget plans |
| Creators / photographers | Photo spots, golden-hour timing, historical locations |
| Content creators / influencers | Get discovered, tag places, earn community votes, track link clicks |
| Supporters | Contribute a few rupees via UPI and see where money goes |
| Local businesses | *(Deferred)* — served via a "Suggest a correction" form until there is traffic |
| Moderators | Review queue on a phone in < 5 min/day |

---

# 4. MODULE MAP AND PHASING

```text
JABALPURVERSE
├── NARMADA HUB  Aarti · ghats · Jayanti · Mahotsav · Parikrama · safety [P1]  (soul of the product)
├── EXPLORE      Map · Places · Categories · Nearby                     [P1]
├── GETTING THERE Transport, cost, timing for every place              [P1]
├── SEARCH       Hinglish-aware search + voice                           [P1]
├── TRIP BUILDER Drag-drop itineraries · cost/time · share · offline   [P1]
├── ACCOUNTS     Google/magic-link · saves · sync                        [P1]
├── CREATORS     Instagram/YouTube creators · community votes           [P1 curated → P6 votes]
├── SUPPORT      UPI donate · transparency page · supporters wall       [P1]
├── TODAY        Weather · Sun times · Events · "Right now" feed        [P1 lite → P5]
├── HISTORY      Places · Timeline · Then vs Now                         [P2]
├── STORIES      Long-form place narratives + audio guide                [P2]
├── COMMUNITY    Tips · Photos · Ask Locals · Corrections · Reports     [P3]
├── QUEST        Missions · XP · Badges · Passport                       [P4]
├── FOOD         Food places · Dish guide · Food quests                  [P5]
├── EVENTS       Calendar · Festivals · RSVPs · Submissions              [P5]
├── ESSENTIALS   Hospitals · police · ATMs · toilets · helplines        [P2]
├── UTSAV MODE   Ganesh/Durga/Kali pandals · visarjan · Narmada Jayanti [P0.5 sprint → P1]
├── AAJ JABALPUR Daily brief · streaks · polls · photo/trivia of day    [P1]
├── CHANNELS     WhatsApp Channel · Web Push · PWA install · ICS        [P1]
└── ASK (AI)     Optional, hard-capped                                   [P7, optional]
```

| Phase | Backend needed? | Recurring cost |
|---|---|---|
| P0–P2 | **Yes — Supabase from P1** (auth, saves, trips, creators) + R2 | $0 (within free tiers) |
| P3+ | + Workers (uploads), Realtime, moderation queue | $0 (within free tiers) |

**Why the backend starts in P1:** the product is dynamic from the first release (accounts, saves, trips, votes, daily brief). The moderation and spam risk is contained by (a) login-gated writes, (b) Turnstile, (c) the trust ladder, (d) kill-switch flags in `config` (§14), and (e) launching with **read-mostly features first** (saves, trips, votes need no moderation).

---

# 5. ARCHITECTURE

## 5.1 Overview
```text
                        ┌─────────────────────────────────────────────┐
  Browser / PWA ───────►│ Cloudflare Pages                            │
                        │  • prerendered editorial pages (SEO/speed)  │
                        │  • few on-demand SSR routes (edge-cached)   │
                        │  • places.geojson, search-index.json, thumbs│
                        └─────────────────────────────────────────────┘
        │ map tiles ───► OpenFreeMap (no key)  ──fallback──► PMTiles on R2
        │ volatile JSON ► R2 public bucket: weather.json, events.json, leaderboard.json, creators-top.json
        │ dynamic data ─► Supabase JS client (browser → Postgres/RLS/RPC, Auth, Realtime)   ← most "dynamic" traffic
        │ photo upload ─► Cloudflare Worker (presigned URL) ─► R2
        │ directions ───► deep links to Google Maps / OSM / geo: (no routing engine)
        │ donations ────► UPI deep link + static QR (no gateway)
        ▼
  GitHub (public repo: code + content/)
        └── Actions: build/deploy · cron jobs · backups · link check · weekly digest
```

**Dynamic without paying (design):**
- **Astro (hybrid):** pages default to prerender for speed/SEO; routes that need per-request rendering (`/u/<username>`, creator boards, shared trips, OG images) use `prerender = false` on the Cloudflare adapter and are edge-cached (`stale-while-revalidate`). These count toward the Workers daily cap (§5.3), so everything else is client-side.
- **Interactive islands** (Preact/Svelte): map, Trip Builder, search, voting, Q&A, RSVPs talk to Supabase directly from the browser under RLS — no app server.
- **Realtime** only where it earns its place (RSVP/“I’m going” counters, Ask Locals updates); everything else uses fetch-on-open to stay inside free connection limits.

## 5.2 Stack

| Layer | Choice | Free-tier facts (see Appendix A) | Fallback if it changes |
|---|---|---|---|
| Static hosting/CDN | **Cloudflare Pages** | Unlimited static bandwidth; commercial use allowed | Netlify / GitHub Pages (non-commercial only) |
| Framework | **Astro (hybrid: prerender + on-demand routes) + TypeScript**, islands in Preact/Svelte | Adapter runs on Cloudflare Pages/Workers free tier | Next.js on Cloudflare / static export |
| Database + Auth | **Supabase** (Postgres, PostGIS, RLS, Auth, Edge Functions) | 500 MB DB, 50k MAU, ~5 GB egress; pauses after 7 days inactivity; no daily backups | Neon / self-hosted Postgres via nightly dump |
| Object storage | **Cloudflare R2** | 10 GB, 1M writes + 10M reads/month, zero egress fees | Backblaze B2 (S3 API) |
| Serverless | **Cloudflare Workers** | 100k requests/day, 10 ms CPU | Supabase Edge Functions |
| Maps | **MapLibre GL JS + OpenFreeMap** | No key, no view limits; no search/routing | Protomaps PMTiles on R2 |
| Search | **MiniSearch** (autocomplete) + **Pagefind** (full text) | Client-side, $0 | — |
| Weather | **Open-Meteo**, fetched by cron | Free non-commercial, < 10k calls/day | Paid plan / alternative when monetising |
| Donations | **UPI deep link + static QR** | No gateway, no fee; manual reconciliation | Razorpay/Ko-fi page (check fees/KYC) |
| Directions / transport | **Deep links** (Google Maps, OSM, `geo:`) + editorial transport data | No API key, no quota | — |
| Realtime | **Supabase Realtime** (limited use) | Free tier has connection/message caps — verify | Polling every 30–60 s |
| Bot protection | **Cloudflare Turnstile** | Free | hCaptcha |
| Analytics | **Cloudflare Web Analytics** (cookie-less) + Search Console + counters in Postgres | Free | Umami Cloud |
| Errors/uptime | GitHub Actions health-check + issue on failure; optional Sentry free | Free | UptimeRobot |
| CI/CD, cron | **GitHub Actions** (public repo) | Free for public repos | Cloudflare Cron Triggers |
| Email (only if magic link used) | Free-tier SMTP provider | Supabase's built-in sender is heavily rate-limited — verify | Google sign-in only |

**Not used:** FastAPI server, MongoDB, Redis, Vercel Hobby (non-commercial only — conflicts with the later monetisation plan), Google Maps Platform, paid LLM APIs, Apple sign-in, SMS OTP.

## 5.3 Capacity math (planning assumptions — re-check at each phase)

| Resource | Free cap | Assumption | Estimated use | Headroom |
|---|---|---|---|---|
| Static page views | Unmetered | 10k visitors/mo × 4 pages | 40k views | ∞ |
| Workers requests | 100k/day | 15% of visitors interact, ~20 calls each | ~1k/day | ~100× |
| Supabase egress | ~5 GB/mo | 30k API calls × 5 KB | ~150 MB | ~30× |
| Supabase DB | 500 MB | 100k tips × 0.5 KB + 500k check-ins × 0.1 KB, ×2 index overhead | ~200 MB | 2.5× → prune job keeps it flat |
| Auth MAU | 50k | Registered users active monthly | < 5k early | 10× |
| R2 storage | 10 GB | Photos resized ≤ 1600 px WebP, ~200 KB avg | 50,000 photos | at 500 approved photos/mo → ~8 years; at 3,000/mo → ~17 months |
| Pages builds | ~500/mo | ≤ 5 builds/day, editorial only | ≤ 150 | 3× |
| SSR routes (Workers requests) | 100k/day (shared with uploads) | ≤ 5% of visits hit an SSR route; edge cache hit ≥ 80% | ~1–3k/day | ~30× |
| Supabase Realtime | Concurrent-connection & message caps (verify) | Realtime only on event/Q&A pages | Low hundreds peak | Degrade to polling |
| Creator votes | Postgres rows | 30 creators × 9 categories, 1 vote/cat/user/mo | < 50k rows/yr | Prune monthly |

**Rule R5 in practice:** weather (every 3 h), events (nightly + on approval) and leaderboard (nightly) are written to R2 as JSON. They never touch the Git repo or trigger a build.

## 5.4 Repository layout
```text
jabalpurverse/
├── site/                 # Astro app (pages, islands, PWA)
├── content/
│   ├── places/*.yaml
│   ├── stories/*.md
│   ├── history/*.yaml
│   ├── missions/*.yaml
│   ├── trips/*.yaml
│   ├── festivals/2026.yaml
│   ├── creators/*.yaml      # consented creator profiles
│   ├── transport/           # hubs.yaml, rates in config, per-leg overrides
│   ├── finance.yaml         # support transparency page
│   ├── supporters.yaml      # opt-in names
│   └── community/        # nightly-exported approved submissions (as PRs)
├── workers/              # upload-presign, cron endpoints
├── supabase/migrations/  # SQL + RLS + RPC + tests
├── scripts/              # import (OSM/Wikidata/Commons), validators, export
├── .github/workflows/    # build, nightly, weekly-digest, backup, linkcheck
└── docs/                 # PRD.md, CONTENT_GUIDE.md, MODERATION.md, RUNBOOK.md
```

---

# 6. MODULES

## 6.1 Explore & Places

**Homepage:** search box, map preview, category chips, "Today" card, featured places, one story, one mission, Then-vs-Now teaser. No login prompt.

**Place categories:** Tourism · Food · Culture · Heritage · **Narmada & Ghats** · Leisure · Photography.

**Place content schema** (file: `content/places/<slug>.yaml`):
```yaml
id: bhedaghat
slug: bhedaghat
name: { en: Bhedaghat (Marble Rocks), hi: भेड़ाघाट }
aliases: [bheraghat, bhedaghat, marble rocks, भेड़ाघाट]   # feeds Hinglish search
category: tourism/nature
tags: [narmada, marble-rocks, boating]
coords: [79.812, 23.130]        # lng, lat — example; verify from OSM, hand-check
area: Bhedaghat
summary: { en: "...", hi: "..." }       # ≤ 160 chars
description: { en: "...", hi: "..." }
fee_text: "..."                          # free text, not a number
fee_checked_at: 2026-09-01
typical_hours_text: "..."
hours_checked_at: 2026-09-01             # hidden in UI after 180 days
best_time: "..."
visit_minutes: 120
accessibility: { step_free: unknown }    # yes | no | unknown
family_friendly: true
parking: "..."
safety_note: "..."
timings: {...}          # see §6.15.3 (mandatory for tourism/heritage/food)
entry: {...}            # fees & extras, see §6.15.3
access: {...}           # legs, modes, costs, see §6.15.3 (mandatory)
images:
  - { file: bhedaghat-01.webp, alt: "...", credit: "...", license: CC-BY-SA-4.0, source_url: "..." }
sources:
  - { type: official|editorial|osm|wikidata|contributor, url: "...", accessed: 2026-09-01 }
verified_at: 2026-09-01
verified_by: prash
status: published    # draft | published | temporarily_closed | permanently_closed | archived
```
**Not stored in place data:** average rating, review count, videos (YouTube embed only), contact details for businesses, parking availability as a boolean, "related missions/stories" (computed at build from cross-references).

**Status/review lifecycle:** `draft` → open a pull request (= pending review) → merge = `published`. No separate PENDING_REVIEW state to maintain.

**Trust fields:** `sources[]` (type + URL + accessed date) and `verified_at`. `verificationStatus` collapses to three visible labels: *Editorial*, *Community-confirmed*, *Unverified* — computed from sources and confirmations, not hand-set.

## 6.2 Interactive Map
- MapLibre GL JS, loaded lazily (after first paint / on interaction); map `maxBounds` restricted to Jabalpur + day-trip radius to limit tile requests.
- Places served as one `places.geojson` (built statically, ~100–200 KB gzip at 1,000 places); clustering via MapLibre's built-in GeoJSON cluster source.
- Layer toggles: Places · Food · Heritage · **Narmada ghats (with a subtle river line)** · Photography · Events (today) · Missions.
- Selected-place bottom sheet → place page, **"Getting There" card (§6.15)**, "Directions" (deep link to Google Maps / OSM / geo: URI — **no routing engine**), Save, Add to Trip.
- **Creators layer:** places with creator-tagged reels get a subtle marker badge (§6.17).
- "Near me": browser geolocation, computed locally with haversine over the JSON; location never sent to a server.
- Marker states reduced to: normal · featured · event today · mission · historical.
- Attribution required and shown automatically by MapLibre (OpenFreeMap + OpenMapTiles + OpenStreetMap).
- **Fallback:** Jabalpur-region PMTiles extract on R2 (range requests), used if OpenFreeMap is unavailable or changes terms.

## 6.3 Search
- Build step emits `search-index.json` (id, names EN/HI, aliases, category, area, coords) — target < 100 KB gzip — loaded lazily; MiniSearch gives prefix + fuzzy matching offline.
- **Hinglish/Hindi:** aliases in content + a normaliser (lowercase, strip diacritics, collapse doubled vowels, map common variants such as `bh/b`, `aa/a`, `v/w`, `ee/i`). Examples that must work: `bhedaghat`, `भेड़ाघाट`, `bhedaghat jaana hai`.
- **Rule-based query parser** (no LLM): `near <place>`, category words, `under <₹N>` (matches editorial price bands), `today/tomorrow/weekend` (matches events), `sunset/family/picnic` (matches tags).
- Pagefind covers stories and history full text.
- Ranking signals: text match · distance · category match · verification label · freshness. Not used: user history, open-now (unless hours verified ≤ 180 days), paid placement (never).

## 6.4 Today
**Not offered (cannot be sourced reliably for free):** Bhedaghat boating/ropeway status, crowd level, traffic, waterlogging, road obstruction.

| Card | Source | Refresh | Failure behaviour |
|---|---|---|---|
| Weather (city, Bhedaghat) | Open-Meteo, fetched by Action | every 3 h → `weather.json` on R2 | Card hides if data > 12 h old |
| Sunrise / sunset / golden hour | Computed locally (suncalc-style maths) | live in browser | none needed |
| Events today/this week | `events.json` on R2 | nightly + on approval | shows "No events listed" |
| Seasonal & closure notes | Editorial YAML, e.g. per-place `status_note` + `status_note_at` | manual, rare | **Auto-labelled "Unconfirmed" after 30 days** |
| Report a change | Form → `reports` table | — | — |

Weather note: Open-Meteo's free API is non-commercial and IP-rate-limited; one shared-IP Worker can be throttled, so fetching happens from a scheduled Action (≈ 8 calls/day per location), not from user browsers.

## 6.5 History & Then vs Now
- Content: historical places, timeline (ancient → modern), old photographs, neighbourhood stories, Narmada-related history.
- **Then vs Now:** before/after slider (lightweight web component), each pair with title, year/approx year, location, credit, licence, source.
- **Image sourcing policy (hard rule):** only Wikimedia Commons (PD/CC with attribution recorded), government/archive material with permission on file, or contributor donations with an explicit CC BY / CC BY-SA consent checkbox. "Rights unknown" images are never published. A "Copyright concern" report auto-hides the asset pending review.
- Historical facts are researched, cited, and reviewed before publishing.

## 6.6 Stories
- Markdown files: text, images, map pin, related places, optional YouTube (privacy-enhanced embed) or audio link. **No self-hosted video/audio.**
- Required front-matter: `author`, `published`, `updated`, `sources[]`, `fact_check: unchecked|checked`.
- "Did you know?" and "Visit nearby" blocks built from cross-references.

## 6.7 Food
- Food places reuse the place schema with `category: food/*` plus `dishes[]`, `what_to_order[]`, `price_band: ₹|₹₹|₹₹₹` (editorial, with `price_checked_at`).
- **Not offered:** ratings, exact prices, delivery availability, live hours.
- Food quests (e.g., Breakfast Quest: Poha, Jalebi, Samosa, Kachori) are ordinary missions.
- "Open now" appears only when `hours_checked_at` ≤ 180 days; otherwise the page links to Google Maps for live hours.

## 6.8 Events
| Source | Effort | Automation |
|---|---|---|
| Submission form (login + Turnstile) | Low | Goes to moderation queue; trusted submitters auto-publish |
| Organiser ICS/calendar feeds registered by a moderator | Very low | Nightly ingest job, dedupe on title+date+venue |
| Annual festival file `festivals/<year>.yaml` | ~30 min/year | Edited once a year |
| Recurring events (weekly markets, aarti, etc.) | One-time | RRULE expansion at build/cron |

- **No scraping** of news or ticketing sites (terms/copyright risk, brittle upkeep).
- Past events auto-archive the day after `end`; state model reduced to `published · cancelled · postponed · completed`.
- Every event shows source link + "Confirm before travelling".

## 6.9 Quest (missions, XP, badges)

**Mission types (MVP):** Collection (visit N of these), Knowledge (answer a question whose answer is on-site, e.g. a plaque), Check-in. **Phase 2 of Quest:** Photo mission (moderated). Not included: Event mission, moderator-approval as a default path.

**Verification tiers (honest labelling):**

| Tier | Method | Trust | Use |
|---|---|---|---|
| T0 | Self-declared checklist | Very low | Anonymous progress (localStorage), no XP sync |
| T1 | Browser geolocation within radius (server-side distance check; coordinates not stored) | Low | Basic XP |
| T2 | On-site knowledge answer | Medium | Higher XP |
| T3 | Moderated photo | Higher | Difficult missions |

Browser location can be spoofed and cannot be truly verified on the web. Therefore: **rewards are cosmetic only (XP, badges).** Anything with monetary value (sponsor coupons) requires a physically verifiable step (QR at the venue) and is deferred.

**XP** — append-only `xp_ledger`; total = SUM. Values live in `config`, not code:
```text
Visit place (T1) +10 · Basic mission +50 · Difficult mission +150
Approved photo +20 · Approved place suggestion +50 · Approved story +100
```
**Anti-abuse (simplified, database-enforced):** `unique(user_id, mission_id)`, `unique(user_id, reason, ref)` on the ledger, daily XP cap and per-mission cooldown inside the RPC, Turnstile at sign-up, rate limits in RPC. Not built: device heuristics, duplicate-media detection, repeated-GPS-pattern analysis.

**Badges** — rules stored as JSON in `config`, evaluated by a SQL function inside the completion RPC (no cron, no separate worker). Initial set: Jabalpur Explorer, **Narmada Yatri**, Bhedaghat Explorer, Food Hunter, History Hunter, City Photographer, Nature Explorer, Early Explorer, Local Guide.

**Leaderboards:** deferred to Phase 7. When added: monthly only, opt-in, top 20, built by a nightly job into `leaderboard.json`; accounts younger than 14 days excluded.

## 6.10 Trips & Smart Planner
- **Curated trips** (YAML): 2 Hours · Half Day · One Day · Family · Budget · Photography · Food · Narmada Day · Weekend Nearby. Distance/time computed at build (straight-line × detour factor, labelled "approximate"). "Open route in Google Maps" deep link with waypoints. Bike routes as downloadable GPX + GeoJSON line on the map.
- **Smart Planner (deterministic, no AI):** inputs = time available, budget band, interests, group type, today's weather. A deterministic client-side scorer over the JSON dataset returns an ordered plan with links. Zero hallucination risk, zero cost, works offline.

## 6.11 Community (Phase 3)
| Contribution | Format | Default state |
|---|---|---|
| **Tips** (instead of reviews) | ≤ 280 chars; one per user per place; "Recommend" toggle | Pending → auto-publish at trust L1 |
| **Photos** | ≤ 3/day/user; client-side resize + EXIF strip | Pending → auto-publish at trust L2 |
| **Corrections** | Structured "suggest an edit" (field + proposed value + source) | Always human-reviewed |
| **New place suggestions** | Small form | Human-reviewed; exported as PR |
| **Reports/flags** | Reason enum (incorrect, closed, wrong location, offensive, copyright, duplicate) | 3 distinct reporters → auto-hide pending review |

**Trust ladder (the main automation lever):**

| Level | How reached | Effect |
|---|---|---|
| L0 | New account | Everything pending |
| L1 | 3 approved contributions | Tips auto-publish (post-moderated) |
| L2 | 10 approved contributions | Photos auto-publish |
| L3 "Local Guide" | Invitation, offered when L2 + 60 days + clean record | Can approve queue items |

Not offered: multi-dimension ratings (Value/Cleanliness/Accessibility), business responses to reviews, a separate account-age system (the trust level covers it).

**Photo pipeline:**
```text
Select → client resize (≤1600px, WebP) → strip EXIF (incl. GPS) → Turnstile
→ Worker returns presigned R2 URL (MIME + size ≤ 2 MB validated) → upload
→ row in `photos` (status=pending) → moderation queue → publish
```
No server-side virus scan (not available free); mitigations: allow-list of `image/jpeg|png|webp`, magic-byte sniffing in the Worker, serve from a separate cookie-less R2 domain, `Content-Disposition`/`nosniff` headers, no SVG.

## 6.12 Accounts & Profile
- **Anonymous first:** browse, search, map, stories, events, saved places and quest progress all work without login (localStorage). Login to sync, contribute or earn XP.
- **Auth:** Google sign-in + email magic link (via free SMTP). *Not offered:* Apple sign-in (paid developer account), phone/SMS OTP (cost + DLT overhead in India).
- **Profile:** name/username, saved, visited, XP, badges, contributions; privacy toggles (public profile, show visited, show contributions). Exact location history is never stored or shown.
- **Account deletion:** one RPC cascades all user rows; photos queued for R2 deletion; contributions either deleted or anonymised per user choice.

## 6.13 Moderation & Admin
- **Tooling:** Supabase Studio for data; one **mobile-first `/admin/queue` page** (role-gated by RLS + RPC checks) listing pending tips/photos/submissions/reports with Approve · Reject · Request edit · Hide. Every action goes through an RPC that writes `audit_log`.
- **Admin/moderator accounts:** TOTP MFA enabled.
- **Target moderator effort:** < 5 minutes/day at 20 items/day, thanks to the trust ladder.
- **Approved submissions → content:** nightly Action exports approved place suggestions/corrections into `content/community/` as a pull request (mobile-reviewable). Merge → build → deploy.
- **Not built:** Businesses, AI logs, XP editor UI (edit `config` in Studio), System settings UI.

## 6.14 Ask Jabalpur (AI) — Phase 7, optional, kill-switchable
- **Not part of MVP.** Smart Planner + search cover the same user intents deterministically.
- If built: Worker → normalise query → cache lookup → **retrieve entities by structured filters/geo** → LLM only phrases an answer from those retrieved public entities → response with links and "as of" dates.
- **Hard limits:** global daily cap (e.g., 300 calls), per-user cap (e.g., 5/day), cache by normalised query, feature flag `ai_enabled` in `config`. When quota is exhausted the UI silently falls back to Smart Planner output.
- **Privacy:** send only public place data; never user PII or coordinates. Free LLM tiers may use prompts for model improvement.
- **Never bills:** no billing account attached to the LLM project (R2).
- **Better use of an LLM: offline, in CI, as a drafting assistant** — first-draft Hindi translations, alt text, tags, short descriptions from cited sources — always ending in a human-reviewed PR.

## 6.15 Getting There — Navigation, Transport, Cost & Timing (every famous place)

**Goal:** every published tourism / heritage / food / leisure place answers, on one card: *How do I get there from where I am, what will it cost, how long will it take, and when is it open?* — for bus, cab, auto, train, own car/bike and walking.

### 6.15.1 What the card shows (per place)
```text
┌ GETTING THERE ─────────────────────────────────────────────┐
│ From: [My location ▾ | Railway Stn | Bus Stand | Airport |  │
│        Madan Mahal Stn | Pick on map]                        │
│ 🚌 City bus / shared tempo   ~₹20–60   ~60–80 min   [route]  │
│ 🛺 Auto (reserve)            ~₹xxx–xxx ~45 min               │
│ 🚕 Cab (Ola/Uber/Rapido)     ~₹xxx–xxx ~40 min  [Open app]   │
│ 🏍 Own bike  ⛽ ~₹xx   🚗 Own car ⛽ ~₹xx + parking ₹xx       │
│ 🚆 Train/Air: nearest station/airport + onward option        │
│ 🚶 Walk (if < 2 km)                                          │
│ ⏱ Plan for: 2 h on site · Best slot: 7–9 am                 │
│ 🕘 Timings · 🎟 Entry fees · 📷 Camera fee · 🅿 Parking      │
│ Last checked: Sep 2026 · Source · [Suggest a correction]     │
│ [Open in Google Maps] [OSM] [Share to WhatsApp] [Add to Trip]│
└──────────────────────────────────────────────────────────────┘
```
- **Origin selector** defaults to the user's location (client-side geolocation, never sent to a server) with fixed "hub" origins: Jabalpur Junction (JBP), Madan Mahal station, main bus stands, Dumna airport (JLR), Napier Town/city centre, plus "pick on map". Hub list lives in `content/transport/hubs.yaml`.
- **Directions are deep links, not a routing engine** (keeps R1/R6): `https://www.google.com/maps/dir/?api=1&origin=…&destination=<lat,lng>&travelmode=driving|transit|walking|two-wheeler`, an OSM directions link, and a `geo:` URI for any installed map app. Live transit timing is therefore delegated to the user's maps app; the site holds the *editorial* knowledge (which bus/tempo actually runs, where it starts, tips, scams to avoid, fixed fares).
- **Cab buttons:** Uber/Ola/Rapido deep links pre-filled with drop coordinates where each app supports it (verify each scheme at build time in a CI link test); otherwise open the app/site.
- **Train / air / intercity bus:** show nearest station/airport and onward hop (e.g., "Jabalpur Jn → Bhedaghat by tempo/cab"); link out to the official booking/status pages; no scraping (R7).
- **Day-trips** (Bargi Dam, Kanha, Bandhavgarh, Pachmarhi, Amarkantak, etc.): same card, with intercity bus/train/road options and "overnight recommended?" flag.

### 6.15.2 Cost model (transparent, one config, easy to keep fresh)
Costs are shown as **ranges with a checked date**, from two sources merged at build:
1. **Editorial fixed fares** in the place file (bus/tempo fares, entry fees, boat/ropeway tickets, parking).
2. **Model estimates** computed client-side from per-km assumptions in `config` (`transport_rates`), so one edit updates every place: e.g., `city_bus`, `shared_tempo`, `auto_reserve`, `cab`, `bike_fuel`, `car_fuel`, each with `min_fare`, `per_km_low`, `per_km_high`, `checked_at`. Distance = road distance stored per hub→place edge (editor-verified) or straight-line × detour factor labelled "approx".
- Labels: **Fixed** (verified fare), **Estimate** (model), **Ask before boarding** (negotiated modes such as autos). Never a single number for negotiated modes.
- **Group calculator:** "4 people · cab ₹X ÷ 4" and round-trip toggle.
- **Freshness (R7):** any cost/timing field older than 180 days is hidden and replaced by "Check locally" + a maps link; the weekly digest lists them. `transport_rates` re-verification reminder is a monthly job (§8).

### 6.15.3 Schema additions (per place file)
```yaml
timings:                       # structured so "open today" can be computed
  weekly: { mon: "closed", tue: "09:00-17:00", ... }   # or free text if irregular
  seasonal_note: "..."         # e.g. monsoon river-level closures; expires after 30 days
  last_entry: "16:30"
  best_slots: [{ label: "Morning", range: "07:00-09:00", why: "fewer crowds, soft light" }]
  checked_at: 2026-09-01
entry:
  fees: [{ who: "Indian adult", inr: 0, note: "" }, { who: "Foreign national", inr: 0 }]
  extras: [{ what: "Camera / video", inr: 0 }, { what: "Boating (per boat)", inr: 0 }, { what: "Ropeway", inr: 0 }]
  checked_at: 2026-09-01
access:
  nearest_station: { name: "…", km: 0 }
  parking: { cars: "yes|no|limited", fee_inr: [0, 0], bikes: "yes" }
  legs:                        # one per (hub → place)
    - from: jabalpur-junction
      road_km: 0
      options:
        - mode: shared_tempo   # city_bus|intercity_bus|shared_tempo|auto|cab|own_car|own_bike|train|walk
          route_text: "Board at … ; get off at …"
          duration_min: [0, 0]
          fare_inr: [0, 0]     # fixed fares only; models fill the rest
          frequency_text: "…"
          first_last: "…"
          tip: "…"
          checked_at: 2026-09-01
          source: { type: editorial|official|contributor, url: "…" }
  accessibility_note: "Steps / uneven path / wheelchair …"
  safety_note: "…"
```
CI rule: a `published` tourism/heritage place **fails validation** without `timings`, `entry`, and at least one `access.legs` entry with `checked_at`.

### 6.15.4 Launch coverage — "famous places" seed list
All values below are **seed prompts for the editor, not published facts** — distances are approximate, and every fare/timing must be verified on the ground or from an official source and dated before it goes live (R7).

| Place | Approx. from city centre | Modes to document | Notes to capture |
|---|---|---|---|
| Bhedaghat – Marble Rocks & boating | ~15–25 km (sources differ by starting point); a small railway halt exists near Bhedaghat ✱ | tempo/bus from city, cab, own vehicle | Boat fees per boat/person, monsoon/river-level closures, night-boating claims (verify), timings |
| Dhuandhar Falls & ropeway | ~2 km beyond Bhedaghat | walk/auto from Bhedaghat, cab | Ropeway fare/timings, best season, safety rails |
| Chausath Yogini Temple | ~1–3 km from Bhedaghat centre | walk/auto | Stairs, timings, ASI-protected-site rules |
| Madan Mahal Fort & Balancing Rock | ~5–8 km | city bus, auto, cab | Hill climb, entry, sunset spot, safety |
| Rani Durgavati Museum | ~4–6 km | auto, city bus, cab | Ticket, closed days, photography rules |
| Gwarighat and Uma Ghat (Narmada Maha Aarti, boating) | ~9 km from Jabalpur Junction | auto, cab, city transport | Daily evening aarti (~7 pm, confirm), boating fares, festival-day boat closures, safety near water, Gurudwara and temple etiquette |
| Tilwara Ghat (Narmada, Gandhi memorial) | ~12–14 km from Jabalpur Junction | auto, cab, own vehicle | Timings, crowd days, safety near water |
| Lameta, Jilheri, Saraswati ghats | ✱ verify | auto, cab | Festival crowds, parking |
| Bargi Dam / Reservoir | ~35–45 km | cab, own vehicle, intercity bus | Cruise/boating availability (verify), road condition, half-day plan |
| Kachnar City (giant Shiva statue) | ~8–12 km | auto, cab | Timings, evening lighting, parking |
| Pisanhari Ki Madiya (Jain temple) | ~8–12 km | auto, cab | Hill road, dress code, timings |
| Tripur Sundari Temple, Tewar | ~10–15 km | cab, tempo | Festival crowds, parking |
| Hanumantal & city-centre heritage | ~2–4 km | walk, auto | Combine with food walk |
| Day trips: Kanha, Bandhavgarh, Pachmarhi, Amarkantak | 100–250+ km | train, intercity bus, cab, self-drive | Permits, safari booking site, seasons, overnight need |

Editors also add the top **food places** (poha/jalebi breakfast spots, Sadar/Napier Town food streets, etc.) with the same access card (short legs, parking, evening-only flags).

### 6.15.5 Extras that make it genuinely useful
- **"Best way to go" chip** per place (cheapest / fastest / most comfortable) computed from the option data.
- **Multi-stop planner cost & time** (§6.16 Trip Builder): sums legs between consecutive stops using the same data.
- **Offline trip pack:** saved places + their access cards cached by the service worker for spotty network at Bhedaghat.
- **Fare-warning tips** ("agree price before boarding", "metered/prepaid options where they exist") as editorial notes, never as accusations against named operators.
- **Community corrections:** "This fare/timing changed" one-tap report feeds the moderation queue and re-dates the field once confirmed.

## 6.16 Trip Builder (dynamic itinerary tool)
- Build a day plan by adding places from any place page or the map; **drag to reorder**; the app auto-computes leg distance, time and cost (from §6.15 data), total on-site time, sunset warnings ("Madan Mahal closes before sunset?") and a "too packed" score.
- **Inputs:** start time, origin hub, mode preference, budget band, group size, interests, weather. A deterministic scorer suggests additions ("You have 90 min free — add Balancing Rock").
- **Outputs:** shareable link (plan encoded in the URL; saved to Supabase for logged-in users), print/PDF via print stylesheet, WhatsApp share text, "Open full route in Google Maps" with waypoints, GPX for bikers, offline pack.
- **Cost:** pure client-side + optional row in `trip_plans` → $0.

## 6.17 Creators Hub — Top Instagram Influencers of Jabalpur
**Purpose:** give local creators visibility and give visitors a human, visual way to discover the city — while staying honest, consent-based and nearly free to run.

**Hard constraints (why it is designed this way)**
- Instagram's public data is not freely or reliably available: scraping breaks Meta's terms and the official APIs require app review and business/creator accounts. **No scraping, no automated follower counts.**
- A ranked "Top influencers" list based on unverifiable follower numbers would invite disputes. So the list is **opt-in, consented, methodology-published, and community-voted.**

**Features**
| Feature | How it works | Cost/effort |
|---|---|---|
| **Creator profiles** | Name, handle, categories (Food · Travel · Photography · History · Comedy · Fashion · Fitness · Music · Devotional & Narmada · Vlogs), city area, links (Instagram/YouTube), consented avatar, bio (≤ 160 chars), self-declared follower **band** with `declared_at` (<10k · 10–50k · 50–250k · 250k+) | YAML/DB, free |
| **Apply / claim** | Login + Turnstile form; **verification by a one-time code placed in the Instagram bio** (moderator checks in seconds) | ≈ 2 min per creator |
| **Community Picks** (the "Top" board) | Monthly vote, 1 vote per category per account, accounts ≥ 7 days old, Turnstile, rate limits; top 10 per category published; monthly reset; methodology page linked from the board | Nightly JSON job, $0 |
| **Editors' Spotlight** | Hand-picked "creator of the month" | Manual, 15 min/month |
| **Featured-at-place** | Creators tag a place with a reel/post link ("Reel from Bhedaghat by @handle") shown on the place page (link card; **click-to-load embed** only after user consent to avoid third-party tracking) | Moderated submission |
| **Creator stats** | Creators get a private counter of outbound clicks and place views from their tagged links (UTM-style, cookie-less counters) | Postgres counters |
| **Creator badge & trips** | Verified creators can publish curated trips (reviewed PR) | Existing pipeline |
| **Collab board** | Local businesses can request a creator via "Suggest a collab" mailto/form (no payments handled by the platform) | Deferred to P6+ |

**Rules**
- Only creators who **opted in** appear; removal on request within 48 h; no minors' profiles without guardian consent (DPDP).
- Paid/sponsored placement is **never** mixed into the vote; any paid feature is labelled "Sponsored" (check current Indian influencer-advertising disclosure guidance before enabling).
- Follower band is self-declared and dated; the UI says so. No "verified reach" claims.
- Avatars self-hosted on R2 (consented), links `rel="noopener nofollow"`.

**Schema (`content/creators/<handle>.yaml` for editorial; votes/claims in Supabase)**
```yaml
handle: example_handle
platform: instagram
name: "..."
categories: [food, travel]
area: "Napier Town"
bio: { en: "...", hi: "..." }
followers_band: "50-250k"
declared_at: 2026-09-01
links: { instagram: "https://instagram.com/…", youtube: "" }
avatar: { file: example.webp, consent: true, consent_at: 2026-09-01 }
featured_posts: [{ place: bhedaghat, url: "https://instagram.com/reel/…", title: "…" }]
status: published   # draft | published | removed_on_request
```

## 6.18 Support Jabalpurverse — Donate button (no payment gateway needed)
- **Where:** persistent but non-intrusive "❤ Support" in the footer + nav, a small end-of-article card, and a `/support` page. Never a popup, never blocks content.
- **How (India-friendly, $0 fees):** UPI deep link `upi://pay?pa=<VPA>&pn=Jabalpurverse&cu=INR&tn=Support` (amount optional) that opens the user's UPI app on mobile, plus a **static UPI QR** for desktop. Preset amounts ₹20 / ₹50 / ₹100 / custom. No gateway, no card handling, no PCI scope, no platform fee.
- **Optional later:** Razorpay/BMAC/Ko-fi page link for international supporters — check fees/KYC first; not required for launch.
- **Transparency page ("Where your money goes"):** `content/finance.yaml` lists monthly costs (domain, any upgrade) and support received; progress bar toward the **upgrade fund** (§14 tripwires). Updated monthly (5 min) — the monthly digest issue reminds the maintainer.
- **Supporters wall (opt-in):** supporters may submit a display name/handle via form after paying; moderator adds to `supporters.yaml`. No auto-matching of payments (needs a gateway) — deliberate, keeps privacy and cost at zero.
- **Compliance notes:** use a dedicated UPI ID/bank account for the project; do **not** promise tax deductions (80G etc. require a registered trust/Section 8 entity); confirm treatment of voluntary receipts with a CA before scaling; mention voluntariness clearly ("Support is optional; the site stays free").
- **Analytics:** `support_click` counter only.

## 6.19 More Standout Features (all $0 or near-$0)
| # | Feature | What it does | How it stays free |
|---|---|---|---|
| 1 | **Jabalpur Passport** | Digital stamps for places visited (with quests), shareable stamp-card image | localStorage → sync on login; Canvas share card |
| 2 | **"Right now" home feed** | Weather + time + season aware suggestions (sunset spots at golden hour, indoor picks when raining, breakfast spots before 10 am) | Rule-based scorer, client-side |
| 3 | **Audio guide** | Listen to a place/story in Hindi or English while walking | Browser text-to-speech (Web Speech API); no audio hosting |
| 4 | **Voice search** | Speak the place name (Hinglish) | Browser API, progressive enhancement |
| 5 | **Ask Locals (Q&A)** | Questions per place ("Is the ropeway worth it?"), upvoted answers, trust-ladder moderation | Supabase rows, RLS |
| 6 | **Event RSVPs / "I'm going" counters** | Live counters on events and meetups (Realtime) | Supabase Realtime within free limits; falls back to polling |
| 7 | **Photo Wall + Then vs Now slider** | Community photo grid per place; heritage before/after | R2 + moderation |
| 8 | **Share-card generator** | Trips, badges and passports become WhatsApp/Instagram-ready images | Client-side Canvas |
| 9 | **Essentials hub** | Hospitals, police, railway/bus enquiry, ATMs, public toilets, pharmacies near a place | OSM extract at build + verified helpline list (dated) |
| 10 | **Jabalpuri phrasebook & trivia of the day** | Local slang, food words, daily quiz with streaks | Static JSON + localStorage |
| 11 | **Festival countdown & calendar (add to Google Calendar/ICS)** | One-tap ICS download per event | Static + ICS generation |
| 12 | **Dark mode, Hindi/English toggle, low-data mode** | Better comfort on mid-range phones and weak networks | CSS + i18n JSON |
| 13 | **Accessibility & family filters** | "Step-free", "kid-friendly", "elderly-friendly" filters | Tags in content |
| 14 | **Weekend planner emails (optional)** | Weekly "things to do" digest | Only if free SMTP quota allows; otherwise skipped |
| 15 | **Embeddable widgets** | Partners embed a "Visit Jabalpur" place card | Static JSON + one script |

## 6.20 Utsav Mode — Ganesh, Durga/Kali Pandals, Visarjan Routes & the Festival Calendar

**Why this is a core module, not a page:** festivals are the biggest reason a whole city opens the same website on the same night. Utsav Mode turns Jabalpurverse into the thing people check *during* the festival ("which pandals are best tonight, how do I get there, is the road closed, where is the jhanki now?") and gives it a year-round calendar of reasons to return (§6.21).

### 6.20.1 What was researched (28 Sep 2026) — and what was not
| Finding | Source type | Use in product |
|---|---|---|
| The Jabalpur district administration has published an **"online darshan" list of special Durga temples/pandals**, starting with **City Bengali Club Kali Mata Temple, Civic Center**, with daily aarti times listed (page dated 2020). | District administration website (blocks automated fetching; read from search snippet only) | Seed list + proof that an official list exists → the editor should re-read it by hand each year and cite it |
| **City Bengali Club (Civic Center)** runs one of Jabalpur's best-known Bengali Durga Pujas; a Facebook page for it referred to a "99th year / pre-centenary" celebration. | Facebook page snippet (year not confirmed) | Featured pandal; **verify the founding year before printing any "since" claim** |
| Jabalpur's **Nagar Nigam prepares designated immersion sites (kunds)** each year; in 2025 the commissioner inspected **Hanumantal** and reviewed lighting, sanitation, safety and staffing at other kunds. | Local news report (Oct 2025) | "Official visarjan points" layer; eco-visarjan messaging |
| **Tilwara Ghat** is roughly 12–14 km from Jabalpur Junction (Narmada; Gandhi memorial). | Local web article (Aug 2026) | Getting There card + ghat entry in the visarjan layer |
| A Sihora bus-into-pandal accident (Sept 2025) shows why crowd/traffic safety notes matter. | News report | Safety block on every pandal; no fatalities are ever shown in the product UI |
| **Ganesh Utsav 2026 has just ended** (visarjan coverage of Jabalpur/Bhopal/Indore ran this week). **Shardiya Navratri / Durga Puja starts in ~2 weeks (about 11–12 Oct; Dussehra about 20–21 Oct — published calendars disagree by a day, so the editor must confirm against a Panchang and local samiti announcements).** | Panchang/news sites | **Launch deadline for the Utsav Sprint (§12, P0.5)** |
| **Not found:** a machine-readable list of Jabalpur's top Ganesh pandals, an official route map for chal-samaroh (immersion processions), or reliable crowd data. Route notices are issued by police/administration each season, not published as open data. | — | See sourcing policy 6.20.4; the PRD deliberately does **not** list unverified pandal names or routes |

### 6.20.2 Features
| Feature | What the user sees | Notes |
|---|---|---|
| **Pandal Directory** | Filter by festival (Ganesh · Durga · Kali · Saraswati · Ramlila · Chhath) and area; each card: samiti name, theme/idol highlights, aarti & darshan times, best hours, entry/queue tips, parking, women/family/elder-friendly notes, **Getting There** (§6.15) | Editorial + samiti-submitted; every pandal has a `source` and `verified_at` |
| **Pandal Trail (route builder)** | "Pick 5 pandals" → ordered walking/driving route, travel time, best start time, "avoid" hours, parking & drop points, safe-exit tips, share to WhatsApp | Extends Trip Builder (§6.16); route via Google Maps deep link |
| **Visarjan Guide** | Map + timeline of **official immersion points** (kunds/ghats), typical procession windows, road-closure/diversion notices, eco-immersion info, last-mile parking | Sourced only from announcements (6.20.4) |
| **Chal-Samaroh / Jhanki route layer** | Announced procession route(s) as a line on the map with start/end, expected timing, and **status label: Announced · Historical (last year) · Unconfirmed** | GeoJSON per festival-year; never shown as guaranteed |
| **"Where is the jhanki now?" (live checkpoints)** | Trusted volunteers (Local Guides, L3) post timestamped checkpoint pings ("Head of procession at X, 11:20 pm"); pings auto-expire after 6 h and only render on the festival night | Realtime (Supabase) with polling fallback; **a deliberate exception to the general "no unsourced live status" rule (R7)** because it is event-bounded, moderated by trusted users only, timestamped and auto-expiring |
| **Traffic & safety notices board** | Official diversions, parking bans, emergency numbers, helplines, water/first-aid points; each item links to its official source and expires automatically | Moderator-curated; **no rumours, no crowd-sourced accusations** |
| **Community Picks: Best Pandal** | Opt-in vote (login, one per category per festival), labelled *community-voted, not official*; categories: Theme · Idol art · Lighting · Eco-friendly · Neighbourhood favourite | Same vote engine as §6.17; result JSON on R2 |
| **Pandal Photo Wall & Reels** | Community photos (moderated) and creator reels tagged to pandals (link cards) | Reuses §6.11 and §6.17 |
| **Darshan & aarti reminders** | Opt-in reminder ("Aarti at City Bengali Club, 8 pm") via Web Push or "Add to Calendar" ICS | Push is best-effort; ICS is universal |
| **Eco-visarjan mode** | Highlights kunds, clay-idol information and "avoid river immersion" advice where officials say so | Follow local orders |
| **Festival archive** | Each year's pandals, routes and photos are kept — the site gets richer every year | Git content + R2 |

### 6.20.3 Schema
```yaml
# content/festivals/<year>/pandals/<slug>.yaml
id: city-bengali-club-durga
festival: durga            # ganesh | durga | kali | saraswati | ramlila | other
name: { en: "City Bengali Club, Civic Center", hi: "सिटी बंगाली क्लब, सिविक सेंटर" }
samiti: "..."
place_ref: city-bengali-club            # optional link to a permanent place page
coords: [lng, lat]                      # hand-verified
area: "Civic Center"
highlights: { en: "...", hi: "..." }
schedule: { aarti: ["08:30", "20:00"], darshan_hours: "...", special_days: [{ day: ashtami, note: "Sandhi puja timing" }] }
crowd_tip: "Evenings after 9 pm are typically busiest (editorial guidance)"
access_note: "Pedestrian-only lanes from 8 pm (if announced)"
family_notes: { women_safety: "...", elderly: "...", kids: "..." }
sources: [{ type: official|samiti|editorial|contributor, url: "...", accessed: 2026-09-28 }]
verified_at: 2026-09-28
status: published | withdrawn
---
# content/festivals/<year>/routes/<slug>.geojson  (+ meta)
festival: ganesh
type: chal_samaroh | diversion | parking_ban
status: announced | historical | unconfirmed
source: { type: police|nagar_nigam|samiti, url: "...", published_at: 2026-09-20 }
valid_from: 2026-09-25T14:00+05:30
valid_to:   2026-09-26T06:00+05:30      # auto-expires; UI hides after valid_to
geometry: LineString/MultiLineString   # hand-digitised from the notice
```
CI rules: a `routes` file without `source` or `valid_to` fails the build; a pandal without `verified_at` for the current year is hidden from the current-year view.

### 6.20.4 Sourcing & safety policy for pandals and routes (hard rules)
1. **Routes come only from announcements** (police traffic advisory, Nagar Nigam/district notices, samiti press notes) or last year's confirmed route labelled *Historical*. A route is never inferred, guessed or crowd-drawn.
2. **Every notice shows its source and publish time, and disappears at `valid_to`.**
3. **No rumour, no inflammatory content:** processions can be sensitive. Live pings are limited to trusted users, contain only location + time, and cannot carry free text about people or groups; comments are disabled on route and notices. Reports of disorder are redirected to **112/local police**.
4. **Neutral, inclusive framing:** the festival calendar also lists Eid, Muharram, Christmas, Gurpurab and other community festivals with the same rigour; the notices board treats all processions the same.
5. **Crowd advice is editorial and generic** ("evenings are busier"), never a claim of live crowd density.
6. **Children, elders and safety:** every pandal card carries standard safety tips (meeting point for families, stay out of the road, keep to pedestrian lanes when announced).
7. **Environmental notes** follow official orders; the product does not advocate against any community's practices, it surfaces what the administration has announced.
8. **Samitis can claim/correct their listing** via the correction form; changes are reviewed and dated.

## 6.21 The Daily-Habit Engine — Why People Come Back (retention design)

**Problem:** a city guide is a *planning* product — people use it a few times a year (a trip, a weekend). To be visited daily it must also be a *daily utility and daily ritual* for residents, not only a directory for visitors.

**Design principle:** a returning user needs **a reason (fresh content), a trigger (a nudge or habit), an action (something quick to do) and a reward (progress/belonging)** — every layer must stay near-$0 and ≤ 2 h/week to maintain, so most content is *generated* from data we already hold or from user actions.

### 6.21.1 Audience-by-audience reasons to return
| Segment | Daily/weekly reason | Feature |
|---|---|---|
| Residents (main daily audience) | "What's on today, is anything closed, what's the weather, what's the aarti time?" | **"Aaj Jabalpur" daily brief** (§6.21.2), notices board, festival calendar, WhatsApp Channel |
| Families | Weekend plans, kids' spots, festival evenings | Weekend Planner, Pandal Trail, family filters |
| Students & young adults | Cafés, hangouts, photography, challenges, status-worthy content | Passport, streaks, photo of the day, share cards, creator reels |
| Foodies | "Where to eat right now?" | Time-aware **Food Now** (breakfast/lunch/street-food evening), Dish of the Day |
| Devotees / culture | Aarti and darshan timings, festival routes | Darshan & aarti reminders, Utsav Mode |
| Creators | Visibility, votes, stats | Creators Hub dashboard (§6.17) |
| Jabalpur diaspora (outside the city) | Nostalgia, festival visuals, home updates | Then-vs-Now, festival live photo wall, WhatsApp/Telegram shares |
| Visitors | Trip planning | Trip Builder, Getting There |

### 6.21.2 "Aaj Jabalpur" — the daily brief (the anchor habit)
A single home-screen card, refreshed by **prebuilt JSON on R2** (no rebuilds), that changes every day:
1. **"नर्मदे हर 🙏" greeting, date, day and festival of the day** from the annual festival file (§6.20) — e.g., "Ashtami: Sandhi Puja timing at …".
2. **Weather + sunrise/sunset + golden hour** (already in Today).
3. **Today's events, the Narmada Maha Aarti time at Gwarighat, and other aarti/darshan times** (events pipeline + editorial).
4. **Notices** (official traffic/festival/closure notices from the notices board, each with source and expiry).
5. **One thing to do today** — chosen by the deterministic scorer (time of day, weather, season, festival, user's saved places).
6. **Daily trivia / "Jabalpur word of the day" / "Did you know?"** (rotating from content; 1 tap, streak-counted).
7. **Photo of the day** (community-approved, credited).
8. **Poll of the day** ("Best poha in town?", "Which pandal are you visiting tonight?") — results shown after voting, votes counted by RPC.
Everything degrades individually: a card with no fresh data hides itself; the brief is never empty because trivia/word/photo/tip rotate from a queue prepared in advance (a monthly 30–45 min batch, LLM-assisted drafts reviewed in a PR).

### 6.21.3 Habit loops (mechanics)
| Loop | Trigger | Action (≤ 30 s) | Reward |
|---|---|---|---|
| **Daily check-in streak** | Opening the brief | Tap "I'm here" / answer trivia | Streak counter, weekly badge, share card; streak freeze once/week |
| **Daily poll** | Card in the brief | 1 tap | Instant results, small XP |
| **Passport stamps** | Visiting places/pandals | Check-in (T1/T2) | Stamps, festival-edition badges (Pandal Hopper, Visarjan Witness) |
| **Weekend Planner** | Thursday evening nudge | Choose vibe → plan | Shareable plan; saved to Trip Builder |
| **Photo of the day** | Brief | Upload/vote | Credit, XP, feature |
| **Ask Locals** | Notification when your question is answered | Answer/upvote | Trust level progress, Local Guide path |
| **Creator follow** | New reel tagged | Watch/save | Creator stats for them; discovery for you |
| **Seasonal quests** | Festival begins | Complete missions | Limited-time badges (can only be earned during that festival) |
| **Local leaderboards (Phase 7)** | Monthly | — | Opt-in, top-20 |

### 6.21.4 Channels that bring users back at zero cost
| Channel | How | Cost | Notes |
|---|---|---|---|
| **WhatsApp Channel** (one-way broadcast) | Daily/weekly "Aaj Jabalpur" + festival alerts; site has "Follow on WhatsApp" everywhere | Free | Highest-reach channel in India; no user phone numbers collected |
| **Telegram channel** | Same content for tech-savvy/students | Free | Optional |
| **Web Push (opt-in)** | Topics: Aarti times · Festival alerts · Weekend plan · New reel from followed creator | Free within limits | Works best on Android/Chrome; iOS requires installed PWA — treat as best-effort; ask only after 2–3 visits, never on first load |
| **Add-to-Calendar (ICS)** | One tap per event/festival/aarti | Free | Universal |
| **Home-screen install prompt (PWA)** | After the 3rd visit or when saving a trip | Free | Icon on the phone is the strongest retention lever |
| **Instagram/YouTube Shorts** | Auto-generated share cards + template "Jabalpur in 30 seconds" | Free | Owned by the maintainer or creators |
| **Email digest (optional)** | Monthly "Best of Jabalpur" | Free-tier SMTP only | Skipped if quota is tight |
| **SEO evergreen + seasonal hubs** | "Jabalpur Durga Puja pandals 2026", "Jabalpur Ganesh visarjan route", "Jabalpur weekend plans" | Free | Seasonal spikes convert to installs/WhatsApp follows |

### 6.21.5 The "Jabalpur Year" — annual return calendar
A content wheel that makes the site relevant in every season (dates change yearly; all are editor-verified against a Panchang/official notice). Items marked ✱ are proposals to **verify locally** before launch.
| Season | Moments |
|---|---|
| Jan–Feb | Makar Sankranti · Basant Panchami · **Narmada Jayanti / Prakatotsav (12–13 Feb 2027; confirm)** · Republic Day |
| Mar–Apr | Holi/Rang Panchami · Navratri (Chaitra) · Ram Navami · Eid · Mahavir Jayanti |
| May–Jun | Summer evenings/cool-off spots · exam season & results (students) · Heat advisories |
| Jul–Aug | **Monsoon** — Dhuandhar Falls, Bargi, Bhedaghat viewing (with **safety advisories**) · Kanwar/Shravan · Raksha Bandhan · Janmashtami |
| Aug–Sep | **Ganesh Utsav & Visarjan** · Muharram (when applicable) |
| Sep–Oct | **Navratri / Durga Puja / Kali Puja / Dussehra & Ramlila** |
| Oct–Nov | **Sharad Purnima and Narmada Mahotsav at Bhedaghat** · Diwali markets · Chhath · **Kartik fair at Gwarighat** · Kartik Purnima Narmada snan |
| Dec | Winter picnics · Christmas · Bhedaghat winter season |
Each moment gets a hub page, a checklist of places/events, a Passport edition and (where relevant) notices.

### 6.21.6 Retention metrics and targets (hypotheses, calibrate after 60 days)
| Metric | Definition | Target |
|---|---|---|
| **DAU/MAU (stickiness)** | Daily active ÷ monthly active | ≥ 15% baseline, ≥ 30% during festival windows |
| **D1 / D7 / D30 return** | % of new users returning | ≥ 30% / ≥ 15% / ≥ 8% |
| **Visits per active user per week** | Sessions | ≥ 2.5 |
| **Brief open rate** | Users opening "Aaj Jabalpur" | ≥ 40% of sessions |
| **Streak ≥ 3 days** | Share of logged-in users | ≥ 20% |
| **PWA installs / WhatsApp channel followers** | Per 100 visitors | ≥ 5 / ≥ 3 |
| **Push opt-in** | Of prompted users | ≥ 10% (never prompt on first visit) |
| **Festival spikes** | Peak-night sessions vs ordinary night | ≥ 5× with **no** outage (cache + static route/pandal JSON) |
Events added: `brief_open`, `poll_vote`, `streak_day`, `push_optin`, `pandal_view`, `route_view`, `whatsapp_follow_click`.

### 6.21.7 Guardrails for a "sticky" product
- **No dark patterns:** streaks can be paused; no guilt notifications; push only on topics the user selected; easy unsubscribe.
- **Meaningful, not addictive:** rewards are cosmetic; the goal is "discover/learn/plan/visit/contribute" (north star §1.3).
- **Privacy:** streaks/passport are local-first; sync only after login; no location history.
- **Sustainability:** every daily element must be automated, pre-queued or user-generated — no feature that needs the maintainer online every day (R3).

## 6.22 Narmada Hub — Maa Narmada, the Soul of Jabalpur

**Cultural premise:** Maa Narmada (also called Rewa) is the soul of Jabalpur, and **"Narmade Har"** is how people greet each other here. Jabalpur is also known as **Sanskardhani**, the cultural capital of Madhya Pradesh. The product must feel like it was made *by* Jabalpur, so the river is not one category among many; it is the spine of the brand, the calendar, the map and the daily habit.

### 6.22.1 What was verified (28 Sep 2026)
| Fact | Source type | Product use |
|---|---|---|
| **Daily evening Maha Aarti at Gwarighat, around 7 pm, about 30 minutes**, free entry, floating diyas, and the aarti ends with a pledge to keep the Narmada clean; timing may start earlier in winter. Gwarighat is about 9 km from Jabalpur Junction. | Visitor reviews and travel-guide pages (not official) | "Aaj ki Aarti" card; **confirm timings with the aarti committee before publishing** |
| Gwarighat has boating, a half-submerged Maa Narmada temple, Uma Ghat and the Narmada Sidh Kund, a Gurudwara, Ram, Ganesh and Jain temples, and a Kartik fair. | Travel guides, Wikipedia | Ghat pages, quests |
| **Narmada Jayanti / Prakatotsav** falls on Magh Shukla Saptami. In 2027 the Madhya Pradesh tourism site lists **12 Feb 2027 at Gwarighat**, while a Panchang shows the tithi spanning 12–13 Feb. Past editions had lakhs of devotees at Gwarighat, Tilwara, Bhedaghat, Lameta and Jilheri ghats, a Maa Narmada rath yatra, chunri offerings and a Maha Aarti. | Government tourism site, newspaper reports | Festival hub; confirm the date locally |
| On Narmada Jayanti 2024 the administration **prohibited boat operations at the main ghats** (village transport boats exempted). | Newspaper report | Ghat advisories; never assume boating is open on festival days |
| **Narmada Mahotsav**: two-day festival at Bhedaghat on **Sharad Purnima**, running since 2005, with music, folk dance, food, photo and painting contests, organised through the district tourism council. Sharad Purnima 2026 is expected in late October; confirm. | Government events portal, newspaper | Events calendar |
| Ghats named in reports: **Gwarighat, Tilwara, Bhedaghat, Lameta, Jilheri, Saraswati**. | Newspaper reports | Ghat Trail |
| Gwarighat is a halt for **Narmada Parikrama** pilgrims. | Visitor reviews | Parikrama Companion (verify details before publishing) |

### 6.22.2 Brand and experience rules ("the river runs through it")
1. **Greeting:** the site greets with **"नर्मदे हर 🙏 (Narmade Har)"**, with time-of-day variants ("शुभ प्रभात"), on the home hero, the "Aaj Jabalpur" brief, WhatsApp share sign-offs, push notification openers, the thank-you after a donation, the passport stamp and the 404 page. Used with respect, never as a sales slogan; not used on notices about accidents, disorder or bereavement; a **"greeting on/off"** toggle is in settings.
2. **Language:** **Hindi and English are both first-class from launch**, with a visible toggle; Hindi is the default when the browser language is Hindi. Devanagari names appear next to English everywhere.
3. **Visual identity:** marble-white, river-teal and diya-saffron design tokens; the river curve and the Marble Rocks gorge as motifs; a subtle "river line" on the map connecting the ghats. Gentle, reduced-motion-safe ripple animation only.
4. **Inclusive by design:** the greeting and the aarti are local culture, presented for everyone. The site stays equally welcoming to visitors of every faith (Gurudwara Gwarighat, Christmas, Eid and others are in the calendar).
5. **Reverence and safety first:** no memes about the river or deities; no commercial sponsorship of aarti or ghat pages; sponsors never appear inside sacred content.

### 6.22.3 Features
| Feature | What the user sees | Notes |
|---|---|---|
| **"Aaj ki Aarti" card** | Daily Narmada Maha Aarti time at Gwarighat with a countdown, "how to reach", an "Add to calendar" button, and the cleanliness pledge text | Editorial time with `checked_at`; twice-yearly re-check (Oct and Mar) because the time shifts with the season |
| **Narmada Ghat Trail** | A map and passport edition covering Gwarighat, Uma Ghat, Tilwara, Lameta, Jilheri, Saraswati and Bhedaghat, each with a ghat page (rituals, etiquette, safety, timing, Getting There) | "Narmada Yatri" badge; T1/T2 check-ins |
| **Narmada Jayanti / Prakatotsav hub** | Countdown, shobha yatra and rath yatra timing when announced, ghat-wise crowd advice, parking and diversion notices, boat-closure advisories, aarti, prasad and langar information, photo wall | Runs on **Utsav Mode** (§6.20) with the same source and expiry rules |
| **Narmada Mahotsav hub (Bhedaghat, Sharad Purnima)** | Programme, artists, timings, how to reach, food stalls, competitions | Sourced from the district tourism council; shows "Programme announced/unannounced" |
| **Kartik fair at Gwarighat** | Dates, what to expect, safety | Confirm dates each year |
| **Narmada Parikrama Companion** | Overview, Jabalpur halts, etiquette, offline pack (Hindi/English), Jabalpur ashrams and free-meal points as **community-confirmed with dates** | Content must be verified with ashrams and ghat committees; never promises free services |
| **River safety card** | Currents, slippery steps, no swimming after dark, children and elders, dam-release and river-level notices **only when officially announced**, emergency numbers | Sits on every ghat and Bhedaghat page |
| **Nirmal Narmada** | "Keep the Narmada clean": flower and diya waste etiquette, plastic-free tips, links to official or NGO clean-up drives, volunteer sign-up posted by verified organisers | Community-confirmed events; volunteer badge |
| **Narmada stories** | Legends of Maa Narmada (Rewa), the Bhedaghat marble gorge, Chausath Yogini, Dhuandhar, the sayings of the river; audio in Hindi and English (§6.19) | Cited, reviewed, `fact_check` required |
| **Narmada Circuit day trips** | Amarkantak (source of the Narmada), Omkareshwar, Maheshwar, Narmadapuram ghats, Bargi Dam | Getting There cards; details verified before publishing |
| **"Narmade Har" share cards** | Passport and trip cards with the greeting and a river-line background | Client-side canvas |

### 6.22.4 Schema additions
```yaml
# content/places/<ghat>.yaml  (category: heritage/ghat)
river: narmada
ghat_type: [bathing, aarti, cremation, boating, fair]
aarti: { time_text: "About 7 pm daily, ~30 min (earlier in winter)", checked_at: 2026-09-28, source: { type: contributor, url: "..." } }
etiquette: { en: "...", hi: "..." }
river_safety: { en: "...", hi: "..." }
festival_hubs: [narmada-jayanti, narmada-mahotsav, kartik-fair]
```
CI rule: a ghat page fails validation without `river_safety` and, for aarti ghats, `aarti.checked_at`.

---

# 7. DATA MODEL

## 7.1 Git content (source of truth for published editorial data)
Places, stories, history, missions, trips, festivals (see §5.4). Validated by a schema check in CI (missing source, missing licence, bad coordinates outside Jabalpur bounds, duplicate slug → build fails).

## 7.2 Supabase (dynamic/user data only)
```sql
profiles(id uuid pk → auth.users, username unique, role text default 'user',
         trust_level int default 0, public_profile bool default false, created_at)
tips(id, place_id text, user_id, body text check (char_length(body) <= 280),
     recommended bool, status text, created_at, unique(place_id, user_id))
photos(id, place_id, user_id, r2_key, width, height, license text, status, created_at)
saves(user_id, place_id, created_at, pk(user_id, place_id))
checkins(id, user_id, place_id, method text, created_at)      -- no coordinates stored
mission_progress(user_id, mission_id, state jsonb, completed_at, pk(user_id, mission_id))
xp_ledger(id, user_id, delta int, reason text, ref text, created_at, unique(user_id, reason, ref))
reports(id, entity_type, entity_id, reason, reporter_id, status, created_at, unique(reporter_id, entity_type, entity_id))
submissions(id, type, payload jsonb, user_id, status, moderator_id, note, created_at)
events(id, title, start_at, end_at, venue_place_id, source_url, source_type, status, created_by)
audit_log(id, actor_id, action, entity, entity_id, before jsonb, after jsonb, reason, at)
trip_plans(id, user_id, title, plan jsonb, is_public bool, created_at)
creator_claims(id, user_id, handle, verification_code, status, created_at)
creator_votes(user_id, creator_handle, category, month, pk(user_id, category, month))   -- 1 vote/category/month
creator_place_tags(id, creator_handle, place_id, url, title, status, created_at)
qa_questions(id, place_id, user_id, body, status, created_at) · qa_answers(id, question_id, user_id, body, votes, status, created_at)
rsvps(user_id, event_id, created_at, pk(user_id, event_id))
link_clicks(day, target_type, target_id, count)     -- cookie-less counters (creator/support/directions)
pandal_votes(user_id, festival_year, category, pandal_id, pk(user_id, festival_year, category))
route_pings(id, festival_year, route_id, user_id, lng, lat, note_code, created_at, expires_at)   -- trusted (L3) only, auto-expire ≤ 6 h; note_code is an enum, no free text
notices(id, kind, title, body, source_url, published_at, valid_to, status, created_by)           -- official traffic/festival notices, auto-expire
daily_state(user_id, day, streak int, poll_answers jsonb, trivia_answered bool)                 -- optional sync; local-first otherwise
push_subscriptions(user_id, endpoint, topics text[], created_at)                                  -- opt-in, topic-based, deletable
config(key pk, value jsonb)   -- XP values, rate limits, badge rules, feature flags
```
Transport data, entry fees, timings, creator profiles, finance and supporters remain **Git content** (§6.15–6.18); only votes/claims/RSVPs/trips are in Supabase.

**Not stored in the database:** businesses, notifications, AI conversations; badges are derived from the XP ledger and rules; historical assets live in Git.

## 7.3 Security model (RLS-first)
- RLS on every table; default deny.
- Users read only `status='published'` rows plus their own pending rows; write only their own rows.
- Sensitive operations (award XP, complete mission, approve, hide, delete account) only through `SECURITY DEFINER` RPCs that check role and enforce caps.
- Moderator/admin role stored in `profiles.role`, never taken from client input.
- Automated tests (pgTAP or SQL scripts in CI) assert: anonymous cannot write; user cannot read others' pending rows; user cannot self-award XP; moderator actions are logged.
- No secret keys in the client; only the public anon key. Service key lives in GitHub Actions/Workers secrets.

## 7.4 Freshness model (per entity type)
| Entity | Freshness rule | Behaviour after expiry |
|---|---|---|
| Historical facts | None | — |
| Place description | Review every 24 months | Weekly digest lists overdue |
| Hours / fees / price band | `*_checked_at` ≤ 180 days | Field hidden; link to live source |
| Seasonal/closure note | ≤ 30 days | Shown as "Unconfirmed" |
| Events | End date + 1 day | Auto-archived |
| Weather | ≤ 12 h | Card hidden |
| Transport fares / travel time / entry fees / timings | `checked_at` ≤ 180 days | Hidden → "Check locally" + maps link |
| Transport rate model (`transport_rates`) | Reviewed every 90 days | Model estimates flagged "may be outdated" |
| Creator follower band | `declared_at` ≤ 365 days | Band hidden; profile stays |
| Support/finance page | Monthly | Reminder in digest |
| Routes, diversions, parking bans, notices | `valid_to` (always set) | Auto-hidden; historical routes labelled "Historical" next year |
| Live route pings | ≤ 6 h | Auto-expire |
| Pandal listings | Re-verified each festival year | Hidden from current-year view until re-verified |
| Daily brief | 24 h | Card hides; previous rotating items reused |
| Community tips/photos | No expiry | Re-flagged if place is marked closed |

---

# 8. AUTOMATION CATALOG

Everything below runs on GitHub Actions cron (public repo) unless stated. Each job fails *safe* and reports in the weekly digest.

| Job | Schedule | What it does | Fail-safe |
|---|---|---|---|
| `build-deploy` | On merge to `main` | Validate content → build → deploy | Failed validation blocks deploy |
| `weather-refresh` | Every 3 h | Open-Meteo → `weather.json` on R2 | Card hides after 12 h |
| `events-refresh` | Nightly + on approval | Ingest ICS, expand recurrences, drop expired → `events.json` | Serves last good file |
| `publish-approved` | Nightly | Export approved community submissions → PR | Nothing published without merge |
| `leaderboard` | Nightly (Phase 7) | Materialise top-20 → JSON | Serves last good file |
| `prune` | Weekly | Delete rejected/expired rows, old check-ins > 12 months | Keeps DB < 400 MB |
| `db-backup` | Nightly | `pg_dump` → private R2 bucket, keep 30 days | Digest alerts on failure |
| `restore-drill` | Monthly | Restore latest dump into a temp Postgres container in CI, run sanity queries | Opens an issue if it fails |
| `link-check` | Weekly | Verify all `sources[]` and external URLs (lychee) | Broken links listed in digest |
| `freshness-check` | Weekly | Find overdue `*_checked_at`, unconfirmed notes, stale places | Listed in digest |
| `import-drafts` | Manual/monthly | Pull new candidates from OSM/Overpass, Wikidata, Commons → draft YAML (never auto-publish) | Human PR review |
| `health-check` | Every 30 min | Ping site, Supabase, R2 JSON, tile endpoint → open GitHub issue on failure | Also works as Supabase **keep-alive** (prevents 7-day pause) |
| `keepalive-repo` | Every ~50 days | Empty commit if repo idle (GitHub disables scheduled workflows on long-inactive repos — verify current rule) | — |
| `deps` | Weekly | Dependabot/Renovate; auto-merge patch updates that pass CI | Major updates need manual merge |
| `rates-review` | Monthly | Reminder issue to re-check `transport_rates`, top-10 fares, and entry fees | Model estimates auto-flagged "may be outdated" after 90 days |
| `creator-links` | Weekly | Check creator profile links/handles still resolve (lychee); flag removed accounts | Broken profiles hidden after 2 failed weeks |
| `creator-board` | Monthly (1st) | Tally votes → `creators-top.json` on R2, reset, publish methodology date | Serves last good board |
| `finance-reminder` | Monthly | Reminder to update `finance.yaml`/supporters | Page shows "last updated" |
| `daily-brief` | Daily ~05:30 IST | Compose "Aaj Jabalpur" JSON (festival of the day, sun times, weather, events, notices, rotating trivia/word/photo/poll) → R2; optionally post to WhatsApp Channel by copy-paste text artifact | Serves yesterday's file; cards hide individually |
| `notices-expiry` | Hourly during festivals, else daily | Hide notices/routes/pings past `valid_to` | Expired items never shown |
| `festival-season-prep` | 21 days before each festival | Open a checklist issue: confirm dates, collect pandal list, route notices, safety numbers, enable Utsav Mode flag | Digest flags overdue items |
| `content-queue` | Monthly | LLM-assisted drafts of 30 days of trivia/words/tips → PR for human review | Queue never < 14 days (digest warns) |
| `aarti-time-check` | Twice a year (Oct, Mar) and before Narmada Jayanti | Reminder to re-confirm the Gwarighat aarti time and ghat advisories with local sources | Aarti card shows "Check locally" if `checked_at` > 180 days |
| `weekly-digest` | Monday | One GitHub issue: queue sizes, oldest pending item age, DB size, R2 object count, failed jobs, overdue content, quota estimates | This issue is the *only* thing the maintainer must read |

**Maintenance budget (target):** weekly digest read (10 min) + moderation (5 min × 5 days) + content edits (30–60 min) + dependency merges (10 min) + creator claims (10 min) ≈ **1.5–2 h/week**. Monthly extras (≈ 45 min): rates review, finance page, creator board check.

---

# 9. TRUST, SAFETY, PRIVACY, LEGAL

## 9.1 Trust labelling (UI rules)
- Every factual field with a date shows it ("Hours checked Sep 2026").
- Community content is labelled as such; unverified data is never shown as fact.
- **Never display community-reported data as guaranteed truth.**

## 9.2 Security baseline
- HTTPS everywhere (Cloudflare), security headers via `_headers`, strict CSP, CORS locked to own origin.
- Turnstile on sign-up, uploads, submissions; RPC-level rate limits configurable from `config`.
- Upload validation as §6.11. No user-generated HTML; all text escaped, Markdown only in editorial content.
- Admin: MFA, separate role, audit log, RPC-only privileged actions.
- Secrets only in GitHub/Workers secret stores; separate dev/staging/prod projects (Supabase allows two free projects — use one for prod, one for dev/staging).

## 9.3 Privacy
- Collect minimum data. Location used transiently for Near-me (client-only) and T1 check-in (server-side distance check, coordinates discarded).
- Strip EXIF on photos client-side.
- Never publish a user's current location, visit history, or inferred home location.
- Privacy policy, location-permission explainer, account and contribution deletion.
- Cookie-less analytics → no cookie banner needed.

## 9.4 Legal (not legal advice — confirm with a professional before public launch)
- India's **DPDP Act 2023** consent/notice/deletion duties apply to personal data; check current rule-notification status and any children's-data provisions before enabling accounts.
- As a platform hosting user content, publish terms, a **grievance/contact address**, and a takedown process (copyright + defamation); check IT Rules 2021 intermediary obligations.
- **Donations:** voluntary receipts to an individual/project account have tax and reporting implications; consult a CA. Do not advertise tax deduction unless a registered eligible entity exists. Show clear "voluntary" wording and a refund/contact address.
- **Creators:** consent, easy removal, no misleading "top/verified" claims; publish vote methodology; check current Indian influencer-advertising disclosure guidance before any paid/sponsored placement; guardian consent for minors.
- **Festival routes & notices:** publish only official/announced information with the source and time; add a "confirm with police/samiti" note; moderate for community harmony; report incidents to 112, do not host accusations. Check local advisory rules on sharing live procession locations.
- **Push & messaging:** collect only opt-in tokens; no phone numbers for the WhatsApp Channel; honour unsubscribe; DPDP consent notice applies to push subscriptions.
- **Religious and cultural sensitivity:** sacred content follows committee guidance and stays factual and respectful; the site does not endorse or criticise any community's practice; the greeting can be switched off.
- **Transport & safety information:** fares/timings are indicative and dated; show a "confirm locally" note; do not name-and-shame operators.
- Licences: OSM data → attribution, ODbL share-alike for derived databases (publish the place dataset export accordingly); Commons images → per-image credit + licence; Open-Meteo → attribution link.
- Don't scrape or republish third-party content that violates terms, copyright, database rights or robots rules.

---

# 10. NON-FUNCTIONAL REQUIREMENTS

## 10.1 Performance budgets (mid-range Android, Slow-4G throttling)
| Metric | Budget |
|---|---|
| LCP (place page) | ≤ 2.5 s |
| Initial JS (excl. map) | ≤ 150 KB gzip |
| Map chunk | Lazy-loaded; not on the critical path |
| Place page weight (excl. images) | ≤ 500 KB |
| Images | WebP/AVIF, responsive `srcset`, lazy-loaded; thumbnails ≤ 30 KB |
| Lighthouse mobile performance | ≥ 90 on home + place page |
| Search index | ≤ 100 KB gzip |

## 10.2 SEO
Static, server-rendered HTML; unique title/description; canonical URLs; Open Graph; auto-generated sitemap and robots.txt; JSON-LD (`TouristAttraction`, `Event`, `BreadcrumbList`); human-readable slugs (`/jabalpur/bhedaghat`, `/jabalpur/food`, `/jabalpur/stories/...`); breadcrumbs; internal links from cross-references. Social preview cards generated at build time. Submit to Search Console.

## 10.3 Sharing
Every entity has a stable URL. **WhatsApp share (`wa.me`) is the primary share button**; native Web Share API second. Build-time OG images per place/story/trip.

## 10.4 Accessibility
Keyboard navigation, labels, contrast, alt text (mandatory in content schema), focus states, reduced-motion support, no colour-only meaning, accessible map alternative (list view of the same places). CI runs axe checks on key pages; zero critical violations.

## 10.5 Language
- **Hindi and English are both first-class from launch** with a visible toggle (Hindi by default when the browser language is Hindi); Hinglish/Hindi search from day one (aliases); Devanagari names beside English everywhere.
- Voice search and audio guides: browser Web Speech API as progressive enhancement (§6.19) — free, device-dependent quality.

## 10.6 PWA
Installable; service worker caches shell, saved places and visited pages; offline fallback page; map tiles not cached beyond normal HTTP caching. Web Push considered only in Phase 7 (opt-in).

---

# 11. ANALYTICS & SUCCESS METRICS

**Tooling:** Cloudflare Web Analytics (traffic), Search Console (SEO), and a small set of Postgres counters for product events. No personal identifiers.

**Events (trimmed from 15 to 13):** `place_view`, `search_query` (normalised, no user id), `map_open`, `directions_click`, `transport_mode_click`, `place_save`, `share_click`, `trip_created`, `creator_click`, `support_click`, `mission_start`, `mission_complete`, `contribution_submit`.

| Phase | Metric | Initial hypothesis (calibrate after 60 days) |
|---|---|---|
| Static MVP | Weekly visitors, places viewed/session, search → place click-through, WhatsApp shares | ≥ 3 places/session; ≥ 40% search→click |
| Accounts | Signups per 100 visitors, saves/user, 7-day return | Signup ≥ 2%; return ≥ 15% |
| Community | Approved contributions/month, moderation backlog age | Backlog age < 48 h |
| Quest | Mission start → complete rate | ≥ 30% |
| Ops | Weekly maintenance hours, failed jobs/week | ≤ 2 h; ≤ 1 |
| Retention | DAU/MAU, D1/D7/D30, brief open rate, streaks, festival-night peaks | See §6.21.6 |

---

# 12. BUILD PLAN (rough effort for one experienced full-stack developer; estimates, not commitments)

| Phase | Scope | Dev-days | Backend? |
|---|---|---|---|
| **P0 Foundation** | Repo, brand tokens, content schema + validator (incl. `access/timings/entry`), CI, Cloudflare Pages, domain, Supabase project, RLS baseline | 4–5 | Yes |
| **P0.5 Utsav Sprint (before Navratri, ≈ 2 weeks; Utsav Mode also powers Narmada Jayanti and Narmada Mahotsav later)** | Minimal Durga/Kali Puja hub: pandal list (from district list + samitis), map, aarti/darshan times, Getting There deep links, official visarjan points, notices board, WhatsApp Channel + share cards, ICS. Git content + Astro static pages + small Supabase votes (optional). **Cut anything not needed for the festival.** | 4–6 | Optional |
| **P1 Dynamic Explore + Getting There** | Home, place pages, map + clustering, Hinglish search, **Getting There card + fare model**, **Trip Builder**, Google login + saves, **Creators Hub (curated)**, **Donate/Support page**, **Narmada Hub (aarti card, ghat trail, river safety, Hindi/English UI, greeting)**, **"Aaj Jabalpur" daily brief + streaks + polls + WhatsApp Channel + PWA install/push prompts**, **Utsav Mode full (Pandal Trail, route layer, checkpoints, Best Pandal vote)**, Essentials hub, PWA, SEO, analytics, seed import scripts | 29–38 | Yes |
| **P2 History + Stories** | Timeline, Then-vs-Now, story template, audio guide (TTS), image-licence tooling | 5–7 | Yes |
| **P3 Community** | Tips, photo upload, Ask Locals, reports, trust ladder, moderation page, backups, restore drill, RLS tests | 8–10 | Yes |
| **P4 Quest + Passport** | Missions, T1/T2 verification, XP ledger, badges, passport & share cards | 5–7 | Yes |
| **P5 Events + Food + Today** | Event pipeline (form + ICS + festivals), RSVPs (realtime), food fields, food quests, "Right now" feed | 6–7 | Yes |
| **P6 Creators (claims, votes) + Shared Trips** | Creator claims (bio-code), monthly votes + boards, creator-tagged reels, creator stats, public/shared trips, embeddable widgets | 6–8 | Yes |
| **P7 Optional** | Capped Ask-Jabalpur, Web Push, monthly leaderboard, Hindi-first UI | 6–10 | Yes |

**Core (P0–P6 incl. P0.5): ≈ 67–88 dev-days.** Content curation (incl. transport/timing verification) is separate (§13).

**Order rationale:** ship a dynamic but *low-moderation* P1 (saves, Trip Builder, curated creators, donate, transport cards — none need a moderation queue), then add each user-generated content system when traffic justifies its moderation cost. **Do not start with AI, AR, a social feed or business tooling.**

---

# 13. LAUNCH CONTENT & ACCEPTANCE CRITERIA

## 13.1 Content targets (scaled to what one person can verify)
```text
Launch (P1):     60–80 places incl. 15+ food · 15+ heritage · 8+ stories · 8+ trips
                 Getting-There cards complete for ALL tourism/heritage places (min. 12 famous places at deepest detail: fares, timings, fees, parking, 3+ modes)
                 15–30 consented creators across 5+ categories (curated); support page live
                 Utsav Mode: 15+ verified Durga/Kali pandals and 15+ Ganesh pandals for the next season, official immersion points listed, festival calendar for the full year
                 Daily brief: 30 days of queued trivia/words/tips/polls before launch; WhatsApp Channel created
                 Narmada Hub: every ghat documented (aarti time, etiquette, safety, Getting There); Narmada Jayanti and Mahotsav hubs ready before their dates
By P4:           100+ places · 20+ history entries · 15+ missions · 8+ badges
Events:          festival calendar + first recurring events (not "10+ events")
```
**Transport/timing data effort:** ≈ 30–45 min per famous place (site visit, official page check, asking auto/tempo stands) — budget ≈ 8–12 h for the 12-place core set; cheaper for food places.

**Seeding shortcut:** `import-drafts` pulls candidates from OSM/Wikidata/Commons into draft YAML with sources pre-filled; human effort ≈ 10–15 min/place to verify and write the summary (≈ 12–20 h for 80 places). Quality and verification outrank count.

## 13.2 MVP (P1) acceptance criteria
- Users can browse, search (English, Hindi, Hinglish), and view places on a map; place pages work on mobile.
- Every published place has ≥ 1 source, `verified_at`, image credit + licence.
- Build fails on missing source/licence/alt text or out-of-bounds coordinates.
- Performance budgets in §10.1 met; axe: 0 critical issues.
- Sitemap, robots, canonical, JSON-LD present; site indexed in Search Console.
- Every tourism/heritage place shows a complete Getting There card (origin selector, ≥ 3 modes, dated cost/time, timings, entry fees, parking, maps deep links); stale fields degrade per §7.4.
- Trip Builder: add/reorder places, see per-leg time/cost totals, share link, WhatsApp share, offline open.
- Creators Hub lists ≥ 15 consented creators with methodology page; Donate page works via UPI on mobile and QR on desktop.
- Narmada Hub is live: the aarti card shows a dated time, every ghat has etiquette and river-safety cards, the greeting and the Hindi/English toggle work on all pages, and boating advisories appear only when officially announced.
- Utsav Mode shows each pandal with source, `verified_at`, aarti/darshan times and Getting There; routes/notices show source, status label and auto-expire; no route appears without a source (CI-enforced).
- "Aaj Jabalpur" renders daily with graceful degradation; streak/poll/trivia work anonymously (local) and sync after login; WhatsApp Channel and PWA-install prompts are in place.
- Hosting/infra cost is ₹0/month; **no payment method is attached to any service.**

## 13.3 Community (P3) acceptance criteria
- Anonymous user cannot write; user cannot see others' pending content or award themselves XP (automated tests).
- Photo upload strips EXIF, rejects non-image/oversize files, and lands in the queue.
- Report → auto-hide at threshold works; every moderator action appears in `audit_log`.
- Nightly backup succeeds; monthly restore drill passes at least once before public launch.
- Account deletion removes user rows and queues media deletion.

## 13.4 Quest (P4) acceptance criteria
- A mission can be started and completed; XP awarded exactly once (unique constraint) even under repeated/parallel requests.
- Daily XP cap and cooldown enforced server-side.

## 13.5 Launch checklist
```text
Product:     nav finalised · mobile tested · map UX tested · search tested with Hinglish queries
Data:        sources recorded · image licences verified · event process defined
Engineering: secrets in stores · backups + restore drill · health-check job · weekly digest live
Security:    RLS tests green · admin MFA · CSP/headers · upload validation
Legal:       privacy policy · terms · contact/grievance address · takedown process · attributions page
SEO:         sitemap · robots · metadata · structured data · indexing verified
Moderation:  report flow · queue page · audit log · moderator guide
```

---

# 14. RISKS, QUOTA TRIPWIRES, AND KILL SWITCHES

| Risk | Likelihood | Mitigation |
|---|---|---|
| Free tiers change (e.g., LLM free quotas were cut sharply in late 2025) | High | No feature depends on a single free quota; every dependency has a fallback (§5.2); AI is optional |
| Supabase project pauses after 7 idle days | Medium | `health-check` job hits the DB every 30 min; nightly backup also touches it |
| DB fills 500 MB | Medium | `prune` job; alert in digest at 80% (400 MB) |
| R2 fills 10 GB | Low–medium | Alert at 80%; purge rejected photos; re-encode older images |
| Cloudflare Workers daily cap hit → 429 | Low | Only dynamic paths use Workers; static assets never invoke them; cache aggressively |
| Spam/abuse in UGC | Medium | Turnstile, trust ladder, auto-hide, RPC rate limits |
| Copyright/defamation complaint | Medium | Licence-per-asset rule, takedown process, tips instead of ratings |
| Stale data erodes trust | High | Freshness model §7.4 auto-hides or downgrades stale facts |
| Single-maintainer bus factor | High | Public repo, RUNBOOK.md, everything scripted, invite Local Guides |
| Transport/fare data goes stale or is wrong | High | Dated fields, 180-day hide, monthly `rates-review`, ranges not single numbers, "confirm locally", one-tap correction |
| Creator list disputes / vote manipulation | Medium | Opt-in only, bio-code verification, 1 vote/category/month, account age ≥ 7 days, Turnstile, published methodology, removal on request |
| Donation misuse/fraud concerns | Low–medium | Transparency page, dedicated UPI ID, clear "voluntary" wording |
| SSR usage spikes Workers quota | Low–medium | Edge cache, few SSR routes, client-side dynamic work, kill-switch to prerender-only mode |
| Wrong/outdated route or pandal info causes confusion or safety issues | Medium–High | Announcement-only sourcing, status labels, `valid_to` expiry, "confirm with police/samiti" banner, editorial pause switch (`utsav_routes_enabled`) |
| Festival-night traffic spike | Medium | Prebuilt static JSON for pandals/routes/notices on CDN, edge cache, realtime only for pings with polling fallback, kill-switches |
| Misinformation or communal misuse of live pings/notices | Medium | Trusted-only pings, enum-only notes, no free-text about people/groups, official-source-only notices, immediate hide via `pings_enabled` flag |
| Low repeat usage despite features | High | Track D1/D7/D30 from launch, ship WhatsApp Channel + daily brief first, cut features that do not move retention |
| Content treadmill burns the maintainer out | High | Pre-queued 30-day content, LLM-drafted/human-reviewed monthly batch, user-generated photos/polls, festival-season checklists |
| Sacred-content errors or insensitivity (aarti times, rituals, river) | Medium | Editor + ghat committee verification, respectful copy rules (§6.22.2), no sponsorship inside sacred content, quick correction path |
| River safety incidents around ghats or boating on festival days | Medium | River safety card, only-official advisories, boat-closure notices, emergency numbers |
| OpenFreeMap/Open-Meteo terms change | Low–medium | PMTiles fallback; weather is a hideable card |

**Upgrade tripwires:**

| Trigger | Action | Approx. cost |
|---|---|---|
| DB > 400 MB after pruning, or need daily backups/no pausing | Supabase Pro | ~$25/mo |
| MAU > 40k | Supabase Pro | as above |
| Workers > 80k req/day sustained | More caching, then Workers paid plan | ~$5/mo |
| R2 > 8 GB | Compress/purge, then paid R2 | ~$0.015/GB-month beyond free |
| Commercial use of weather | Open-Meteo paid plan | see vendor |

Fund upgrades from **donations (§6.18)**/sponsorship revenue, not personal money (§15). Kill-switch flags in `config`: `utsav_mode`, `utsav_routes_enabled`, `pings_enabled`, `push_enabled`, `uploads_enabled`, `signups_enabled`, `votes_enabled`, `realtime_enabled`, `ai_enabled`, `ssr_enabled`.

---

# 15. MONETISATION (post-validation only)

Revenue is pursued only after the product is validated, in this order:

1. **Voluntary support (UPI Donate, §6.18)** covering domain + first upgrade — from day one, non-intrusive, with a public transparency page.
   1a. **Creator perks** (later): paid, clearly-labelled "Sponsored creator" slots outside the vote — only after traffic and disclosure review.
2. **Sponsored missions/trips** (clearly labelled) — only once a physical verification step (QR) exists.
3. **Featured listings / event promotion** — after traffic; never silently override organic ranking.
4. **Affiliate links** where terms permit.
5. **Ads** — last resort; must not degrade discovery.
6. Donate/sponsor the open services you rely on (OpenFreeMap, Open-Meteo) once revenue exists; check licence terms before any commercial step.

---

# 16. DECISION LOG

| Area | Decision |
|---|---|
| Product | Jabalpur-only exploration platform; map-first |
| Delivery | **Dynamic PWA** (hybrid Astro + Supabase + edge); no traditional app server; static prerender only for speed/SEO |
| Navigation | Deep-link directions + editorial transport data (bus/tempo/auto/cab/own vehicle), cost ranges with dates, timings & fees per place |
| Creators | Opt-in Creators Hub; community-voted monthly boards; no scraping; self-declared follower bands |
| Donations | UPI deep link + QR; transparency page; no gateway |
| Festivals | Utsav Mode: pandals + visarjan guide; routes only from announcements; live pings trusted-only and auto-expiring |
| Retention | Daily brief ("Aaj Jabalpur"), WhatsApp Channel first, opt-in push, streaks without dark patterns |
| Timing | P0.5 Utsav Sprint before Navratri (≈ 2 weeks) |
| Identity | Narmada Hub is core; "Narmade Har" greeting (with off toggle); Hindi and English first-class from launch |
| Frontend | Astro + TypeScript (Next.js static export acceptable) |
| Hosting | Cloudflare Pages + Workers + R2 (not Vercel Hobby) |
| Data | Editorial content in Git; user data in Supabase Postgres |
| Auth | Google + email magic link; no Apple/SMS |
| Maps | MapLibre + OpenFreeMap; PMTiles fallback; no routing engine |
| Search | Client-side, Hinglish-aware, rule-based parser |
| Live | Weather/sun/events only; no unsourced live status |
| Reviews | Short tips + Recommend; no star ratings |
| Quest | Cosmetic rewards; tiered low-trust verification |
| Moderation | Trust ladder + auto-hide + one mobile queue |
| AI | Deterministic planner first; capped optional LLM later; LLM for offline drafting |
| Backups | Nightly `pg_dump` + monthly restore drill |
| Analytics | Cookie-less Cloudflare + 9 counters |
| Monetisation | After validation; support link first |
| Native apps / AR / 3D / social feed | Not planned |

---

# APPENDIX A — EXTERNAL FACTS CHECKED (28 Sep 2026)

Free tiers change often; **re-verify before each phase.** Sources are third-party summaries plus vendor pages where available.

| Service | What was found | Caveat |
|---|---|---|
| Supabase Free | 500 MB DB, 50k MAU, ~5 GB egress, 2 projects, pauses after 1 week idle; daily backups only on paid plans | File-storage figure differs by source (500 MB–1 GB) — irrelevant, photos go to R2 |
| Cloudflare R2 | 10 GB storage, 1M Class A + 10M Class B ops/month, no egress fees | Write-heavy workloads should be monitored |
| Cloudflare Pages/Workers | Unlimited static bandwidth/requests; Workers 100k requests/day, 10 ms CPU; commercial use allowed; ~500 Pages builds/month | Past the Workers cap, requests get errors, not bills |
| Vercel Hobby | Personal, non-commercial use only | Reason it is excluded |
| GitHub Pages | Free-tier terms prohibit commercial use | Reason it is not the primary host |
| OpenFreeMap | No view limits, no registration/API key; attribution required; no search, routing or raster/satellite | Donation-funded; keep PMTiles fallback |
| Open-Meteo | Free API for non-commercial use; < 10,000 calls/day, 5,000/hour, 600/minute; CC BY 4.0 attribution; users on shared IPs have reported 429s | Commercial use needs a paid plan |
| Gemini API free tier | Available without card, but limits were cut roughly 50–80% in Dec 2025 and are no longer published as a fixed table; free-tier prompts may be used to improve models; commercial use restricted in EEA/UK/CH | Treat as unreliable; feature must degrade gracefully |
| Cloudflare Workers AI | Free daily allocation reported (~10,000 neurons/day) | Unverified against vendor docs; optional fallback only |
| UPI deep links / QR | Standard `upi://pay` intent works with common UPI apps; no gateway needed | Behaviour varies by app/device; test on major apps; handle personal-account limits/reporting with a CA |
| Google Maps URLs | Documented `maps/dir/?api=1` URL scheme opens directions without an API key | Free URL scheme, not the metered API; travel-mode values vary by region |
| Instagram data | Public scraping is against platform terms; official APIs require app review/business accounts | Hence opt-in profiles + self-declared bands |
| Supabase Realtime | Free-tier concurrency/message caps exist | Verify current numbers; design must degrade to polling |
| Transport fares/timings/entry fees for Jabalpur places | **Not verified in this document** | All seed values must be collected and dated by an editor before publishing |
| Jabalpur official Durga darshan list | District administration page lists special Durga temples/pandals, starting with City Bengali Club Kali Mata Temple (Civic Center) with daily aarti times; page dated 2020; automated fetch is blocked (robots) | Editor must read manually, re-verify yearly, cite the page |
| Nagar Nigam immersion sites | 2025 news: commissioner inspected Hanumantal and other visarjan kunds | Site list changes each year; confirm from the current notice |
| Navratri/Dussehra 2026 dates | Sources disagree by a day (Navratri ≈ 11–12 Oct; Dussehra ≈ 20–21 Oct) | Use a Panchang + samiti announcements |
| Top Ganesh/Durga pandals of Jabalpur | **Not found in open sources** | Must be gathered from samitis, district list, local reporters and community |
| Official chal-samaroh route data | **Not found as open data** | Digitise from police/administration notices each year |
| WhatsApp Channels | Free one-way broadcast; no subscriber phone numbers exposed | Platform features/policies can change |
| Web Push on iOS | Requires installed PWA and user permission | Treat as best-effort; ICS/WhatsApp as fallbacks |
| Gwarighat Narmada Aarti | Daily around 7 pm, ~30 min, free; may start earlier in winter; ~9 km from Jabalpur Junction | From visitor reviews and travel guides, not an official schedule; confirm locally |
| Narmada Jayanti 2027 | Tourism site lists 12 Feb 2027 at Gwarighat; a Panchang shows the Saptami tithi across 12–13 Feb | Confirm with local announcements |
| Narmada Mahotsav | Two-day festival at Bhedaghat on Sharad Purnima, running since 2005, via the district tourism council | Dates and programme change yearly |
| Ghat boat closures | On Narmada Jayanti 2024 the administration prohibited boat operations at the main ghats | Assume closures on festival days unless announced otherwise |
| Jabalpur as Sanskardhani | Widely used in press as the cultural capital of Madhya Pradesh | — |

# APPENDIX B — JABALPUR COVERAGE CHECKLIST

Purpose: make sure the site covers everything that makes Jabalpur *Jabalpur*. Each row is a content item to research and publish with sources and dates. **✔ = confirmed in research for this document; ✱ = a lead that must be verified locally before publishing.**

| Theme | Items | Status |
|---|---|---|
| **Maa Narmada** | Gwarighat and Uma Ghat, daily Maha Aarti (~7 pm), Narmada Sidh Kund; Tilwara, Lameta, Jilheri, Saraswati and Bhedaghat ghats; Narmada Jayanti / Prakatotsav; Narmada Mahotsav (Sharad Purnima); Kartik fair; Parikrama halts; river safety; Nirmal Narmada | ✔ (core) / ✱ (Parikrama details) |
| **Identity** | "Narmade Har" greeting; Jabalpur as **Sanskardhani**, the cultural capital of Madhya Pradesh | ✔ |
| **Nature and wonders** | Bhedaghat Marble Rocks and boating; Dhuandhar Falls and ropeway; Bargi Dam; Dumna Nature Reserve; Kachnar City Shiva statue; Balancing Rock | ✔ names / ✱ fees and timings |
| **Heritage** | Madan Mahal Fort (Rani Durgavati era); Rani Durgavati Museum; Chausath Yogini Temple; Tripur Sundari (Tewar); Pisanhari Ki Madiya; military heritage walk (cantonment, ordnance legacy) | ✔ names / ✱ facts, hours |
| **Faith and community** | Gurudwara Gwarighat; Jain temples; Sai Baba ashram at Gwarighat; churches, mosques and dargahs (with community input); City Bengali Club Kali Mata Temple (Civic Center) | ✔ / ✱ |
| **Festivals** | Ganesh Utsav and visarjan; Navratri, Durga and Kali Puja; Dussehra and Ramlila; Diwali markets; Narmada Jayanti; Narmada Mahotsav; Kartik fair; Holi and Rang Panchami; Eid, Muharram, Christmas, Gurpurab | ✔ (Ganesh, Durga, Narmada) / ✱ others |
| **Culture and ideas** | Osho and Bhanwartal Garden ✱; Rani Durgavati (Gond history) ✱; writers, poets and theatre (Hindi literary tradition) ✱; classical music and folk dance groups ✱ | ✱ |
| **Education and institutions** | Universities, engineering and medical colleges, coaching areas (student audience); Madhya Pradesh High Court seat; defence establishments | ✱ |
| **Food** | Poha and jalebi breakfast, khoya jalebi, kachori, chaat, dal-bafla, Sarafa evening street food, sweets shops | ✱ (list of shops) |
| **Geology and science** | Marble gorge formation, Lameta geology and fossils, Narmada valley | ✱ |
| **Getting around** | Jabalpur Junction, Madan Mahal station, Bhedaghat station, Dumna airport, bus stands, city buses, tempos, autos, cabs; Narmada Circuit intercity options | ✱ (fares, timings) |
| **Essentials** | Hospitals, police, railway and bus enquiry, ATMs, toilets, helplines, ghat safety | ✱ (verify numbers) |
| **Language** | Hindi and English content and search (Hinglish aliases), Narmada and festival vocabulary | — |

**Rule:** anything marked ✱ is not published until it has a source, a checked date and a named verifier (§7.1).
