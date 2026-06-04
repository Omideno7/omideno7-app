-- Omideno7 V63.58 — Meeting access approval support
-- Run once in Supabase SQL Editor.
-- Do NOT upload this SQL file to GitHub Pages after running it.

alter table public.church_member_registrations
  add column if not exists approval_status text default 'pending',
  add column if not exists meeting_access_visible boolean default false,
  add column if not exists meeting_access_code text,
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid;

-- Admin approval example:
-- update public.church_member_registrations
-- set approval_status='approved',
--     meeting_access_visible=true,
--     meeting_access_code='789987',
--     approved_at=now()
-- where id='<registration_id>';
