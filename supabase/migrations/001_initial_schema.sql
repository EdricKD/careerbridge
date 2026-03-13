create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.user_role as enum ('student', 'university_admin', 'employer', 'super_admin');
create type public.subscription_status as enum ('inactive', 'trialing', 'active', 'past_due', 'canceled');
create type public.career_personality_type as enum ('Analytical', 'Creative', 'Leader', 'Builder', 'Connector', 'Investigator');
create type public.career_level as enum ('Freshman', 'Explorer', 'Pathfinder', 'Navigator', 'Trailblazer', 'Pioneer');
create type public.opportunity_duration as enum ('1-day', '1-week', 'virtual');
create type public.opportunity_status as enum ('draft', 'open', 'closed', 'paused');
create type public.application_status as enum ('pending', 'approved', 'rejected', 'completed');
create type public.ai_context_type as enum ('career_analysis', 'chat', 'checkin');
create type public.notification_type as enum ('application_update', 'matching_opportunity', 'ai_checkin', 'badge_earned', 'micro_task_due', 'broadcast', 'mentor_match');
create type public.micro_task_type as enum ('profile', 'application', 'skills', 'reflection', 'mentorship');
create type public.billing_cycle as enum ('semester', 'annual');
create type public.payment_type as enum ('individual', 'university');
create type public.mentor_match_status as enum ('requested', 'matched', 'scheduled', 'completed');
create type public.partnership_status as enum ('requested', 'approved', 'rejected');
create type public.broadcast_status as enum ('draft', 'scheduled', 'sent');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
as $$
  select coalesce(
    (select role from public.users where id = auth.uid()),
    'student'::public.user_role
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select public.current_user_role() = 'super_admin'::public.user_role;
$$;

create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  location text not null,
  logo_url text,
  contact_email citext not null unique,
  license_type text not null,
  max_students integer not null default 0 check (max_students >= 0),
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  role public.user_role not null default 'student',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  last_active_at timestamptz not null default timezone('utc', now()),
  subscription_status public.subscription_status not null default 'inactive'
);

create table public.university_admin_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  university_id uuid not null references public.universities(id) on delete cascade,
  job_title text,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, university_id)
);

create table public.student_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  name text not null,
  university_id uuid references public.universities(id) on delete set null,
  degree text not null,
  major text not null,
  year_of_study text not null,
  bio text not null default '',
  resume_url text,
  resume_text text,
  career_interests text[] not null default '{}'::text[],
  skills text[] not null default '{}'::text[],
  personality_type public.career_personality_type,
  career_level public.career_level not null default 'Freshman',
  xp_points integer not null default 0 check (xp_points >= 0),
  badges text[] not null default '{}'::text[],
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.employers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  company_name text not null,
  industry text not null,
  location text not null,
  website_url text,
  logo_url text,
  description text not null default '',
  verified boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.shadowing_opportunities (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.employers(id) on delete cascade,
  title text not null,
  description text not null,
  industry text not null,
  location text not null,
  duration_type public.opportunity_duration not null,
  skills_focus text[] not null default '{}'::text[],
  available_dates date[] not null default '{}'::date[],
  spots_total integer not null check (spots_total > 0),
  spots_remaining integer not null check (spots_remaining >= 0),
  status public.opportunity_status not null default 'draft',
  what_students_will_learn text[] not null default '{}'::text[],
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  opportunity_id uuid not null references public.shadowing_opportunities(id) on delete cascade,
  status public.application_status not null default 'pending',
  applied_at timestamptz not null default timezone('utc', now()),
  employer_notes text,
  student_feedback text,
  unique (student_id, opportunity_id)
);

create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  context_type public.ai_context_type not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.career_analyses (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  summary text,
  career_paths jsonb not null default '[]'::jsonb,
  skill_gaps jsonb not null default '{}'::jsonb,
  compatibility_scores jsonb not null default '{}'::jsonb,
  recommendations jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default timezone('utc', now())
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type public.notification_type not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  icon text not null,
  criteria text not null
);

