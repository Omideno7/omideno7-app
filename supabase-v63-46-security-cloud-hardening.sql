-- Omideno7 V63.46 — Security + Cloud Hardening Beta
-- Safe to run multiple times.
-- This hardens/supports security audit logging and cloud tables.
-- IMPORTANT: frontend uses anon key only. Never put service_role in frontend.

-- 1) Ensure user_app_backups exists and is protected
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


-- 2) Ensure offline_sync_queue is protected
create table if not exists public.offline_sync_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null,
  operation text not null default 'upsert',
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','synced','failed')),
  error_message text,
  created_at timestamptz not null default now(),
  synced_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.offline_sync_queue enable row level security;

drop policy if exists "offline_sync_queue_select_own_or_admin" on public.offline_sync_queue;
drop policy if exists "offline_sync_queue_insert_own" on public.offline_sync_queue;
drop policy if exists "offline_sync_queue_update_own_or_admin" on public.offline_sync_queue;

create policy "offline_sync_queue_select_own_or_admin"
on public.offline_sync_queue for select
using (auth.uid() = user_id or public.omideno7_is_admin());

create policy "offline_sync_queue_insert_own"
on public.offline_sync_queue for insert
with check (auth.uid() = user_id);

create policy "offline_sync_queue_update_own_or_admin"
on public.offline_sync_queue for update
using (auth.uid() = user_id or public.omideno7_is_admin())
with check (auth.uid() = user_id or public.omideno7_is_admin());

create index if not exists idx_offline_sync_queue_user_status
on public.offline_sync_queue(user_id, status, created_at desc);


-- 3) Security audit log
create table if not exists public.security_audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  page text,
  metadata jsonb not null default '{}'::jsonb,
  ip_hint text,
  created_at timestamptz not null default now()
);

alter table public.security_audit_log enable row level security;

drop policy if exists "security_audit_log_insert_authenticated" on public.security_audit_log;
drop policy if exists "security_audit_log_select_admin_only" on public.security_audit_log;
drop policy if exists "security_audit_log_select_own_basic" on public.security_audit_log;

create policy "security_audit_log_insert_authenticated"
on public.security_audit_log for insert
with check (auth.uid() = user_id);

create policy "security_audit_log_select_admin_only"
on public.security_audit_log for select
using (public.omideno7_is_admin());

create index if not exists idx_security_audit_log_user_time
on public.security_audit_log(user_id, created_at desc);

create index if not exists idx_security_audit_log_action_time
on public.security_audit_log(action, created_at desc);


-- 4) Optional: tighten obvious school personal tables if they exist.
-- These DO blocks only add policies if tables exist; safe if table names are present.
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='school_notes') then
    execute 'alter table public.school_notes enable row level security';
  end if;
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='school_progress') then
    execute 'alter table public.school_progress enable row level security';
  end if;
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='school_exam_answers') then
    execute 'alter table public.school_exam_answers enable row level security';
  end if;
end $$;
