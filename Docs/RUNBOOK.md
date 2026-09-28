# RUNBOOK — Jabalpurverse P0

## Accounts

| Service | Owner | Notes |
|---|---|---|
| GitHub | `iampr333` | Public repo for free Actions |
| Supabase | `prhinditips@gmail.com` | Project `dsjmjxrnqedypuolguow` — **not** the CRM project |
| Cloudflare | same operator | Pages + later R2; **no credit card** |

## Local env

Create a **local-only** `.env` (gitignored). Do **not** commit `.env`, `.env.example`, tokens, or keys.

```bash
PUBLIC_SUPABASE_URL=https://dsjmjxrnqedypuolguow.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<from Supabase Settings → API>
CLOUDFLARE_ACCOUNT_ID=<from Cloudflare dashboard>
# CLOUDFLARE_API_TOKEN=<optional, for CI/deploy>
```

Never commit `service_role`, API tokens, or any `.env*` file.

## Common commands

```bash
npm install
npm run validate
npm run dev
npm run build
```

Cloudflare CLI (no global install):

```bash
npx wrangler@latest login
npx wrangler@latest whoami
```

## Deploy (Pages)

1. Public GitHub repo under `iampr333`
2. Cloudflare → Workers & Pages → Create → Connect repo → root build:
   - Build command: `npm run build`
   - Output directory: `site/dist` (confirm against Astro Cloudflare adapter output)
3. Or set secrets and use Actions:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `PUBLIC_SUPABASE_ANON_KEY`

## Domain (later)

1. Buy domain
2. Add zone in Cloudflare DNS (or point nameservers)
3. Pages → Custom domains → attach

## Supabase migrations

SQL files live in `supabase/migrations/`. Apply with Supabase MCP / CLI against **only** `dsjmjxrnqedypuolguow`.

## Health

P1 adds a 30‑min health-check so the free project does not pause after 7 idle days.
