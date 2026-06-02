# PROJECT NOTES — V62.7

## Current focused update
V62.7 includes the V62.6 Daily Word today-display file and adds a final scoped navigation fix for the fasting plan.

## Fasting back behavior
File: `v62-7-fasting-back-to-plan-list-final.js`

Purpose:
- Applies only when the active page is `#plans` and the visible/selected plan is the fasting journey.
- Intercepts internal Back controls and the old global back control before older handlers run.
- Clears `selectedTeachingPlanV50` and resets `fastingJourneyViewV50` to `home`.
- Calls `showPage('plans')` and `renderPlans()` so the user returns directly to the main list of plans.

Expected behavior:
- Plans > Fasting Journey > Back = Plans list.
- It should not jump to the fasting journey top/home screen first.
- It should not jump to the app Home page.

Do not modify Bible, Q&A, notifications, audio, apocrypha, or other sections for this fix.
