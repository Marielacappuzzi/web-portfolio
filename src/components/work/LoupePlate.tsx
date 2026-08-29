"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { LoupeIcon } from "@/components/primitives/Icon";
import { Mat } from "@/components/primitives/Mat";
import type { WorkImage } from "@/content/types";

interface LoupePlateProps {
  image: WorkImage;
  /** Loads eagerly: this is the first thing the panel shows. */
  priority?: boolean;
}

/** How far in the glass goes. Enough to read a stroke, short of pixelation. */
const ZOOM = 2.2;

/**
 * The plate, with a glass over it.
 *
 * A charcoal is a surface of marks, and the whole argument of the work lives
 * at a scale a fitted image cannot show: the lace thread by thread, the grain
 * where the paper takes the stick. This lets a visitor look into it without
 * leaving the panel — the pointer moves, the picture moves under it, and the
 * moment the pointer leaves it is a plate again.
 *
 * It magnifies by moving `background-position` on a layer above the image
 * rather than scaling the image itself. A transform would need a wrapper with
 * `overflow: hidden` and would still resample the same displayed pixels; the
 * background layer requests the large file straight from the optimiser, so
 * what appears under the glass is real detail rather than a blur.
 *
 * Touch gets nothing. A finger has no hover, so a magnifier there either
 * fights the scroll or hijacks the tap that closes the panel — on a phone the
 * plate stays a plate, and the thumbnails do the work of showing more.
 */
export function LoupePlate({ image, priority }: LoupePlateProps) {
  const frame = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<string | null>(null);

  const track = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    /* Pen and mouse only — a coarse pointer never enters the glass. */
    if (event.pointerType === "touch") return;

    const box = frame.current?.getBoundingClientRect();
    if (!box) return;

    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }, []);

  const release = useCallback(() => setOrigin(null), []);

  return (
    <Mat className="w-fit">
      <div
        ref={frame}
        onPointerMove={track}
        onPointerLeave={release}
        className="group relative cursor-zoom-in touch-pan-y"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          quality={92}
          sizes="(min-width: 1024px) 60vw, 92vw"
          className="h-auto max-h-[48vh] w-auto max-w-full object-contain sm:max-h-[60vh] lg:max-h-[68vh]"
          priority={priority}
        />

        {/*
          The glass. Absent from the tree until a fine pointer is over the
          plate, so it costs nothing on touch and never sits between a click
          and the image underneath.
        */}
        {origin ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: `${ZOOM * 100}%`,
              backgroundPosition: origin,
            }}
          />
        ) : null}

        {/*
          The invitation. A mark in the corner that fades out once the glass is
          in use — by then the gesture has been understood and the icon is only
          something else on top of the drawing.
        */}
        <div
          aria-hidden
          className={`pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/55 text-fg-strong transition-opacity duration-300 motion-reduce:transition-none ${
            origin ? "opacity-0" : "opacity-70 group-hover:opacity-100"
          }`}
        >
          <LoupeIcon width={15} height={15} />
        </div>
      </div>
    </Mat>
  );
}
