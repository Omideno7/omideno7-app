# SECURITY_AUDIT_V63_47.md

## Audio offline security note
Offline audio is stored on the user's device in IndexedDB.
This improves offline access but means downloaded audio is available on that device.

## Sensitive-user recommendation
For users in sensitive regions, do not auto-download all audio. Provide a user-initiated “Download for offline” button per lesson.

## Secrets
No service role key or private secret is included.
