# SECURITY_AUDIT_V63_43.md

## Scope
Beta-only.

## Security
- No secrets added.
- Offline notes are stored locally until sync.
- Sync requires authenticated Supabase user.
- Server side RLS still protects `offline_sync_queue`.

## Limitations
- Offline lesson text is stored on device.
- Audio/video not stored yet.
- Public app not affected.
