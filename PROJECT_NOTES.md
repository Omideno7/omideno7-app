# PROJECT NOTES — V62.8

V62.8 fixes two scoped issues only.

1. Daily Word: removed the blocking placeholder token from the structured daily word module and overrides the old renderDaily function after app load, so the current day's structured message is rendered.

2. Fasting Back: the previous fix used the wrong localStorage key. The fasting journey uses `selectedPlanKeyV50`, not `selectedTeachingPlanV50`. V62.8 uses the correct key and forces any Back action inside the fasting journey to return to the Plans list.

No changes were made to notifications, Q&A, Bible content, audio messages, or Supabase.
