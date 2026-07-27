import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const preferred = cookieStore.get("clinic-version")?.value;
  redirect(preferred === "v2" ? "/v2" : "/v1");
}
