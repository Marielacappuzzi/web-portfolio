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
       * The work was renamed "El Rescate", and then lost its editorial page:
       * unfinished, with no year, technique or dimensions, it did not have
       * enough behind it to fill one. Both old paths now land on its card in
       * the gallery, where it opens in the lightbox. `permanent: false` on the
       * second one on purpose — when the piece is finished and photographed the
       * page comes back, and a 308 cached in every browser that ever saw it
       * would be a problem to undo.
       */
      {
        source: "/obra/jesus-la-oveja-y-el-lobo",
        destination: "/obra#el-rescate",
        permanent: true,
      },
      {
        source: "/obra/el-rescate",
        destination: "/obra#el-rescate",
        permanent: false,
      },
    ];
  },

  // Pin the workspace root so Turbopack does not walk up to the user's home
  // directory looking for a lockfile.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Artwork carries this site, so it is served at 90 — and at 92 in the
    // lightbox, which is the one place a drawing is shown at the size of the
    // screen. 75 stays allowed because it is the component default.
    qualities: [75, 90, 92],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
