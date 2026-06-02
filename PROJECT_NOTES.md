# Project Notes — V63.6

Online School now requires admin approval before a student can access classes.

Workflow:
1. User creates account and completes school registration form.
2. Student record is stored in `school_students` with status `pending_review`.
3. Student sees a waiting-for-approval message and cannot access lessons.
4. Admin opens school admin panel, views full student profile, and approves the student.
5. Student status becomes `approved`; class 1 becomes accessible.

Admin additions:
- Student list section.
- Full registration profile section.
- Approval button.
- School content review section for lessons, assignments, exam questions, and audio status.

Other app modules were intentionally left unchanged.
