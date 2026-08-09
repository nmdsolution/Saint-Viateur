-- =============================================================================
-- Clinique Médicale Saint Viateur — Supabase schema (Phase 1)
-- =============================================================================
-- Paste this whole file into the Supabase SQL Editor (Project > SQL Editor)
-- and run it once against a fresh project. It is idempotent-ish (uses
-- `if not exists` / `or replace` where possible) but is intended to be run
-- a single time against an empty database.
--
-- Sections:
--   1. Extensions
--   2. profiles (staff accounts) + auto-provisioning trigger
--   3. Helper functions used by RLS policies (is_staff / is_admin)
--   4. site_settings (singleton row)
--   5. Content tables (specialties, equipment, ...)
--   6. Chatbot tables (server-only writes via service role key)
--   7. Row Level Security policies
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Extensions
-- -----------------------------------------------------------------------------
-- gen_random_uuid() lives in pgcrypto on older Postgres; Supabase projects
-- ship with it available, but we enable it explicitly to be safe.
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- 2. profiles — one row per staff/admin user, linked 1:1 to auth.users
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  full_name text,
  created_at timestamptz not null default now()
);

-- Auto-create a `profiles` row (default role: editor) whenever a new user
-- signs up in Supabase Auth, so every authenticated user has a matching
-- profile without any extra client-side code.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 3. Helper functions used by RLS policies below
-- -----------------------------------------------------------------------------
-- is_staff(): true if the currently-authenticated user has an admin or
-- editor profile. Used to gate writes on the public content tables.
create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- is_admin(): true only for admin-role users. Used to gate the
-- staff-management screen (viewing/editing other people's profiles).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- -----------------------------------------------------------------------------
-- 4. site_settings — singleton table (always exactly one row, id = 1)
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  address text,
  phone text,
  email text,
  hours text,
  social_facebook text,
  social_linkedin text,
  social_instagram text,
  social_whatsapp text,
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 5. Content tables
-- -----------------------------------------------------------------------------

-- Medical / surgical specialties + technical platform items (Services page).
create table if not exists public.specialties (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('medecine', 'chirurgie', 'technique')),
  name text not null,
  icon_slug text,
  sort_order int not null default 0,
  featured_on_homepage boolean not null default false,
  description text
);

-- Medical equipment (Equipment page cards).
create table if not exists public.equipment (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  photo_url text,
  sort_order int not null default 0
);

-- Scrolling marquee highlights on the Equipment page.
create table if not exists public.equipment_highlights (
  id uuid primary key default gen_random_uuid(),
  icon_slug text,
  label text not null,
  sort_order int not null default 0
);

-- Patient-services tiles (Patient services page grid).
create table if not exists public.patient_service_tiles (
  id uuid primary key default gen_random_uuid(),
  icon_slug text,
  name text not null,
  description text,
  cta_label text,
  sort_order int not null default 0
);

-- FAQ accordion (Patient services page).
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- Accepted insurance chips (Patient services page).
create table if not exists public.insurances (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0
);

-- Partner institutions (Homepage "Nos partenaires" section).
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  icon_slug text,
  name text not null,
  description text,
  sort_order int not null default 0
);

-- Gallery photos.
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  category text not null,
  photo_url text,
  tall boolean not null default false,
  sort_order int not null default 0
);

-- News / actualités items.
create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  category text,
  published_date date not null default current_date,
  photo_url text,
  sort_order int not null default 0
);

-- -----------------------------------------------------------------------------
-- 6. Chatbot tables
-- -----------------------------------------------------------------------------
-- NOTE: there is deliberately NO insert policy for anon/authenticated roles
-- on either chatbot table below. All writes happen server-side, from a
-- Next.js Route Handler using the SUPABASE_SERVICE_ROLE_KEY, which bypasses
-- Row Level Security entirely. Only staff can read the conversation history
-- (see policies in section 7).
create table if not exists public.chatbot_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  started_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  user_agent text
);

create table if not exists public.chatbot_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chatbot_conversations (id) on delete cascade,
  role text not null check (role in ('me', 'bot')),
  text text not null,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 7. Row Level Security
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.specialties enable row level security;
alter table public.equipment enable row level security;
alter table public.equipment_highlights enable row level security;
alter table public.patient_service_tiles enable row level security;
alter table public.faq_items enable row level security;
alter table public.insurances enable row level security;
alter table public.partners enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.news_items enable row level security;
alter table public.chatbot_conversations enable row level security;
alter table public.chatbot_messages enable row level security;

-- --- profiles -----------------------------------------------------------
-- Authenticated users can read their own profile.
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Admins can read every profile (staff-management screen).
create policy "profiles_select_admin"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- Admins can update any profile (e.g. change someone's role).
create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- --- site_settings --------------------------------------------------------
create policy "site_settings_select_public"
  on public.site_settings for select
  using (true);

create policy "site_settings_insert_staff"
  on public.site_settings for insert
  to authenticated
  with check (public.is_staff());

create policy "site_settings_update_staff"
  on public.site_settings for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "site_settings_delete_staff"
  on public.site_settings for delete
  to authenticated
  using (public.is_staff());

-- --- Public content tables --------------------------------------------------
-- Every table below shares the same shape of policy: readable by anyone,
-- writable only by staff (admin or editor).
do $$
declare
  t text;
begin
  foreach t in array array[
    'specialties',
    'equipment',
    'equipment_highlights',
    'patient_service_tiles',
    'faq_items',
    'insurances',
    'partners',
    'gallery_photos',
    'news_items'
  ]
  loop
    execute format('create policy "%I_select_public" on public.%I for select using (true);', t, t);
    execute format('create policy "%I_insert_staff" on public.%I for insert to authenticated with check (public.is_staff());', t, t);
    execute format('create policy "%I_update_staff" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff());', t, t);
    execute format('create policy "%I_delete_staff" on public.%I for delete to authenticated using (public.is_staff());', t, t);
  end loop;
end;
$$;

-- --- chatbot_conversations / chatbot_messages ------------------------------
-- No insert/update/delete policy for anon or authenticated roles: writes
-- only ever happen server-side via the service-role key (see note above),
-- which bypasses RLS. Staff can read conversation history for support /
-- quality purposes.
create policy "chatbot_conversations_select_staff"
  on public.chatbot_conversations for select
  to authenticated
  using (public.is_staff());

create policy "chatbot_messages_select_staff"
  on public.chatbot_messages for select
  to authenticated
  using (public.is_staff());