import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * The legal notice became "Términos y condiciones" when the client supplied
   * the wording. Nothing links to the old path any more, but anything already
   * bookmarked or indexed should still land somewhere.
   */
  async redirects() {
    return [
      { source: "/aviso-legal", destination: "/terminos", permanent: true },
      /*
       * /contacto no longer exists as a page: the enquiry form moved onto
       * /encargos and the client asked for the route to go. Anything already
       * bookmarked, linked or indexed lands on the form rather than a 404.
       * Not permanent — a separate contact page is a decision that could be
       * revisited, and a 308 cached in every browser would be hard to undo.
       */
      { source: "/contacto", destination: "/encargos#cotizar", permanent: false },
    ];
  },

  // Pin the workspace root so Turbopack does not walk up to the user's home
  // directory looking for a lockfile.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Artwork carries this site, so it is served at 90. 75 stays allowed
    // because it is the component default for everything else.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
