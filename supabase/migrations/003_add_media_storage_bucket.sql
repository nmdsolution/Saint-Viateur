-- =============================================================================
-- Migration 003: add `media` storage bucket for admin image uploads
-- =============================================================================
-- Phase 1's original schema.sql had no Supabase Storage bucket at all, so
-- image fields in the admin (equipment/gallery/news photos, partner logos,
-- ...) required staff to paste a URL by hand. This adds a public `media`
-- bucket plus the same public-read / staff-write RLS pattern already used
-- for every content table, additively, for anyone who already applied
-- schema.sql against a live project.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_select_public"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media_insert_staff"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_staff());

create policy "media_update_staff"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_staff())
  with check (bucket_id = 'media' and public.is_staff());

create policy "media_delete_staff"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_staff());