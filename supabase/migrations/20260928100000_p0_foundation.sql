-- P0 foundation: profiles, config flags, core tables, default-deny RLS
-- Project: dsjmjxrnqedypuolguow (Jabalpurverse only)

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  trust_level int not null default 0,
  public_profile boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.config (
  key text primary key,
  value jsonb not null default '{}'::jsonb
);

create table if not exists public.saves (
  user_id uuid not null references public.profiles (id) on delete cascade,
  place_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, place_id)
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  before jsonb,
  after jsonb,
  reason text,
  at timestamptz not null default now()
);

create table if not exists public.trip_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default '',
  plan jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

-- Seed kill-switch flags (all off except ssr)
insert into public.config (key, value) values
  ('utsav_mode', 'false'::jsonb),
  ('utsav_routes_enabled', 'false'::jsonb),
  ('pings_enabled', 'false'::jsonb),
  ('push_enabled', 'false'::jsonb),
  ('uploads_enabled', 'false'::jsonb),
  ('signups_enabled', 'false'::jsonb),
  ('votes_enabled', 'false'::jsonb),
  ('realtime_enabled', 'false'::jsonb),
  ('ai_enabled', 'false'::jsonb),
  ('ssr_enabled', 'true'::jsonb)
on conflict (key) do nothing;

-- Profile bootstrap on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: default deny
alter table public.profiles enable row level security;
alter table public.config enable row level security;
alter table public.saves enable row level security;
alter table public.audit_log enable row level security;
alter table public.trip_plans enable row level security;

-- profiles
create policy "profiles_select_own_or_public"
  on public.profiles for select
  using (id = auth.uid() or public_profile = true);

create policy "profiles_update_own"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid()));

-- config: authenticated read only (no anon writes; no client writes)
create policy "config_select_authenticated"
  on public.config for select
  to authenticated
  using (true);

-- saves: own rows only
create policy "saves_select_own"
  on public.saves for select
  using (user_id = auth.uid());

create policy "saves_insert_own"
  on public.saves for insert
  with check (user_id = auth.uid());

create policy "saves_delete_own"
  on public.saves for delete
  using (user_id = auth.uid());

-- trip_plans
create policy "trips_select_own_or_public"
  on public.trip_plans for select
  using (user_id = auth.uid() or is_public = true);

create policy "trips_insert_own"
  on public.trip_plans for insert
  with check (user_id = auth.uid());

create policy "trips_update_own"
  on public.trip_plans for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "trips_delete_own"
  on public.trip_plans for delete
  using (user_id = auth.uid());

-- audit_log: no client writes; moderators can read own actions later — deny all for now except service role
-- (no policies => deny for anon/authenticated)

revoke all on public.audit_log from anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select on public.config to authenticated;
grant select, insert, delete on public.saves to authenticated;
grant select, insert, update, delete on public.trip_plans to authenticated;
