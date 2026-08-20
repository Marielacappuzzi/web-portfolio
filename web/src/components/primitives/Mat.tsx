import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MatProps {
  children: ReactNode;
  className?: string;
}

/**
 * The passepartout.
 *
 * A hairline border with breathing space between it and the work, the way a
 * mounted drawing sits inside its mat. It gives every image the same framing
 * across the site and keeps the artwork from bleeding into the page.
 *
 * The border uses the ground's own rule colour, so it reads as a fine grey
 * line on paper and a barely-there light line on the chamber ground, without
 * either version needing its own variant.
 */
export function Mat({ children, className }: MatProps) {
  return (
    <div className={cn("border border-rule p-2 sm:p-3 md:p-4", className)}>
      {children}
    </div>
  );
}
