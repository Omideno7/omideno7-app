-- Omideno7 V64 Cloud/Offline Test — Supabase table
-- Run in Supabase SQL Editor before testing cloud save/restore.

create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  app_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;

drop policy if exists "user_app_state_select_own" on public.user_app_state;
drop policy if exists "user_app_state_insert_own" on public.user_app_state;
drop policy if exists "user_app_state_update_own" on public.user_app_state;

create policy "user_app_state_select_own"
on public.user_app_state
for select
to authenticated
using (auth.uid() = user_id);

create policy "user_app_state_insert_own"
on public.user_app_state
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "user_app_state_update_own"
on public.user_app_state
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
