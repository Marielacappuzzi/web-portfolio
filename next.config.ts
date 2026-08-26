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
      /* The work was renamed "El Rescate"; the old slug still resolves. */
      {
        source: "/obra/jesus-la-oveja-y-el-lobo",
        destination: "/obra/el-rescate",
        permanent: true,
      },
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
