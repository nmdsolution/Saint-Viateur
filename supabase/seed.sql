-- =============================================================================
-- Clinique Médicale Saint Viateur — seed data (Phase 1)
-- =============================================================================
-- Run this AFTER schema.sql, once, against an empty database. It loads the
-- content that is currently hardcoded in the Next.js pages so the site isn't
-- empty once Phase 4 switches those pages to read from Supabase.
--
-- Sources (read verbatim, nothing invented):
--   app/services/page.tsx          -> specialties
--   app/equipment/page.tsx         -> equipment, equipment_highlights
--   app/patient-services/page.tsx  -> patient_service_tiles, faq_items, insurances
--   app/page.tsx ("Nos partenaires")  -> partners
--   app/gallery/page.tsx           -> gallery_photos
--   app/news/page.tsx              -> news_items
--   app/contact/page.tsx + app/components/Footer.tsx -> site_settings
--
-- `icon_slug` values are placeholder kebab-case slugs grouped by icon concept
-- (Phase 4 will build the real icon registry) — not a 1:1 export of the SVG
-- markup.
-- `photo_url` / `photo` fields are left NULL: the current pages only render
-- text placeholders ("Photo — ..."), there are no real image URLs yet.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- specialties (app/services/page.tsx)
-- -----------------------------------------------------------------------------

-- MEDICAL_SPECIALTIES (category = 'medecine'), order preserved as sort_order.
-- Médecine Générale, Pédiatrie, Cardiologie and Gynécologie – Obstétrique are
-- also featured as homepage "services" cards in app/page.tsx.
insert into public.specialties (category, name, icon_slug, sort_order, featured_on_homepage) values
  ('medecine', 'Médecine Générale', 'stethoscope', 1, true),
  ('medecine', 'Gynécologie – Obstétrique', 'obstetrics', 2, true),
  ('medecine', 'Pédiatrie', 'baby', 3, true),
  ('medecine', 'Cardiologie', 'heart', 4, true),
  ('medecine', 'Pneumologie', 'lungs', 5, false),
  ('medecine', 'Neurologie', 'brain', 6, false),
  ('medecine', 'Neurochirurgie', 'brain-surgery', 7, false),
  ('medecine', 'Rhumatologie', 'joint', 8, false),
  ('medecine', 'Urologie', 'urinary-tract', 9, false),
  ('medecine', 'Néphrologie', 'kidney', 10, false),
  ('medecine', 'Hépato-gastro-entérologie', 'digestive-system', 11, false),
  ('medecine', 'Hématologie', 'blood-drop', 12, false),
  ('medecine', 'Endocrinologie – Diabétologie', 'endocrine', 13, false),
  ('medecine', 'Dermatologie – Vénérologie', 'skin', 14, false),
  ('medecine', 'Infectiologie', 'infection', 15, false),
  ('medecine', 'Cancérologie (Oncologie)', 'oncology', 16, false),
  ('medecine', 'Psychiatrie', 'psychiatry', 17, false),
  ('medecine', 'Nutrition', 'nutrition', 18, false),
  ('medecine', 'Médecine Physique et de Réadaptation', 'rehabilitation', 19, false),
  ('medecine', 'Traumatologie', 'trauma', 20, false);

-- SURGICAL_SPECIALTIES (category = 'chirurgie').
insert into public.specialties (category, name, icon_slug, sort_order, featured_on_homepage) values
  ('chirurgie', 'Chirurgie Générale', 'surgery', 1, false),
  ('chirurgie', 'Chirurgie Pédiatrique', 'pediatric-surgery', 2, false),
  ('chirurgie', 'Chirurgie Thoracique', 'thoracic-surgery', 3, false),
  ('chirurgie', 'ORL (Oto-Rhino-Laryngologie)', 'ent', 4, false),
  ('chirurgie', 'Stomatologie', 'dental', 5, false),
  ('chirurgie', 'Chirurgie Dentaire', 'dental-surgery', 6, false);

