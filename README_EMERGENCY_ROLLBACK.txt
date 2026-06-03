Omideno7 Emergency Rollback Package

Purpose: restore the last stable V63.36 app state if V63.37 cloud backup causes partial loading.

Upload/replace these files in the GitHub repo root preserving paths.
This disables V63.37 cloud backup scripts and returns the app UI to the stable version that was working.

After upload:
1. Commit changes
2. Wait for GitHub Pages build to turn green
3. Test: https://omideno7.github.io/omideno7-app/?v=6336rollback

Supabase tables created for V63.37 can remain. They do not affect the app while cloud backup scripts are not loaded.