create table public.student_badges (
  student_id uuid not null references public.users(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default timezone('utc', now()),
  primary key (student_id, badge_id)
);

create table public.micro_tasks (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  type public.micro_task_type not null,
  completed boolean not null default false,
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.university_licenses (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  seats_purchased integer not null check (seats_purchased >= 0),
  seats_used integer not null default 0 check (seats_used >= 0),
  price_per_seat numeric(10,2) not null check (price_per_seat >= 0),
  billing_cycle public.billing_cycle not null default 'semester',
  stripe_subscription_id text unique,
  valid_until date not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'USD',
  stripe_payment_intent_id text unique,
  status text not null,
  type public.payment_type not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.employer_feedback (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.applications(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comments text,
  skills_demonstrated text[] not null default '{}'::text[],
  would_hire boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  name text not null,
  industry text not null,
  company text not null,
  expertise text[] not null default '{}'::text[],
  availability text not null,
  bio text not null,
  calendly_url text,
  email citext,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.mentor_matches (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.users(id) on delete cascade,
  mentor_id uuid not null references public.mentors(id) on delete cascade,
  status public.mentor_match_status not null default 'requested',
  matched_at timestamptz not null default timezone('utc', now()),
  note text,
  unique (student_id, mentor_id)
);

create table public.company_partnerships (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  employer_id uuid not null references public.employers(id) on delete cascade,
  requested_by uuid not null references public.users(id) on delete cascade,
  status public.partnership_status not null default 'requested',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (university_id, employer_id)
);

create table public.broadcast_messages (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  audience_filter jsonb not null default '{}'::jsonb,
  title text not null,
  body text not null,
  status public.broadcast_status not null default 'draft',
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.opportunity_views (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.shadowing_opportunities(id) on delete cascade,
  viewer_id uuid references public.users(id) on delete set null,
  viewed_at timestamptz not null default timezone('utc', now())
);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index idx_student_profiles_university_id on public.student_profiles(university_id);
create index idx_employers_user_id on public.employers(user_id);
create index idx_shadowing_opportunities_employer_id on public.shadowing_opportunities(employer_id);
create index idx_shadowing_opportunities_status on public.shadowing_opportunities(status);
create index idx_applications_student_id on public.applications(student_id);
create index idx_applications_opportunity_id on public.applications(opportunity_id);
create index idx_notifications_user_id on public.notifications(user_id);
create index idx_micro_tasks_student_id on public.micro_tasks(student_id);
create index idx_career_analyses_student_id on public.career_analyses(student_id);
create index idx_ai_conversations_student_id on public.ai_conversations(student_id);
create index idx_mentor_matches_student_id on public.mentor_matches(student_id);
create index idx_company_partnerships_university_id on public.company_partnerships(university_id);
create index idx_company_partnerships_employer_id on public.company_partnerships(employer_id);
create index idx_activity_events_user_id on public.activity_events(user_id);

create or replace function public.sync_student_career_level()
returns trigger
language plpgsql
as $$
begin
  new.career_level :=
    case
      when new.xp_points < 200 then 'Freshman'::public.career_level
      when new.xp_points < 500 then 'Explorer'::public.career_level
      when new.xp_points < 900 then 'Pathfinder'::public.career_level
      when new.xp_points < 1400 then 'Navigator'::public.career_level
      when new.xp_points < 2100 then 'Trailblazer'::public.career_level
      else 'Pioneer'::public.career_level
    end;
  return new;
end;
$$;

create or replace function public.sync_badge_array()
returns trigger
language plpgsql
as $$
begin
  update public.student_profiles
  set badges = coalesce(
    (
      select array_agg(b.name order by b.name)
      from public.student_badges sb
      join public.badges b on b.id = sb.badge_id
      where sb.student_id = coalesce(new.student_id, old.student_id)
    ),
    '{}'::text[]
  )
  where user_id = coalesce(new.student_id, old.student_id);

  return coalesce(new, old);
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'student'::public.user_role)
  )
  on conflict (id) do update
    set email = excluded.email;

  return new;
exception
  when others then
    return new;
end;
$$;

create or replace function public.award_first_application_badge()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_badge uuid;
begin
  select id into target_badge
  from public.badges
  where name = 'First Application';

  if target_badge is not null then
    insert into public.student_badges (student_id, badge_id)
    values (new.student_id, target_badge)
    on conflict do nothing;
  end if;

  update public.student_profiles
  set xp_points = xp_points + 75
  where user_id = new.student_id;

  insert into public.notifications (user_id, type, message)
  values (
    new.student_id,
    'badge_earned',
    'You earned First Application and gained 75 XP.'
  );

  return new;
end;
$$;

create trigger set_universities_updated_at
before update on public.universities
for each row execute function public.set_updated_at();

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger set_student_profiles_updated_at
before update on public.student_profiles
for each row execute function public.set_updated_at();

create trigger set_student_career_level
before insert or update of xp_points on public.student_profiles
for each row execute function public.sync_student_career_level();

create trigger set_employers_updated_at
before update on public.employers
for each row execute function public.set_updated_at();

create trigger set_shadowing_opportunities_updated_at
before update on public.shadowing_opportunities
for each row execute function public.set_updated_at();

create trigger set_university_licenses_updated_at
before update on public.university_licenses
for each row execute function public.set_updated_at();

create trigger set_mentors_updated_at
before update on public.mentors
for each row execute function public.set_updated_at();

create trigger set_company_partnerships_updated_at
before update on public.company_partnerships
for each row execute function public.set_updated_at();

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create trigger application_badge_award
after insert on public.applications
for each row execute function public.award_first_application_badge();

create trigger sync_badges_after_insert
after insert on public.student_badges
for each row execute function public.sync_badge_array();

create trigger sync_badges_after_delete
after delete on public.student_badges
for each row execute function public.sync_badge_array();

alter table public.universities enable row level security;
alter table public.users enable row level security;
alter table public.university_admin_profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.employers enable row level security;
alter table public.shadowing_opportunities enable row level security;
alter table public.applications enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.career_analyses enable row level security;
alter table public.notifications enable row level security;
alter table public.badges enable row level security;
alter table public.student_badges enable row level security;
alter table public.micro_tasks enable row level security;
alter table public.university_licenses enable row level security;
alter table public.payments enable row level security;
alter table public.employer_feedback enable row level security;
alter table public.mentors enable row level security;
alter table public.mentor_matches enable row level security;
alter table public.company_partnerships enable row level security;
alter table public.broadcast_messages enable row level security;
alter table public.opportunity_views enable row level security;
alter table public.activity_events enable row level security;

create policy "users can view self" on public.users
for select using (auth.uid() = id or public.is_super_admin());

create policy "users can update self" on public.users
for update using (auth.uid() = id or public.is_super_admin())
with check (auth.uid() = id or public.is_super_admin());

create policy "super admins manage users" on public.users
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "students view own profile" on public.student_profiles
for select using (
  auth.uid() = user_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = student_profiles.university_id
  )
  or exists (
    select 1
    from public.applications a
    join public.shadowing_opportunities so on so.id = a.opportunity_id
    join public.employers e on e.id = so.employer_id
    where a.student_id = student_profiles.user_id
      and e.user_id = auth.uid()
  )
);

create policy "students manage own profile" on public.student_profiles
for all using (auth.uid() = user_id or public.is_super_admin())
with check (auth.uid() = user_id or public.is_super_admin());

create policy "universities visible to authenticated users" on public.universities
for select using (auth.role() = 'authenticated' or public.is_super_admin());

create policy "super admins manage universities" on public.universities
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "university admins view own admin profile" on public.university_admin_profiles
for select using (
  auth.uid() = user_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = university_admin_profiles.university_id
  )
);

create policy "super admins manage university admin profiles" on public.university_admin_profiles
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "verified employers visible to authenticated users" on public.employers
for select using (verified = true or auth.uid() = user_id or public.is_super_admin());

create policy "employers manage own company" on public.employers
for all using (auth.uid() = user_id or public.is_super_admin())
with check (auth.uid() = user_id or public.is_super_admin());

create policy "opportunities visible when open" on public.shadowing_opportunities
for select using (
  status = 'open'
  or public.is_super_admin()
  or exists (
    select 1 from public.employers e
    where e.id = shadowing_opportunities.employer_id
      and e.user_id = auth.uid()
  )
  or exists (
    select 1
    from public.university_admin_profiles uap
    join public.company_partnerships cp on cp.university_id = uap.university_id
    where uap.user_id = auth.uid()
      and cp.employer_id = shadowing_opportunities.employer_id
      and cp.status = 'approved'
  )
);

create policy "employers manage own opportunities" on public.shadowing_opportunities
for all using (
  public.is_super_admin()
  or exists (
    select 1 from public.employers e
    where e.id = shadowing_opportunities.employer_id
      and e.user_id = auth.uid()
  )
)
with check (
  public.is_super_admin()
  or exists (
    select 1 from public.employers e
    where e.id = shadowing_opportunities.employer_id
      and e.user_id = auth.uid()
  )
);

create policy "students view own applications" on public.applications
for select using (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.shadowing_opportunities so
    join public.employers e on e.id = so.employer_id
    where so.id = applications.opportunity_id
      and e.user_id = auth.uid()
  )
  or exists (
    select 1
    from public.student_profiles sp
    join public.university_admin_profiles uap on uap.university_id = sp.university_id
    where sp.user_id = applications.student_id
      and uap.user_id = auth.uid()
  )
);

create policy "students create applications" on public.applications
for insert with check (auth.uid() = student_id or public.is_super_admin());

create policy "students and employers update applications" on public.applications
for update using (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.shadowing_opportunities so
    join public.employers e on e.id = so.employer_id
    where so.id = applications.opportunity_id
      and e.user_id = auth.uid()
  )
)
with check (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.shadowing_opportunities so
    join public.employers e on e.id = so.employer_id
    where so.id = applications.opportunity_id
      and e.user_id = auth.uid()
  )
);

