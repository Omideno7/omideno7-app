-- Omideno7 V63.47c — Security Advisor Function Hardening + Audit Schema Fix
-- Safe to run multiple times.
-- This addresses:
-- 1) security_audit_log metadata schema cache issue
-- 2) mutable search_path warnings for known functions, if present
-- 3) over-broad EXECUTE permissions where safe

-- Ensure audit table columns exist
create table if not exists public.security_audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  page text,
  metadata jsonb not null default '{}'::jsonb,
  ip_hint text,
  created_at timestamptz not null default now()
);

alter table public.security_audit_log
add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.security_audit_log
add column if not exists page text;

alter table public.security_audit_log
add column if not exists ip_hint text;

alter table public.security_audit_log
add column if not exists created_at timestamptz not null default now();

alter table public.security_audit_log enable row level security;

drop policy if exists "security_audit_log_insert_authenticated" on public.security_audit_log;
drop policy if exists "security_audit_log_select_admin_only" on public.security_audit_log;

create policy "security_audit_log_insert_authenticated"
on public.security_audit_log for insert
with check (auth.uid() = user_id);

create policy "security_audit_log_select_admin_only"
on public.security_audit_log for select
using (public.omideno7_is_admin());

-- Harden known functions when they exist.
-- Fixed search_path helps remove "Function Search Path Mutable" warnings.
do $$
begin
  if exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='omideno7_is_admin') then
    execute 'alter function public.omideno7_is_admin() set search_path = public, auth, pg_temp';
    execute 'revoke all on function public.omideno7_is_admin() from public';
    execute 'grant execute on function public.omideno7_is_admin() to authenticated';
  end if;

  if exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='om7_set_updated_at') then
    execute 'alter function public.om7_set_updated_at() set search_path = public, pg_temp';
    execute 'revoke all on function public.om7_set_updated_at() from public';
    -- trigger functions do not need direct public execution
  end if;

  if exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='log_school_student_record') then
    execute 'alter function public.log_school_student_record() set search_path = public, auth, pg_temp';
    execute 'revoke all on function public.log_school_student_record() from public';
    execute 'revoke all on function public.log_school_student_record() from authenticated';
  end if;

  if exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='log_school_student_records') then
    execute 'alter function public.log_school_student_records() set search_path = public, auth, pg_temp';
    execute 'revoke all on function public.log_school_student_records() from public';
    execute 'revoke all on function public.log_school_student_records() from authenticated';
  end if;
end $$;

-- Reassert RLS on core user-owned tables
alter table if exists public.user_app_backups enable row level security;
alter table if exists public.offline_sync_queue enable row level security;
alter table if exists public.school_notes enable row level security;
alter table if exists public.school_progress enable row level security;
alter table if exists public.school_exam_answers enable row level security;

-- Force PostgREST schema reload
notify pgrst, 'reload schema';
