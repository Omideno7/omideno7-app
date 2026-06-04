# Omideno7 App Status Report — V63.49 In-App Salvation Registration Beta

## Added
- Replaces Google Form behavior with in-app registration modal.
- Trilingual form labels: FA / EN / HR.
- Required fields for church care and new believer follow-up.
- Local queue fallback if Supabase is temporarily unavailable.
- Supabase table and RLS policies for registrations.

## Security note
This form collects sensitive pastoral-care information. Consent is required.
Anon insert is allowed so new believers can submit before creating an account, but select/update are restricted by RLS.
