-- Omideno7 V63.37 — Safe Cloud Backup Foundation
-- Purpose: add cloud backup tables for user profile, app settings, and Bible 365 progress.
-- Safe design: ADD-ONLY. It does not modify existing school, Q&A, Daily Word, or notification tables.

create extension if not exists pgcrypto;

create or replace function public.om7_set_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  language text not null default 'fa' check (language in ('fa','en','hr')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_app_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  language text not null default 'fa' check (language in ('fa','en','hr')),
  notifications_enabled boolean not null default false,
  onesignal_id text,
  timezone text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bible365_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_day integer not null default 1 check (current_day between 1 and 365),
  selected_day integer not null default 1 check (selected_day between 1 and 365),
  completed_days jsonb not null default '[]'::jsonb,
  last_read_at timestamptz,
  source text not null default 'web_app',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_profiles_language on public.user_profiles(language);
create index if not exists idx_user_app_settings_language on public.user_app_settings(language);
create index if not exists idx_bible365_progress_updated_at on public.bible365_progress(updated_at);

drop trigger if exists trg_user_profiles_updated_at on public.user_profiles;
create trigger trg_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.om7_set_updated_at();

drop trigger if exists trg_user_app_settings_updated_at on public.user_app_settings;
create trigger trg_user_app_settings_updated_at
before update on public.user_app_settings
for each row execute function public.om7_set_updated_at();

drop trigger if exists trg_bible365_progress_updated_at on public.bible365_progress;
create trigger trg_bible365_progress_updated_at
before update on public.bible365_progress
for each row execute function public.om7_set_updated_at();

alter table public.user_profiles enable row level security;
alter table public.user_app_settings enable row level security;
alter table public.bible365_progress enable row level security;

-- user_profiles RLS
drop policy if exists "om7_profiles_select_own" on public.user_profiles;
create policy "om7_profiles_select_own"
on public.user_profiles for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "om7_profiles_insert_own" on public.user_profiles;
create policy "om7_profiles_insert_own"
on public.user_profiles for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "om7_profiles_update_own" on public.user_profiles;
create policy "om7_profiles_update_own"
on public.user_profiles for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- user_app_settings RLS
drop policy if exists "om7_settings_select_own" on public.user_app_settings;
create policy "om7_settings_select_own"
on public.user_app_settings for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "om7_settings_insert_own" on public.user_app_settings;
create policy "om7_settings_insert_own"
on public.user_app_settings for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "om7_settings_update_own" on public.user_app_settings;
create policy "om7_settings_update_own"
on public.user_app_settings for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- bible365_progress RLS
drop policy if exists "om7_bible365_select_own" on public.bible365_progress;
create policy "om7_bible365_select_own"
on public.bible365_progress for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "om7_bible365_insert_own" on public.bible365_progress;
create policy "om7_bible365_insert_own"
on public.bible365_progress for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "om7_bible365_update_own" on public.bible365_progress;
create policy "om7_bible365_update_own"
on public.bible365_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
