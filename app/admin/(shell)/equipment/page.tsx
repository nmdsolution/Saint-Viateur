import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const equipmentConfig: EntityConfig = {
  table: "equipment",
  entityLabel: "équipement",
  fields: [
    { key: "name", label: "Nom", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "photo_url", label: "Photo", type: "image", showInTable: false },
  ],
};

const equipmentHighlightsConfig: EntityConfig = {
  table: "equipment_highlights",
  entityLabel: "point fort",
  titleKey: "label",
  fields: [
    { key: "label", label: "Libellé", type: "text", required: true },
    { key: "icon_slug", label: "Icône", type: "text", placeholder: "ex: scanner" },
  ],
};

export default async function EquipmentPage() {
  const supabase = await createClient();

  const [{ data: equipment }, { data: highlights }] = await Promise.all([
    supabase.from("equipment").select("*").order("sort_order", { ascending: true }),
    supabase.from("equipment_highlights").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <>
      <h1 className="adm-page-title">Équipements</h1>

      <section className="aem-section">
        <h2 className="aem-section-title">Équipements (fiches détaillées)</h2>
        <AdminEntityManager
          config={equipmentConfig}
          initialRows={(equipment as EntityRow[]) ?? []}
        />
      </section>

      <section className="aem-section">
        <h2 className="aem-section-title">Points forts (bandeau défilant)</h2>
        <AdminEntityManager
          config={equipmentHighlightsConfig}
          initialRows={(highlights as EntityRow[]) ?? []}
        />
      </section>
    </>
  );
}
