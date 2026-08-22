"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Mat } from "./Mat";
import { cn } from "@/lib/cn";

interface SilentVideoProps {
  /** Path under /public. Used when a local file exists. */
  src?: string;
  /** Portrait cut for narrow screens, chosen in JS rather than `<source media>`. */
  srcMobile?: string;
  /** YouTube id only, not the full URL. */
  youtubeId?: string;
  /** Still shown before the player mounts and under reduced motion. */
  poster?: string;
  posterMobile?: string;
  /** Describes what is shown, for screen readers. */
  label: string;
  aspect?: string;
  caption?: string;
  bare?: boolean;
  className?: string;
}

/**
 * Video as contemplation, never as an effect: always muted, always looping, no
 * controls and no play button.
 *
 * Players mount lazily. A YouTube iframe costs roughly a megabyte of player
 * before it shows a single frame, so mounting several at page load would make
 * the whole site wait on Google for footage the reader may never scroll to.
 * Until the element is within 600px of the viewport nothing is requested at
 * all: the frame holds a still, and the player appears only on approach. That
 * is what keeps heavy source footage from costing anything up front.
 *
 * Under `prefers-reduced-motion` nothing loads and the still remains.
 */
export function SilentVideo({
  src,
  srcMobile,
  youtubeId,
  poster,
  posterMobile,
  label,
  aspect = "aspect-video",
  caption,
  bare = false,
  className,
}: SilentVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(true);
  const [narrow, setNarrow] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 767px)");

    const apply = () => {
      setStill(motion.matches);
      setNarrow(width.matches);
    };

    apply();
    motion.addEventListener("change", apply);
    width.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      width.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // A generous margin, so the player is ready by the time it is looked at.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeSrc = (narrow && srcMobile) || src;
  const activePoster = (narrow && posterMobile) || poster;
  const play = !still && near;

  const frame = (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-fg-strong/4.5", aspect)}
    >
      {activePoster ? (
        <Image
          src={activePoster}
          alt={label}
          fill
          sizes="(min-width: 640px) 40vw, 100vw"
          quality={90}
          className="object-cover"
        />
      ) : null}

      {play && activeSrc ? (
        <video
          key={activeSrc}
          src={activeSrc}
          poster={activePoster}
          aria-label={label}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : play && youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3`}
          title={label}
          allow="autoplay; encrypted-media"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
        />
      ) : null}

      {/* Nothing loaded yet and no still: name what is about to play. */}
      {!activePoster && !play ? (
        <span className="absolute inset-0 flex items-center justify-center px-md text-center font-sans text-2xs uppercase tracking-label text-fg-faint">
          {label}
        </span>
      ) : null}
    </div>
  );

  return (
    <figure className={cn("w-full", className)}>
      {bare ? frame : <Mat>{frame}</Mat>}
      {caption ? (
        <figcaption className="mt-sm font-sans text-xs text-fg-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
