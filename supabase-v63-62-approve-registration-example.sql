
-- Omideno7 V63.62 — Approve a church member registration manually
-- Run in Supabase SQL Editor when you want to approve a user.
-- Replace the email below with the user's actual registration email.

update public.church_member_registrations
set approval_status = 'approved',
    status = 'approved',
    meeting_access_visible = true,
    meeting_access_code = '789987',
    approved_at = now()
where lower(email) = lower('USER_EMAIL_HERE');

-- Then the user should refresh the app and press "ورود به جلسه / Join meeting".
