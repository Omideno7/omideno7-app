-- Omideno7 Online School - Supabase SQL (V63)
-- Run this in Supabase SQL Editor before using the school module.
-- Uses Supabase Auth email/password. Public users cannot access school records except their own.

create extension if not exists "pgcrypto";

create table if not exists public.school_students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  city text not null,
  preferred_language text not null check (preferred_language in ('fa','en','hr')),
  is_believer boolean not null default true,
  years_believer text not null,
  testimony text not null,
  is_member_of_another_church boolean not null default false,
  church_name text not null,
  pastor_name text not null,
  pastor_phone text not null,
  accepted_membership_requirement boolean not null default false,
  status text not null default 'pending_review',
  registered_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.school_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_code text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_code)
);

create table if not exists public.school_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_code text not null,
  note_index int not null check (note_index between 1 and 15),
  note_text text not null default '',
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_code, note_index)
);

create table if not exists public.school_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_code text not null,
  assignment_text text not null,
  status text not null default 'submitted' check (status in ('submitted','reviewed','needs_followup')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_code)
);

create table if not exists public.school_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_number int not null check (attempt_number in (1,2)),
  total_questions int not null,
  correct_count int not null,
  wrong_count int not null,
  score_percent int not null,
  passed boolean not null default false,
  submitted_at timestamptz not null default now(),
  unique(user_id, attempt_number)
);

create table if not exists public.school_exam_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.school_exam_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_number int not null,
  question_text text not null,
  selected_answer text not null,
  correct_answer text not null,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);

alter table public.school_students enable row level security;
alter table public.school_progress enable row level security;
alter table public.school_notes enable row level security;
alter table public.school_assignments enable row level security;
alter table public.school_exam_attempts enable row level security;
alter table public.school_exam_answers enable row level security;

-- Drop old policies if re-running
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname='public' AND tablename IN ('school_students','school_progress','school_notes','school_assignments','school_exam_attempts','school_exam_answers') LOOP
    EXECUTE format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END$$;

-- Helper condition for admin email
-- Replace this email if your admin email changes.

create policy "students_select_own_or_admin" on public.school_students for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "students_insert_own" on public.school_students for insert to authenticated with check (user_id = auth.uid());
create policy "students_update_own_or_admin" on public.school_students for update to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com') with check (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');

create policy "progress_select_own_or_admin" on public.school_progress for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "progress_insert_own" on public.school_progress for insert to authenticated with check (user_id = auth.uid());
create policy "progress_update_own" on public.school_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "notes_select_own_or_admin" on public.school_notes for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "notes_insert_own" on public.school_notes for insert to authenticated with check (user_id = auth.uid());
create policy "notes_update_own" on public.school_notes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "assignments_select_own_or_admin" on public.school_assignments for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "assignments_insert_own" on public.school_assignments for insert to authenticated with check (user_id = auth.uid());
create policy "assignments_update_own_or_admin" on public.school_assignments for update to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com') with check (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');

create policy "attempts_select_own_or_admin" on public.school_exam_attempts for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "attempts_insert_own" on public.school_exam_attempts for insert to authenticated with check (user_id = auth.uid());

create policy "answers_select_own_or_admin" on public.school_exam_answers for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "answers_insert_own" on public.school_exam_answers for insert to authenticated with check (user_id = auth.uid());

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.school_students to authenticated;
grant select, insert, update on public.school_progress to authenticated;
grant select, insert, update on public.school_notes to authenticated;
grant select, insert, update on public.school_assignments to authenticated;
grant select, insert on public.school_exam_attempts to authenticated;
grant select, insert on public.school_exam_answers to authenticated;


-- V63.6 approval gate: students cannot access classes until an admin approves them.
alter table public.school_students alter column status set default 'pending_review';
update public.school_students set status='pending_review', updated_at=now() where status='active';


-- V63.9 optional school notifications table.
create table if not exists public.school_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'info',
  title text not null,
  body text not null,
  seen boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.school_notifications enable row level security;

drop policy if exists "notifications_select_own_or_admin" on public.school_notifications;
drop policy if exists "notifications_insert_admin" on public.school_notifications;
drop policy if exists "notifications_update_own" on public.school_notifications;

create policy "notifications_select_own_or_admin" on public.school_notifications for select to authenticated using (user_id = auth.uid() or (auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "notifications_insert_admin" on public.school_notifications for insert to authenticated with check ((auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "notifications_update_own" on public.school_notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on public.school_notifications to authenticated;


-- V63.10 optional admin event log for school/admin dashboard.
create table if not exists public.school_admin_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  related_user_id uuid references auth.users(id) on delete set null,
  title text not null,
  body text,
  seen boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.school_admin_events enable row level security;
drop policy if exists "admin_events_select_admin" on public.school_admin_events;
drop policy if exists "admin_events_insert_authenticated" on public.school_admin_events;
drop policy if exists "admin_events_update_admin" on public.school_admin_events;
create policy "admin_events_select_admin" on public.school_admin_events for select to authenticated using ((auth.jwt()->>'email') = 'omideno7church@gmail.com');
create policy "admin_events_insert_authenticated" on public.school_admin_events for insert to authenticated with check (auth.uid() is not null);
create policy "admin_events_update_admin" on public.school_admin_events for update to authenticated using ((auth.jwt()->>'email') = 'omideno7church@gmail.com') with check ((auth.jwt()->>'email') = 'omideno7church@gmail.com');
grant select, insert, update on public.school_admin_events to authenticated;

create or replace function public.log_school_student_registration()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.school_admin_events(event_type, related_user_id, title, body)
  values('school_registration', new.user_id, 'New school registration', coalesce(new.full_name,'') || ' - ' || coalesce(new.email,''));
  return new;
end;
$$;

drop trigger if exists trg_school_student_registration on public.school_students;
create trigger trg_school_student_registration
after insert on public.school_students
for each row execute function public.log_school_student_registration();
