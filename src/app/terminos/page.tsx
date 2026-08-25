import type { Metadata } from "next";
import { LegalDocument } from "@/components/blocks/LegalDocument";
import { PageHeader } from "@/components/layout/PageHeader";
import { BackToTop } from "@/components/primitives/BackToTop";
import { getSite, getTermsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  robots: { index: false, follow: true },
};

export default async function TermsPage() {
  const [page, site] = await Promise.all([getTermsPage(), getSite()]);

  return (
    <>
      <PageHeader heading={page.heading} />
      <LegalDocument page={page} site={site} />
      <BackToTop />
    </>
  );
}
