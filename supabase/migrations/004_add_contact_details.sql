-- =============================================================================
-- Migration 004: add postal address / emergency / WhatsApp contact fields,
-- and insurance category
-- =============================================================================
-- Phase 1's original schema.sql only had a single free-text address/phone
-- pair on site_settings, and a single flat, uncategorized list of
-- insurances. The clinic's real contact sheet distinguishes a postal
-- address, an emergency line and a WhatsApp number from the main phone
-- line, and groups its accepted insurances/partners into local,
-- international and institutional categories. This adds those columns
-- additively for anyone who already applied schema.sql against a live
-- project.
alter table public.site_settings add column if not exists postal_address text;
alter table public.site_settings add column if not exists emergency_phone text;
alter table public.site_settings add column if not exists whatsapp_number text;

alter table public.insurances add column if not exists category text not null default 'locale'
  check (category in ('locale', 'internationale', 'institution'));
