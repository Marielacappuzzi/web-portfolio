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
  /** href of the nav item whose submenu is open, if any. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
            <Image
              src={
                menuOpen
                  ? "/marca/mc-monograma-claro.png"
                  : "/marca/mc-monograma.png"
              }
              alt={name}
              width={500}
              height={menuOpen ? 185 : 218}
              priority
              className="h-8 w-auto md:h-10"
            />
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
        <nav aria-label="Principal (móvil)" className="gutter flex min-h-full flex-col justify-center py-28">
          <ul className="flex flex-col gap-lg">
            {nav.map((item) => {
              const children = navChildren[item.href];

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl font-light tracking-display text-fg-strong"
                  >
                    {item.label}
                  </Link>

                  {/*
                    The catalogue, listed rather than hidden behind a tap.
                    There is no hover on a phone, so a disclosure would be one
                    more thing to discover; the panel is already a page of its
                    own and has the room.
                  */}
                  {children && children.length > 0 ? (
                    <ul className="mt-md flex flex-col gap-2xs border-l border-rule pl-md">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2xs font-serif text-base font-light text-fg transition-colors duration-300 hover:text-fg-strong"
                          >
                            {child.label}
                            {child.editorial ? (
                              <ArrowUpRightIcon className="shrink-0 text-fg-faint" />
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
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
