import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

function loadEnvLocal(path) {
  const text = readFileSync(path, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const envPath = process.argv[2] ?? ".env.local";
const env = loadEnvLocal(envPath);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(`Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in ${envPath}`);
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Keep this list in sync with the `partners` insert in supabase/seed.sql.
const updates = [
  ["BCEAO", "/BCEAO.png"],
  ["Commission Bancaire", "/Commission Bancaire.jpg"],
  ["BHCI", "/BHCI.png"],
  ["Clinique La Providence", "/Clinique La Providence.png"],
  ["CRRAE-UMOA", "/CRRAE-UMOA.jpg"],
  ["Gestoci", "/Gestoci.jpg"],
  ["SICMA", "/SICMA.png"],
  ["Société Ivoirienne de Banque (SIB)", "/Société Ivoirienne de Banque (SIB).jpg"],
];

let okCount = 0;
for (const [name, photoUrl] of updates) {
  const { data, error } = await supabase
    .from("partners")
    .update({ photo_url: photoUrl })
    .eq("name", name)
    .select("id, name, photo_url");

  if (error) {
    console.error(`FAIL  ${name}: ${error.message}`);
    continue;
  }
  if (!data || data.length === 0) {
    console.error(`WARN  ${name}: no matching row found`);
    continue;
  }
  console.log(`OK    ${name} -> ${data[0].photo_url}`);
  okCount++;
}

console.log(`\n${okCount}/${updates.length} rows updated.`);
process.exit(okCount === updates.length ? 0 : 2);
