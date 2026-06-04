-- Omideno7 V63.47 — Maximum Security + Offline Audio Beta
-- Safe to run multiple times.
-- This builds on V63.46 and adds stricter support for audit/security.
-- It does not put secrets in frontend.

-- Ensure audit log table exists and is RLS protected
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


-- Re-assert backup RLS
alter table if exists public.user_app_backups enable row level security;
alter table if exists public.offline_sync_queue enable row level security;


-- Optional storage guidance:
-- If school-audio bucket is PUBLIC, audio can be downloaded by anyone who has the URL.
-- Stronger security requires making it private and creating signed URLs only for approved students.
-- Do NOT run restrictive storage policies until the app is updated to use signed URLs.
-- This file intentionally does not break existing audio access.
