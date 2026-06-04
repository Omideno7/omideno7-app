
-- Omideno7 V63.63 — Admin Registration Approval RPC
-- Run once in Supabase SQL Editor.
-- Do NOT keep this SQL file in GitHub Pages after running it.

-- Required columns for meeting approval.
alter table public.church_member_registrations
  add column if not exists approval_status text default 'pending',
  add column if not exists status text default 'pending',
  add column if not exists meeting_access_visible boolean default false,
  add column if not exists meeting_access_code text,
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid;

-- Admin-only list function.
create or replace function public.om7_admin_list_registrations()
returns setof public.church_member_registrations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
begin
  if v_email not in ('omideno7church@gmail.com','yuhana1360@gmail.com') then
    raise exception 'not_admin';
  end if;

  return query
  select *
  from public.church_member_registrations
  order by created_at desc nulls last, id desc
  limit 100;
end;
$$;

-- Admin-only approval function.
create or replace function public.om7_admin_approve_registration(p_id uuid)
returns public.church_member_registrations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
  v_row public.church_member_registrations;
begin
  if v_email not in ('omideno7church@gmail.com','yuhana1360@gmail.com') then
    raise exception 'not_admin';
  end if;

  update public.church_member_registrations
  set approval_status = 'approved',
      status = 'approved',
      meeting_access_visible = true,
      meeting_access_code = '789987',
      approved_at = now(),
      approved_by = auth.uid()
  where id = p_id
  returning * into v_row;

  if v_row.id is null then
    raise exception 'registration_not_found';
  end if;

  return v_row;
end;
$$;

grant execute on function public.om7_admin_list_registrations() to authenticated;
grant execute on function public.om7_admin_approve_registration(uuid) to authenticated;
