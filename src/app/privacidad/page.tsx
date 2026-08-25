import type { Metadata } from "next";
import { LegalDocument } from "@/components/blocks/LegalDocument";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackToTop } from "@/components/primitives/BackToTop";
import { getPrivacyPage, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

export default async function PrivacyPage() {
  const [page, site] = await Promise.all([getPrivacyPage(), getSite()]);

  return (
    <>
      <PageHeader heading={page.heading} />
      <LegalDocument page={page} site={site} />
      <BackToTop />
    </>
  );
}