create policy "students manage own ai conversations" on public.ai_conversations
for all using (auth.uid() = student_id or public.is_super_admin())
with check (auth.uid() = student_id or public.is_super_admin());

create policy "students manage own career analyses" on public.career_analyses
for all using (auth.uid() = student_id or public.is_super_admin())
with check (auth.uid() = student_id or public.is_super_admin());

create policy "users manage own notifications" on public.notifications
for all using (auth.uid() = user_id or public.is_super_admin())
with check (auth.uid() = user_id or public.is_super_admin());

create policy "all authenticated users view badges" on public.badges
for select using (auth.role() = 'authenticated' or public.is_super_admin());

create policy "super admins manage badges" on public.badges
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "students view own student badges" on public.student_badges
for select using (auth.uid() = student_id or public.is_super_admin());

create policy "super admins manage student badges" on public.student_badges
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "students manage own micro tasks" on public.micro_tasks
for all using (auth.uid() = student_id or public.is_super_admin())
with check (auth.uid() = student_id or public.is_super_admin());

create policy "university license visible to owning admins" on public.university_licenses
for select using (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = university_licenses.university_id
  )
);

create policy "super admins manage university licenses" on public.university_licenses
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "users view own payments" on public.payments
for select using (
  auth.uid() = user_id
  or public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and exists (
        select 1
        from public.student_profiles sp
        where sp.user_id = payments.user_id
          and sp.university_id = uap.university_id
      )
  )
);

