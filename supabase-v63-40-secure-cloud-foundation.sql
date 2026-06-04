-- Omideno7 V63.40 Secure Cloud Foundation Beta
-- Add-only SQL. Does not delete or alter existing school/Q&A data.
-- Run once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create or replace function public.omideno7_is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() ->> 'email') = 'omideno7church@gmail.com', false);
$$;

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  language text check (language in ('fa','en','hr')) default 'fa',
  privacy_mode boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_app_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  language text check (language in ('fa','en','hr')) default 'fa',
  notifications_enabled boolean,
  onesignal_external_id text,
  timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bible365_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_day int not null default 1 check (current_day between 1 and 365),
  selected_day int not null default 1 check (selected_day between 1 and 365),
  completed_days jsonb not null default '[]'::jsonb,
  last_read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Future-ready table for school cloud profile. It does not replace the current school system yet.
create table if not exists public.school_cloud_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  public_display_name text,
  email text,
  language text check (language in ('fa','en','hr')) default 'fa',
  status text not null default 'pending_review' check (status in ('pending_review','approved','rejected','suspended')),
  current_section text,
  current_lesson int default 1,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.security_audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;
alter table public.user_app_settings enable row level security;
alter table public.bible365_progress enable row level security;
alter table public.school_cloud_profiles enable row level security;
alter table public.security_audit_log enable row level security;

-- Drop duplicate-named policies if re-running this SQL.
drop policy if exists "user_profiles_select_own_or_admin" on public.user_profiles;
drop policy if exists "user_profiles_insert_own" on public.user_profiles;
drop policy if exists "user_profiles_update_own_or_admin" on public.user_profiles;
create policy "user_profiles_select_own_or_admin" on public.user_profiles for select using (auth.uid() = user_id or public.omideno7_is_admin());
create policy "user_profiles_insert_own" on public.user_profiles for insert with check (auth.uid() = user_id);
create policy "user_profiles_update_own_or_admin" on public.user_profiles for update using (auth.uid() = user_id or public.omideno7_is_admin()) with check (auth.uid() = user_id or public.omideno7_is_admin());

drop policy if exists "user_app_settings_select_own_or_admin" on public.user_app_settings;
drop policy if exists "user_app_settings_insert_own" on public.user_app_settings;
drop policy if exists "user_app_settings_update_own_or_admin" on public.user_app_settings;
create policy "user_app_settings_select_own_or_admin" on public.user_app_settings for select using (auth.uid() = user_id or public.omideno7_is_admin());
create policy "user_app_settings_insert_own" on public.user_app_settings for insert with check (auth.uid() = user_id);
create policy "user_app_settings_update_own_or_admin" on public.user_app_settings for update using (auth.uid() = user_id or public.omideno7_is_admin()) with check (auth.uid() = user_id or public.omideno7_is_admin());

drop policy if exists "bible365_progress_select_own_or_admin" on public.bible365_progress;
drop policy if exists "bible365_progress_insert_own" on public.bible365_progress;
drop policy if exists "bible365_progress_update_own_or_admin" on public.bible365_progress;
create policy "bible365_progress_select_own_or_admin" on public.bible365_progress for select using (auth.uid() = user_id or public.omideno7_is_admin());
create policy "bible365_progress_insert_own" on public.bible365_progress for insert with check (auth.uid() = user_id);
create policy "bible365_progress_update_own_or_admin" on public.bible365_progress for update using (auth.uid() = user_id or public.omideno7_is_admin()) with check (auth.uid() = user_id or public.omideno7_is_admin());

drop policy if exists "school_cloud_profiles_select_own_or_admin" on public.school_cloud_profiles;
drop policy if exists "school_cloud_profiles_insert_own" on public.school_cloud_profiles;
drop policy if exists "school_cloud_profiles_update_own_or_admin" on public.school_cloud_profiles;
create policy "school_cloud_profiles_select_own_or_admin" on public.school_cloud_profiles for select using (auth.uid() = user_id or public.omideno7_is_admin());
create policy "school_cloud_profiles_insert_own" on public.school_cloud_profiles for insert with check (auth.uid() = user_id);
create policy "school_cloud_profiles_update_own_or_admin" on public.school_cloud_profiles for update using (auth.uid() = user_id or public.omideno7_is_admin()) with check (auth.uid() = user_id or public.omideno7_is_admin());

drop policy if exists "security_audit_log_insert_own" on public.security_audit_log;
drop policy if exists "security_audit_log_select_admin_only" on public.security_audit_log;
create policy "security_audit_log_insert_own" on public.security_audit_log for insert with check (auth.uid() = user_id or user_id is null);
create policy "security_audit_log_select_admin_only" on public.security_audit_log for select using (public.omideno7_is_admin());

create index if not exists idx_user_profiles_language on public.user_profiles(language);
create index if not exists idx_user_app_settings_language on public.user_app_settings(language);
create index if not exists idx_bible365_progress_updated_at on public.bible365_progress(updated_at desc);
create index if not exists idx_school_cloud_profiles_status on public.school_cloud_profiles(status);
create index if not exists idx_security_audit_log_created_at on public.security_audit_log(created_at desc);
