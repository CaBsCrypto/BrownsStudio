import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DemoRedirectPage() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  const langs = acceptLang
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());

  let locale = "es";
  for (const l of langs) {
    if (l.startsWith("es")) { locale = "es"; break; }
    if (l.startsWith("pt")) { locale = "pt"; break; }
    if (l.startsWith("en")) { locale = "en"; break; }
  }

  redirect(`/${locale}/demo`);
}
