"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Generic CRUD + reorder server actions shared by every content-entity
 * admin page via `AdminEntityManager`. All of them use the *server* Supabase
 * client (cookie-scoped to the signed-in staff member), so every write goes
 * through the normal Row Level Security policies in `supabase/schema.sql`
 * (writable by `admin`/`editor` roles only) — never the service role key.
 */

export async function createEntityRow(
  table: string,
  values: Record<string, unknown>
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(values);
  if (error) throw new Error(error.message);
}

export async function updateEntityRow(
  table: string,
  id: string,
  values: Record<string, unknown>
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteEntityRow(table: string, id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Reordering is done by swapping the `sort_order` value of two adjacent
 * rows (simplest mechanism that satisfies "move up" / "move down" — no
 * drag-and-drop, no renumbering the whole table).
 */
export async function swapSortOrder(
  table: string,
  rowA: { id: string; sort_order: number },
  rowB: { id: string; sort_order: number }
): Promise<void> {
  const supabase = await createClient();

  const { error: errorA } = await supabase
    .from(table)
    .update({ sort_order: rowB.sort_order })
    .eq("id", rowA.id);
  if (errorA) throw new Error(errorA.message);

  const { error: errorB } = await supabase
    .from(table)
    .update({ sort_order: rowA.sort_order })
    .eq("id", rowB.id);
  if (errorB) throw new Error(errorB.message);
}
