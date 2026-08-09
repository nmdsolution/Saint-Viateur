import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const specialtiesConfig: EntityConfig = {
  table: "specialties",
  entityLabel: "spécialité",
  fields: [
    { key: "name", label: "Nom", type: "text", required: true },
    {
      key: "category",
      label: "Catégorie",
      type: "select",
      required: true,
      options: [
        { value: "medecine", label: "Médecine" },
        { value: "chirurgie", label: "Chirurgie" },
        { value: "technique", label: "Plateau technique" },
      ],
    },
    { key: "icon_slug", label: "Icône", type: "text", placeholder: "ex: stethoscope" },
    {
      key: "featured_on_homepage",
      label: "Mise en avant sur l'accueil",
      type: "boolean",
    },
    { key: "description", label: "Description", type: "textarea" },
  ],
};

export default async function SpecialtiesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("specialties")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <h1 className="adm-page-title">Spécialités</h1>
      <AdminEntityManager config={specialtiesConfig} initialRows={(data as EntityRow[]) ?? []} />
    </>
  );
}
