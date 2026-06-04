-- Omideno7 V63.49 — Church Salvation / Membership Registration Form
-- Safe to run multiple times.
-- Stores in-app registration forms securely.
-- RLS:
-- - anyone can insert a consented form (for new believers who may not yet have an account)
-- - users can read their own rows when logged in
-- - admins can read all rows via existing public.omideno7_is_admin()

create table if not exists public.church_member_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  language text not null default 'fa',
  status text not null default 'new',
  payload jsonb not null default '{}'::jsonb,
  consent boolean not null default false,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  admin_notes text
);

alter table public.church_member_registrations enable row level security;

drop policy if exists "church_member_registrations_insert_consent" on public.church_member_registrations;
drop policy if exists "church_member_registrations_select_own" on public.church_member_registrations;
drop policy if exists "church_member_registrations_select_admin" on public.church_member_registrations;
drop policy if exists "church_member_registrations_update_admin" on public.church_member_registrations;

create policy "church_member_registrations_insert_consent"
on public.church_member_registrations
for insert
to anon, authenticated
with check (
  consent = true
  and email is not null
  and first_name is not null
  and last_name is not null
);

create policy "church_member_registrations_select_own"
on public.church_member_registrations
for select
to authenticated
using (auth.uid() = user_id);

create policy "church_member_registrations_select_admin"
on public.church_member_registrations
for select
to authenticated
using (public.omideno7_is_admin());

create policy "church_member_registrations_update_admin"
on public.church_member_registrations
for update
to authenticated
using (public.omideno7_is_admin())
with check (public.omideno7_is_admin());

create index if not exists church_member_registrations_created_at_idx
on public.church_member_registrations(created_at desc);

create index if not exists church_member_registrations_email_idx
on public.church_member_registrations(email);

notify pgrst, 'reload schema';
