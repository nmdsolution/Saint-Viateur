import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const insurancesConfig: EntityConfig = {
  table: "insurances",
  entityLabel: "assurance",
  fields: [{ key: "name", label: "Nom", type: "text", required: true }],
};

const partnersConfig: EntityConfig = {
  table: "partners",
  entityLabel: "partenaire",
  fields: [
    { key: "name", label: "Nom", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "photo_url", label: "Photo (logo)", type: "image", showInTable: false },
    { key: "icon_slug", label: "Icône", type: "text", placeholder: "ex: handshake" },
  ],
};

export default async function PartnersPage() {
  const supabase = await createClient();

  const [{ data: insurances }, { data: partners }] = await Promise.all([
    supabase.from("insurances").select("*").order("sort_order", { ascending: true }),
    supabase.from("partners").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <>
      <h1 className="adm-page-title">Assurances &amp; partenaires</h1>

      <section className="aem-section">
        <h2 className="aem-section-title">Assurances acceptées</h2>
        <AdminEntityManager
          config={insurancesConfig}
          initialRows={(insurances as EntityRow[]) ?? []}
        />
      </section>

      <section className="aem-section">
        <h2 className="aem-section-title">Partenaires</h2>
        <AdminEntityManager
          config={partnersConfig}
          initialRows={(partners as EntityRow[]) ?? []}
        />
      </section>
    </>
  );
}