-- TECHNICAL_PLATFORM (category = 'technique').
insert into public.specialties (category, name, icon_slug, sort_order, featured_on_homepage) values
  ('technique', 'Anesthésie – Réanimation', 'anesthesia', 1, false),
  ('technique', 'Radiologie et Imagerie Médicale', 'radiology', 2, false),
  ('technique', 'Biologie Médicale', 'lab', 3, false),
  ('technique', 'Kinésithérapie', 'physio', 4, false);

-- -----------------------------------------------------------------------------
-- equipment + equipment_highlights (app/equipment/page.tsx)
-- -----------------------------------------------------------------------------
insert into public.equipment (name, description, photo_url, sort_order) values
  ('Scanner (Imagerie médicale)', 'Examens d''imagerie haute résolution pour un diagnostic précis.', null, 1),
  ('Échographe', 'Suivi de grossesse et explorations abdominales / cardiaques.', null, 2),
  ('Radiologie numérique', 'Radiographies numériques à faible dose, résultats rapides.', null, 3),
  ('Laboratoire d''analyses', 'Analyses biologiques sur place avec rendu rapide des résultats.', null, 4),
  ('Bloc opératoire équipé', 'Salles d''opération aux normes pour la chirurgie générale et spécialisée.', null, 5),
  ('Monitoring & réanimation', 'Surveillance continue des patients en soins intensifs.', null, 6);

insert into public.equipment_highlights (icon_slug, label, sort_order) values
  ('scanner', 'Scanner haute résolution', 1),
  ('lab', 'Analyses biologiques sur place', 2),
  ('operating-room', 'Bloc opératoire aux normes', 3),
  ('clock', 'Résultats en 24 h', 4),
  ('shield-check', 'Maintenance certifiée', 5),
  ('team', 'Équipe technique formée', 6);

-- -----------------------------------------------------------------------------
-- patient_service_tiles + faq_items + insurances (app/patient-services/page.tsx)
-- -----------------------------------------------------------------------------
insert into public.patient_service_tiles (icon_slug, name, description, cta_label, sort_order) values
  ('calendar', 'Prise de rendez-vous', 'En ligne, par téléphone ou WhatsApp.', 'Réserver', 1),
  ('hospital-bed', 'Hospitalisation', 'Chambres individuelles et collectives, documents à fournir à l''admission.', null, 2),
  ('emergency', 'Urgences', 'Accueil des urgences 24h/24, 7j/7.', null, 3),
  ('pharmacy', 'Pharmacie', 'Pharmacie sur site pour vos traitements.', null, 4),
  ('lab', 'Laboratoire', 'Analyses biologiques, retrait des résultats en ligne.', null, 5),
  ('radiology', 'Imagerie médicale', 'Scanner, échographie, radiologie numérique.', null, 6),
  ('insurance', 'Assurances acceptées', 'Liste des assurances et partenaires conventionnés.', null, 7),
  ('whatsapp', 'Chat WhatsApp', 'Une question ? Écrivez-nous directement.', null, 8);

insert into public.faq_items (question, answer, sort_order) values
  ('Comment prendre rendez-vous en ligne ?', 'Utilisez le bouton "Prendre rendez-vous" en haut de page, ou contactez-nous par WhatsApp / téléphone.', 1),
  ('Comment récupérer mes résultats d''analyses ?', 'Les résultats sont disponibles au laboratoire ou via votre espace patient en ligne.', 2),
  ('Quels documents apporter pour une hospitalisation ?', 'Pièce d''identité, carte d''assurance et lettre d''admission du médecin.', 3),
  ('La clinique recrute-t-elle ?', 'Consultez notre espace recrutement pour les offres en cours.', 4);

-- Only the 4 real insurance chips — the "+ Liste complète des partenaires"
-- chip in the source page is a UI affordance, not a real insurer.
insert into public.insurances (name, sort_order) values
  ('NSIA Assurances', 1),
  ('Saham Assurance', 2),
  ('Allianz CI', 3),
  ('CNAM', 4);

