# Omideno7 Church Web App

Latest App Version: **V59.4 — Q&A Home Card + Contact Us in More**

Live app: https://omideno7.github.io/omideno7-app/

## V59.4 changes
- Q&A remains only as a Home page card.
- Removed the Q&A card/entry from the More section.
- Added a three-language Contact Us card in the More section.
- Contact Us includes church email, web app link, Instagram, YouTube, address, phone, and online meeting link.
- Kept the Supabase Q&A system from V59.
- Updated `PROJECT_NOTES.md` for future developers / future ChatGPT sessions.

## Important
Do not publish or share Supabase `service_role` keys. The app only uses the public publishable key.


## V59.4
- Q&A admin login is hidden from public users. Admin access: `?qa_admin=1` or `#qa-admin`.
- More → Contact Us now shows only church email, Instagram, and YouTube. Phone, address, website, and online meeting links were removed from this card.


## V59.4
- Fixed the install guide script to prevent repeated DOM updates that could slow down loading.
- Added stable `admin.html` entry for installing the admin panel separately.
- No Bible, audio, plans, fasting, notifications, or Q&A database changes.
