type ClassValue = string | number | false | null | undefined;

/** Minimal class joiner. No dependency needed for what this site does. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