create policy "super admins manage payments" on public.payments
for all using (public.is_super_admin())
with check (public.is_super_admin());

create policy "employer feedback visible to related parties" on public.employer_feedback
for select using (
  public.is_super_admin()
  or exists (
    select 1
    from public.applications a
    where a.id = employer_feedback.application_id
      and a.student_id = auth.uid()
  )
  or exists (
    select 1
    from public.applications a
    join public.shadowing_opportunities so on so.id = a.opportunity_id
    join public.employers e on e.id = so.employer_id
    where a.id = employer_feedback.application_id
      and e.user_id = auth.uid()
  )
);

create policy "employers create feedback for own applications" on public.employer_feedback
for all using (
  public.is_super_admin()
  or exists (
    select 1
    from public.applications a
    join public.shadowing_opportunities so on so.id = a.opportunity_id
    join public.employers e on e.id = so.employer_id
    where a.id = employer_feedback.application_id
      and e.user_id = auth.uid()
  )
)
with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.applications a
    join public.shadowing_opportunities so on so.id = a.opportunity_id
    join public.employers e on e.id = so.employer_id
    where a.id = employer_feedback.application_id
      and e.user_id = auth.uid()
  )
);

create policy "authenticated users view mentors" on public.mentors
for select using (auth.role() = 'authenticated' or public.is_super_admin());

