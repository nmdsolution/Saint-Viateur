import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const newsConfig: EntityConfig = {
  table: "news_items",
  entityLabel: "actualité",
  titleKey: "title",
  fields: [
    { key: "title", label: "Titre", type: "text", required: true },
    { key: "excerpt", label: "Extrait", type: "textarea" },
    { key: "category", label: "Catégorie", type: "text" },
    { key: "published_date", label: "Date de publication", type: "date", required: true },
    { key: "photo_url", label: "Photo", type: "image", showInTable: false },
  ],
};

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <h1 className="adm-page-title">Actualités</h1>
      <AdminEntityManager config={newsConfig} initialRows={(data as EntityRow[]) ?? []} />
    </>
  );
}
