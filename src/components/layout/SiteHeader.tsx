"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { lockScroll } from "@/lib/smooth-scroll";
import type { Ground } from "./Section";

interface SiteHeaderProps {
  nav: NavItem[];
  name: string;
}

/**
 * Fixed header. Five labels, and nothing that unfolds.
 *
 * "Obras" used to drop a panel listing every piece in the catalogue, half of
 * them anchors back into the gallery it was covering. It turned the one route
 * everybody takes into a choice between eleven links and kept a second copy of
 * the catalogue in the chrome. The label goes to the gallery now, which is
 * what it always said it would do.
 *
 * Always on the paper ground. The monogram returns home and swaps to its light
 * version while the mobile menu is open, because the panel behind it turns to
 * chamber.
 */
export function SiteHeader({ nav, name }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  /*
    Close on tap rather than on the route changing. The panel used to stay up
    after a link was followed, with the page already changed underneath it.
    Doing it here rather than in an effect keyed on the pathname avoids the
    cascading render React warns about, and it closes on the gesture rather
    than a beat later.
  */
  const closeMenu = () => setMenuOpen(false);

  /*
    PageTransition intercepts link clicks in the capture phase and stops them
    propagating, so React never sees them and the onClick below never ran —
    the panel stayed open over a page that had already changed. It dispatches
    this instead, which carries past the stopped bubble.
  */
  useEffect(() => {
    const onNavigate = () => setMenuOpen(false);

    document.addEventListener("site:navigate", onNavigate);
    return () => document.removeEventListener("site:navigate", onNavigate);
  }, []);

  // Escape closes; the page underneath does not scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis moves the page itself; overflow alone would not hold it.
    lockScroll(true);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      lockScroll(false);
    };
  }, [menuOpen]);

  /*
   * The header is always paper now. It used to open transparent over a
   * full-viewport dark hero and swap on scroll; the hero is a banded image
   * that starts below the header, so the swap has nothing to swap for and the
   * scroll listener was one more moving part that could go wrong.
   */
  const ground: Ground = menuOpen ? "chamber" : "paper";

  return (
    <>
      <header
        // Named so the view transition can hold it still: chrome that fades
        // on every navigation draws attention to the mechanism.
        style={{ viewTransitionName: "site-header" }}
        data-ground={ground}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          menuOpen
            ? "bg-transparent"
            : "border-b border-rule bg-bg/95 backdrop-blur-[2px]",
        )}
      >
        <div className="gutter mx-auto flex h-16 w-full max-w-wide items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label={`${name}, ir al inicio`}
            className="block transition-opacity duration-300 hover:opacity-60"
          >
            {/*
              The monogram alone, cropped from the full lockup. At header
              height the wordmark under it would be four pixels tall and
              illegible; the mark carries the identity on its own and the full
              lockup gets its proper size in the footer.
            */}
            {/*
              Both marks render, one over the other, and opacity picks. An
              earlier version swapped the `src`, so opening the menu sent the
              browser to fetch the other file — the gap before it arrived is
              the flicker where the logo appeared alone, ahead of the panel.
            */}
            <span className="relative block h-10 w-[5.75rem] md:h-12 md:w-[6.9rem]">
              <Image
                src="/marca/mc-monograma.png"
                alt={name}
                fill
                priority
                sizes="144px"
                className={cn(
                  "object-contain object-left transition-opacity duration-300",
                  menuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <Image
                src="/marca/mc-monograma-claro.png"
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="144px"
                className={cn(
                  "object-contain object-left transition-opacity duration-300",
                  menuOpen ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-xl">
              {nav.map((item) => {
                /*
                  "/" would prefix-match every route, so the home is compared
                  exactly and everything else also matches its subpages.
                */
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block py-1 font-sans text-sm transition-colors duration-300",
                        active ? "text-fg-strong" : "text-fg hover:text-fg-strong",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-out-quart",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Cerrar el menú" : "Abrir el menú"}
            </span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute inset-x-0 block h-px bg-current transition-all duration-400 ease-in-out-quart",
                  menuOpen ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 block h-px bg-current transition-all duration-400 ease-in-out-quart",
                  menuOpen ? "top-1/2 -rotate-45" : "top-full",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu: the navigation becomes a page of its own. */}
      <div
        id="menu-movil"
        data-ground="chamber"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto overscroll-contain transition-opacity duration-500 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav
          aria-label="Principal (móvil)"
          className="gutter flex min-h-full flex-col justify-center py-28"
        >
          <ul className="flex flex-col gap-lg">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="font-serif text-3xl font-light tracking-display text-fg-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
