import type { Metadata } from "next";
import { PendingTopics } from "@/components/blocks/PendingTopics";
import { PageHeader } from "@/components/layout/PageHeader";
import { getLegalNoticePage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
};

/** PENDING — see the note in src/app/privacidad/page.tsx. */
export default async function LegalNoticePage() {
  const page = await getLegalNoticePage();

  return (
    <>
      <PageHeader heading={page.heading} />
      <PendingTopics
        eyebrow="Contenido"
        title="Lo que este aviso debe cubrir."
        topics={page.topics}
        note="Requiere los datos identificativos y fiscales reales de la titular del sitio, además de la jurisdicción bajo la que se publica."
        headingId="aviso-contenido"
      />
    </>
  );
}
