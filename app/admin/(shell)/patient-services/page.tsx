import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const patientServiceTilesConfig: EntityConfig = {
  table: "patient_service_tiles",
  entityLabel: "service patient",
  fields: [
    { key: "name", label: "Nom", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "icon_slug", label: "Icône", type: "text", placeholder: "ex: calendar" },
    { key: "cta_label", label: "Libellé du bouton", type: "text" },
  ],
};

const faqItemsConfig: EntityConfig = {
  table: "faq_items",
  entityLabel: "question FAQ",
  titleKey: "question",
  fields: [
    { key: "question", label: "Question", type: "text", required: true },
    { key: "answer", label: "Réponse", type: "textarea", required: true },
  ],
};

export default async function PatientServicesPage() {
  const supabase = await createClient();

  const [{ data: tiles }, { data: faqItems }] = await Promise.all([
    supabase.from("patient_service_tiles").select("*").order("sort_order", { ascending: true }),
    supabase.from("faq_items").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <>
      <h1 className="adm-page-title">Services patients &amp; FAQ</h1>

      <section className="aem-section">
        <h2 className="aem-section-title">Services patients</h2>
        <AdminEntityManager
          config={patientServiceTilesConfig}
          initialRows={(tiles as EntityRow[]) ?? []}
        />
      </section>

      <section className="aem-section">
        <h2 className="aem-section-title">Questions fréquentes</h2>
        <AdminEntityManager
          config={faqItemsConfig}
          initialRows={(faqItems as EntityRow[]) ?? []}
        />
      </section>
    </>
  );
}
