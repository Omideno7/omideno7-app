# Project Notes — V63.11

Scope: Small hotfix after V63.10.

Implemented:
- iPhone bottom navigation safe-area correction.
- Mobile admin layout improvements.
- Clickable key scripture buttons in admin content review.
- Volume control added beside audio playback speed.

Not included in this hotfix:
- New audio-message categories such as “Sowing, Watering and Harvest” or “Effective Prayer”. These require new audio files and a separate content structure.
- Full cloud sync for non-school user content such as Thanksgiving notes. Recommended as a separate Supabase-backed phase to avoid breaking existing local-storage features.


## V63.12 — School verse/audio polish
- Fixed 2 Corinthians 5:17-18 display in school key scriptures.
- Localized key scripture reference labels for English and Croatian views.
- Hidden raw school-audio file paths from admin/student UI.
- Improved audio volume binding and added an iPhone note for device-level volume behavior.
- No changes to Q&A, registration, student progress, or notification logic.
