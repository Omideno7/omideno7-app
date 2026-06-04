# SECURITY_AUDIT_V63_47.md

## Maximum security hardening scope
This is still a frontend + Supabase app on GitHub Pages. Therefore:
- frontend code is public
- anon key is public by design
- service_role key must never be in frontend
- real security belongs in Supabase RLS, Storage policies, and minimal exposed data

## Controls in V63.47
- Security audit logging
- localStorage sensitive key scan
- user/admin RPC test
- backup table RLS access check
- offline queue RLS access check
- warning if dangerous local keys are found

## Audio security note
Offline audio caching stores files on the user's device. For sensitive countries/users:
- do not auto-download audio without user action
- let user choose offline download
- if audio must be private, Supabase bucket should be private and served with signed URLs after approval

## Still recommended before stable
- test with a normal student account
- test with admin account
- verify a student cannot read another user's backup row
- hide/remove all Beta panels for public users
