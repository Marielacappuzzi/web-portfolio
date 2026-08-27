"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavChild, NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { lockScroll } from "@/lib/smooth-scroll";
import { ArrowUpRightIcon, ChevronDownIcon } from "@/components/primitives/Icon";
import { NavSubmenu } from "./NavSubmenu";
import type { Ground } from "./Section";

interface SiteHeaderProps {
  /** Works listed under "Obra". Keyed by the parent href. */
  navChildren?: Record<string, NavChild[]>;
  nav: NavItem[];
  name: string;
}

/**
 * Fixed header.
 *
 * Always on the paper ground. The MC monogram returns home; "Inicio" is
 * deliberately not a nav item. The monogram swaps to its light version while
 * the mobile menu is open, because the panel behind it turns to chamber.
 */
export function SiteHeader({
  nav,
  name,
  navChildren = {},
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openBranch, setOpenBranch] = useState<string | null>(null);
  /** href of the nav item whose submenu is open, if any. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /*
    Close on tap rather than on the route changing. The panel used to stay up
    after a link was followed, with the page already changed underneath it.
    Doing it here rather than in an effect keyed on the pathname avoids the
    cascading render React warns about, and it closes on the gesture rather
    than a beat later.
  */
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenBranch(null);
  };

  /*
    PageTransition intercepts link clicks in the capture phase and stops them
    propagating, so React never sees them and the onClick below never ran —
    the panel stayed open over a page that had already changed. It dispatches
    this instead, which carries past the stopped bubble.
  */
  useEffect(() => {
    const onNavigate = () => {
      setMenuOpen(false);
      setOpenBranch(null);
    };

    document.addEventListener("site:navigate", onNavigate);
    return () => document.removeEventListener("site:navigate", onNavigate);
  }, []);

  /*
    Close when the reader starts scrolling the page behind the panel. An
    anchor link inside the menu moves the page without changing the route, so
    no navigation event fires — the panel would sit over the section it had
    just scrolled to. Threshold rather than any movement, so a stray touch
    while reading the menu does not dismiss it.
  */
  useEffect(() => {
    if (!menuOpen) return;

    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > 40) closeMenu();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

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
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                const children = navChildren[item.href];
                const hasChildren = Boolean(children && children.length > 0);
                const open = openMenu === item.href;
                const triggerId = `nav-${item.href.replace(/W+/g, "-")}`;

                return (
                  <li
                    key={item.href}
                    className={cn(hasChildren && "relative")}
                    onMouseEnter={
                      hasChildren ? () => setOpenMenu(item.href) : undefined
                    }
                    onMouseLeave={hasChildren ? () => setOpenMenu(null) : undefined}
                    /*
                     * Keyboard opens the panel too: focus moving into the item
                     * or any of its links keeps it open, and moving out of the
                     * whole subtree closes it. Without this the submenu would
                     * be reachable only with a pointer.
                     */
                    onFocus={hasChildren ? () => setOpenMenu(item.href) : undefined}
                    onBlur={
                      hasChildren
                        ? (event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                              setOpenMenu(null);
                            }
                          }
                        : undefined
                    }
                  >
                    <Link
                      id={triggerId}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasChildren ? open : undefined}
                      className={cn(
                        "group relative block py-1 font-sans text-sm transition-colors duration-300",
                        active ? "text-fg-strong" : "text-fg hover:text-fg-strong",
                      )}
                    >
                      <span className="relative inline-flex items-center gap-1">
                        {item.label}

                        {/*
                          The chevron says the label opens something. It sits
                          inside the same span as the text so the hover rule
                          below underlines the pair, not the word alone.
                        */}
                        {hasChildren ? (
                          <ChevronDownIcon
                            className={cn(
                              "transition-transform duration-300 ease-out-quart",
                              open ? "rotate-180" : "rotate-0",
                            )}
                          />
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-out-quart",
                          active || open
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>

                    {hasChildren ? (
                      <NavSubmenu
                        items={children!}
                        labelledBy={triggerId}
                        open={open}
                      />
                    ) : null}
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
            {nav.map((item) => {
              const children = navChildren[item.href];
              const hasChildren = Boolean(children && children.length > 0);
              const branchOpen = openBranch === item.href;

              return (
                <li key={item.href}>
                  <div className="flex items-center justify-between gap-md">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="font-serif text-3xl font-light tracking-display text-fg-strong"
                    >
                      {item.label}
                    </Link>

                    {/*
                      A separate control, not a link. Tapping the word should
                      go to the gallery; tapping the arrow should open the list
                      — one target cannot do both, and merging them means every
                      reader who wants /obra has to close a panel first.
                    */}
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenBranch(branchOpen ? null : item.href)
                        }
                        aria-expanded={branchOpen}
                        aria-label={`${branchOpen ? "Ocultar" : "Mostrar"} las obras`}
                        className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-fg"
                      >
                        <ChevronDownIcon
                          width={18}
                          height={18}
                          className={cn(
                            "transition-transform duration-400 ease-in-out-quart",
                            branchOpen ? "rotate-180" : "rotate-0",
                          )}
                        />
                      </button>
                    ) : null}
                  </div>

                  {/*
                    Collapsed to nothing rather than hidden: a 1fr/0fr grid row
                    animates to the list’s own height, so it opens smoothly
                    without anyone hard-coding a max-height that will be wrong
                    the day a work is added.
                  */}
                  {hasChildren ? (
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-in-out-quart",
                        "motion-reduce:transition-none",
                        branchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <ul className="overflow-hidden">
                        <li className="h-md" aria-hidden="true" />
                        {children!.map((child) => (
                          <li key={child.href} className="border-l border-rule pl-md">
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              className="flex items-center gap-2xs py-2xs font-serif text-base font-light text-fg"
                            >
                              {child.label}
                              {child.editorial ? (
                                <ArrowUpRightIcon className="shrink-0 text-fg-faint" />
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
