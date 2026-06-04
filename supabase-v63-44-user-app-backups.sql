-- Omideno7 V63.44 — Personal Cloud Backup Beta
-- Safe to run multiple times.
-- Stores per-user app data backups as JSONB.
-- No secrets/service role keys are stored by the frontend; RLS protects rows.

create table if not exists public.user_app_backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  backup_type text not null default 'personal_app_data',
  payload jsonb not null default '{}'::jsonb,
  key_count int not null default 0,
  total_size int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, backup_type)
);

alter table public.user_app_backups enable row level security;

drop policy if exists "user_app_backups_select_own_or_admin" on public.user_app_backups;
drop policy if exists "user_app_backups_insert_own" on public.user_app_backups;
drop policy if exists "user_app_backups_update_own" on public.user_app_backups;
drop policy if exists "user_app_backups_delete_own_or_admin" on public.user_app_backups;

create policy "user_app_backups_select_own_or_admin"
on public.user_app_backups for select
using (auth.uid() = user_id or public.omideno7_is_admin());

create policy "user_app_backups_insert_own"
on public.user_app_backups for insert
with check (auth.uid() = user_id);

create policy "user_app_backups_update_own"
on public.user_app_backups for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "user_app_backups_delete_own_or_admin"
on public.user_app_backups for delete
using (auth.uid() = user_id or public.omideno7_is_admin());

create index if not exists idx_user_app_backups_user_type
on public.user_app_backups(user_id, backup_type, updated_at desc);