-- -----------------------------------------------------------------------------
-- partners (app/page.tsx, "Nos partenaires" section)
-- -----------------------------------------------------------------------------
insert into public.partners (icon_slug, name, description, photo_url, sort_order) values
  ('research-institute', 'Institut Pasteur de Côte d''Ivoire', 'Recherche, biologie médicale et référence en santé publique.', '/partners/institut-pasteur.webp', 1),
  ('hospital', 'CHU de Cocody', 'Centre hospitalier universitaire pour les prises en charge spécialisées.', '/partners/chu-cocody.jpg', 2),
  ('polyclinic', 'PISAM', 'Polyclinique Internationale Sainte Anne-Marie, partenaire pour les cas complexes.', '/partners/pisam.jpg', 3),
  ('red-cross', 'Croix-Rouge Côte d''Ivoire', 'Secours d''urgence, sensibilisation et dons de sang.', '/partners/croix-rouge.png', 4),
  ('blood-bank', 'CNTS', 'Centre National de Transfusion Sanguine — approvisionnement en produits sanguins.', null, 5),
  ('medical-board', 'Ordre National des Médecins de CI', 'Encadrement déontologique et garantie de la qualité des soins.', '/partners/ordre-medecins.jpg', 6);

-- -----------------------------------------------------------------------------
-- gallery_photos (app/gallery/page.tsx)
-- -----------------------------------------------------------------------------
insert into public.gallery_photos (label, category, photo_url, tall, sort_order) values
  ('Accueil', 'accueil', null, true, 1),
  ('Salle d''attente', 'attente', null, false, 2),
  ('Chambre', 'chambre', null, false, 3),
  ('Bloc opératoire', 'bloc', null, false, 4),
  ('Équipement', 'equip', null, false, 5),
  ('Salle d''attente', 'attente', null, false, 6),
  ('Chambre', 'chambre', null, false, 7),
  ('Couloir', 'accueil', null, false, 8),
  ('Équipement', 'equip', null, false, 9);

-- -----------------------------------------------------------------------------
-- news_items (app/news/page.tsx)
-- -----------------------------------------------------------------------------
-- French date strings converted to real `date` values (e.g. "12 juin 2026" -> 2026-06-12).
insert into public.news_items (title, excerpt, category, published_date, photo_url, sort_order) values
  ('Campagne de dépistage gratuit du diabète', 'Une semaine de dépistage ouverte à tous, sur rendez-vous.', 'Campagne de santé', date '2026-06-12', null, 1),
  ('Un nouvel appareil d''imagerie médicale', 'La clinique renforce son plateau technique en radiologie.', 'Nouvel équipement', date '2026-05-28', null, 2),
  ('5 gestes pour prévenir l''hypertension', 'Les conseils de nos cardiologues pour un cœur en bonne santé.', 'Prévention', date '2026-05-03', null, 3),
  ('Journée portes ouvertes de la clinique', 'Venez visiter nos installations et rencontrer nos équipes.', 'Évènement', date '2026-04-20', null, 4),
  ('Consultations gratuites pour la journée mondiale de la santé', 'Une initiative de sensibilisation ouverte à la communauté.', 'Campagne de santé', date '2026-04-02', null, 5),
  ('Bien s''alimenter pendant la grossesse', 'Les recommandations de notre service de nutrition.', 'Prévention', date '2026-03-15', null, 6);

-- -----------------------------------------------------------------------------
-- site_settings (app/contact/page.tsx + app/components/Footer.tsx)
-- -----------------------------------------------------------------------------
-- Social links are left NULL: the Footer currently only has "#" placeholder
-- anchors (no real social URLs exist yet to seed).
insert into public.site_settings (id, address, phone, email, hours, social_facebook, social_linkedin, social_instagram, social_whatsapp) values
  (1, 'Riviera SIDECI, Abidjan, Côte d''Ivoire', '+225 XX XX XX XX XX', 'contact@cliniquesaintviateur.ci', 'Lun–Dim, urgences 24h/24', null, null, null, null)
on conflict (id) do update set
  address = excluded.address,
  phone = excluded.phone,
  email = excluded.email,
  hours = excluded.hours,
  social_facebook = excluded.social_facebook,
  social_linkedin = excluded.social_linkedin,
  social_instagram = excluded.social_instagram,
  social_whatsapp = excluded.social_whatsapp,
  updated_at = now();