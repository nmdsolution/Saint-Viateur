-- =============================================================================
-- Migration 002: add photo_url to partners
-- =============================================================================
-- Phase 1's original schema.sql created public.partners without a photo_url
-- column, so the homepage "Nos partenaires" section could only ever render
-- generic icon badges. This adds the column additively for anyone who already
-- applied schema.sql against a live project, so real partner logos can be
-- stored without re-running the whole schema from scratch.
alter table public.partners add column if not exists photo_url text;
