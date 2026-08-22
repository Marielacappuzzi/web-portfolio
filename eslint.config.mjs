import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Reference site snapshots. They live beside the project on disk but are
    // not part of it — third-party HTTrack downloads, git-ignored, and not
    // ours to lint.
    "kristalynmiguel.com/**",
    "lillicoart.com/**",
    "yuliabas.com/**",
  ]),
]);

export default eslintConfig;
