import type { ReactNode } from "react";

/**
 * Renders `*emphasised*` spans inside a heading as italic.
 *
 * Titles stay plain strings in src/content — the day they come from a CMS,
 * an editor types asterisks, not JSX. Only this one mark is supported: the
 * copy is set editorially, and a general Markdown parser here would invite
 * formatting the content model does not want.
 *
 * Newsreader ships a true italic, so this is a real cut rather than a slanted
 * roman. The device is meant to fall on one phrase per heading — the word the
 * sentence turns on.
 */
export function withEmphasis(text: string): ReactNode {
  if (!text.includes("*")) return text;

  // Split on *...* while keeping the delimiters, so the odd segments are the
  // emphasised ones.
  const parts = text.split(/\*([^*]+)\*/g);

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="italic">
        {part}
      </em>
    ) : (
      part
    ),
  );
}