create policy "mentors manage own profile" on public.mentors
for all using (auth.uid() = user_id or public.is_super_admin())
with check (auth.uid() = user_id or public.is_super_admin());

create policy "mentor matches visible to involved users" on public.mentor_matches
for select using (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1 from public.mentors m
    where m.id = mentor_matches.mentor_id
      and m.user_id = auth.uid()
  )
);

create policy "students request mentor matches" on public.mentor_matches
for insert with check (auth.uid() = student_id or public.is_super_admin());

create policy "mentors and students update mentor matches" on public.mentor_matches
for update using (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1 from public.mentors m
    where m.id = mentor_matches.mentor_id
      and m.user_id = auth.uid()
  )
)
with check (
  auth.uid() = student_id
  or public.is_super_admin()
  or exists (
    select 1 from public.mentors m
    where m.id = mentor_matches.mentor_id
      and m.user_id = auth.uid()
  )
);

create policy "partnerships visible to stakeholders" on public.company_partnerships
for select using (
  public.is_super_admin()
  or requested_by = auth.uid()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = company_partnerships.university_id
  )
  or exists (
    select 1
    from public.employers e
    where e.id = company_partnerships.employer_id
      and e.user_id = auth.uid()
  )
);

create policy "university admins create partnerships" on public.company_partnerships
for insert with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = company_partnerships.university_id
  )
);

create policy "stakeholders update partnerships" on public.company_partnerships
for update using (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = company_partnerships.university_id
  )
  or exists (
    select 1
    from public.employers e
    where e.id = company_partnerships.employer_id
      and e.user_id = auth.uid()
  )
)
with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = company_partnerships.university_id
  )
  or exists (
    select 1
    from public.employers e
    where e.id = company_partnerships.employer_id
      and e.user_id = auth.uid()
  )
);

create policy "broadcasts visible to university and recipients" on public.broadcast_messages
for select using (
  public.is_super_admin()
  or sender_id = auth.uid()
  or exists (
    select 1
    from public.student_profiles sp
    where sp.user_id = auth.uid()
      and sp.university_id = broadcast_messages.university_id
  )
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = broadcast_messages.university_id
  )
);

create policy "university admins manage broadcasts" on public.broadcast_messages
for all using (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = broadcast_messages.university_id
  )
)
with check (
  public.is_super_admin()
  or exists (
    select 1
    from public.university_admin_profiles uap
    where uap.user_id = auth.uid()
      and uap.university_id = broadcast_messages.university_id
  )
);

create policy "authenticated users insert opportunity views" on public.opportunity_views
for insert with check (auth.uid() = viewer_id or viewer_id is null or public.is_super_admin());

create policy "super admins view opportunity views" on public.opportunity_views
for select using (public.is_super_admin());

create policy "users manage own activity events" on public.activity_events
for all using (auth.uid() = user_id or public.is_super_admin())
with check (auth.uid() = user_id or public.is_super_admin());

insert into storage.buckets (id, name, public)
values
  ('resumes', 'resumes', false),
  ('company-assets', 'company-assets', true),
  ('university-assets', 'university-assets', true)
on conflict (id) do nothing;

create policy "resume owners can upload" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'resumes'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "resume owners can read" on storage.objects
for select to authenticated
using (
  bucket_id = 'resumes'
  and auth.uid()::text = split_part(name, '/', 1)
);

create policy "employers can upload company assets" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'company-assets'
  and public.current_user_role() in ('employer', 'super_admin')
);

create policy "public can view company assets" on storage.objects
for select using (bucket_id = 'company-assets');

create policy "university admins can upload university assets" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'university-assets'
  and public.current_user_role() in ('university_admin', 'super_admin')
);

create policy "public can view university assets" on storage.objects
for select using (bucket_id = 'university-assets');
