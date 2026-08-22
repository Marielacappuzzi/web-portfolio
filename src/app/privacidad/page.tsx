import type { Metadata } from "next";
import { PendingTopics } from "@/components/blocks/PendingTopics";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPrivacyPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

/**
 * PENDING: writing plausible-sounding legal text would be worse than an empty
 * page — it would be a document Mariela could be held to. The page ships as
 * the outline it must cover, with each item declared as pending.
 * See docs/CONTENT_PENDING.md #18.
 */
export default async function PrivacyPage() {
  const page = await getPrivacyPage();

  return (
    <>
      <PageHeader heading={page.heading} />
      <PendingTopics
        eyebrow="Contenido"
        title="Lo que esta política debe cubrir."
        topics={page.topics}
        note="Redactar este texto requiere datos reales: titularidad, identificación fiscal, proveedor de alojamiento, herramientas de medición en uso y jurisdicción aplicable. No se publica texto legal inventado."
        headingId="privacidad-contenido"
      />
    </>
  );
}
