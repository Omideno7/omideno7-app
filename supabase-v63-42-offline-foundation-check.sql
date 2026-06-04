-- Omideno7 V63.42 — Offline Foundation Check
-- Run only if offline_sync_queue does not exist.
-- Safe to run multiple times.

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
