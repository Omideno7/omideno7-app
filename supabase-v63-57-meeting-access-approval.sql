
-- Omideno7 V63.57 — Meeting access approval support
-- Run once in Supabase SQL Editor if these columns do not exist.
-- This allows admin-approved users to see the meeting code inside the app.

alter table public.church_member_registrations
  add column if not exists approval_status text default 'pending',
  add column if not exists meeting_access_visible boolean default false,
  add column if not exists meeting_access_code text,
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid;

-- Optional: set code when admin approves a record:
-- update public.church_member_registrations
-- set approval_status='approved',
--     meeting_access_visible=true,
--     meeting_access_code='789987',
--     approved_at=now()
-- where id='<registration_id>';

-- If RLS blocks approved user lookup, add a policy according to your existing RLS design.
-- Recommended: users can select only their own row by user_id, or by verified email if your app stores email.
