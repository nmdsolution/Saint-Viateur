import { createClient } from "@/lib/supabase/server";
import {
  AdminEntityManager,
  type EntityConfig,
  type EntityRow,
} from "../_components/AdminEntityManager";

const galleryConfig: EntityConfig = {
  table: "gallery_photos",
  entityLabel: "photo",
  fields: [
    { key: "label", label: "Libellé", type: "text", required: true },
    {
      key: "category",
      label: "Catégorie",
      type: "text",
      required: true,
      placeholder: "ex: locaux, équipe, événements",
    },
    { key: "photo_url", label: "Photo", type: "image", showInTable: false },
    { key: "tall", label: "Format vertical (grande vignette)", type: "boolean" },
  ],
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <h1 className="adm-page-title">Galerie</h1>
      <AdminEntityManager config={galleryConfig} initialRows={(data as EntityRow[]) ?? []} />
    </>
  );
}
