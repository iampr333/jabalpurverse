# Content guide (P0)

Editorial content lives in Git under `content/`. User data lives in Supabase.

## Places

- Path: `content/places/<slug>.yaml`
- Statuses: `draft` | `published` | `temporarily_closed` | `permanently_closed` | `archived`
- **Never publish** without `sources[]`, `verified_at`, and image `alt` + `credit` + `license`
- For `published` tourism / heritage / food: require `timings`, `entry`, and at least one `access.legs` entry with `checked_at`
- Ghats (`river: narmada` or ghat category): require `river_safety` (draft or published); aarti ghats need `aarti.checked_at`
- Coordinates are `[lng, lat]` and must sit inside the Jabalpur day-trip bbox enforced by CI

## Validate locally

```bash
npm run validate
```

Failed validation blocks deploy.

## Drafts

Use `status: draft` until every fact is sourced and dated (BRD R7). The `bhedaghat.yaml` file is an intentional draft.

## Festivals (Utsav Mode)

- Path: `content/festivals/<year>/`
  - `meta.yaml` — festival windows (confirm against Panchang before treating as official)
  - `pandals/<slug>.yaml` — pandal cards
  - `visarjan/<slug>.yaml` — official immersion kunds/ghats
  - `notices/<slug>.yaml` — traffic/safety notices (**require** `source` + `valid_to`)
- Pandals: `published` requires `sources[]` and `verified_at`. Without `verified_at`, a pandal never appears in the featured (published) list.
- Routes / chal-samaroh GeoJSON: only when sourced from police/Nagar Nigam/samiti notices — do not invent paths.
- Promote draft → published only after hand-checking aarti/darshan times and coords for the current year.
