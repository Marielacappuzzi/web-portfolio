import Image from "next/image";
import { Container } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { VideoPlayer } from "@/components/primitives/VideoPlayer";
import type { WorkBlock, WorkImage } from "@/content/types";
import { cn } from "@/lib/cn";

interface WorkCompositionProps {
  blocks: WorkBlock[];
}

/**
 * The body of a flagship work's page, composed from its own sequence.
 *
 * The three pages used to be one fixed run of sections — story, then details,
 * then framed, then process, then the sheet — so each arrived in the same
 * order at the same size whatever it had to show. A piece with one photograph
 * and a piece with seven were laid out identically, and the result read as a
 * template rather than as three works.
 *
 * Here the page is a list of blocks the work declares, and scale is what
 * carries the rhythm: a bleed against a column, a pair against a single, a
 * portrait against a band. Nothing decides the order but the content.
 *
 * Two rules the composition holds to:
 *
 *  · No photograph is ever cropped unless a block asks for it. Every plate
 *    takes its aspect from the file's own pixels, so a drawing Mariela framed
 *    at 100 x 70 is never re-framed by a layout.
 *  · Nothing above the fold is lazy and nothing below it is eager. The hero
 *    is the page's own concern; from here down every picture waits.
 */
export function WorkComposition({ blocks }: WorkCompositionProps) {
  if (blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-3xl md:gap-4xl">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */

/** A photograph at its own proportion, unless the block forces one. */
function Plate({
  image,
  sizes,
  aspect,
  focus,
  bleed = false,
  priority = false,
}: {
  image: WorkImage;
  sizes: string;
  aspect?: string;
  focus?: string;
  /** True only for a plate that runs edge to edge — see the caption note. */
  bleed?: boolean;
  priority?: boolean;
}) {
  const caption = image.caption ? (
    <figcaption className="mt-sm font-sans text-xs text-fg-muted">
      {image.caption}
    </figcaption>
  ) : null;

  return (
    <figure className="group">
      <div
        className={cn("relative w-full overflow-hidden", aspect)}
        style={
          aspect ? undefined : { aspectRatio: `${image.width} / ${image.height}` }
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={90}
          loading={priority ? "eager" : "lazy"}
          /*
            The picture comes closer inside a frame that does not move. The
            wrapper owns `overflow-hidden`, so nothing leaves its opening and
            the layout never shifts under the pointer.
          */
          className="object-cover transition-transform duration-[900ms] ease-out-quart group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </div>

      {/*
        The caption sits where its picture starts.

        Only a bleeding plate needs the page gutter under it — it has no
        margin of its own, so its caption would otherwise begin at the very
        edge of the screen. Every other plate is already inside a container,
        and wrapping the caption in a second one pushed it to the page's left
        margin instead of the image's: in a row of three, all three captions
        lined up under the first picture.
      */}
      {caption && bleed ? <Container width="wide">{caption}</Container> : caption}
    </figure>
  );
}

function Block({ block }: { block: WorkBlock }) {
  if (block.kind === "text") {
    return (
      <Container width="wide">
        <Reveal>
          {/*
            Offset into the grid rather than centred. A reading column that
            starts at the left margin reads as a caption to whatever is above
            it; set in from the third column it reads as its own movement.
          */}
          <div className="lg:ml-[25%] lg:max-w-[46rem]">
            <div className="flex flex-col gap-md">
              {block.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="max-w-[62ch] font-sans text-base leading-relaxed text-pretty text-fg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    );
  }

  if (block.kind === "video") {
    const many = block.videos.length > 1;

    return (
      <Container width="wide">
        <ul
          className={cn(
            "grid gap-xl",
            many ? "sm:grid-cols-2 sm:gap-x-[3vw]" : "max-w-[34rem]",
          )}
        >
          {block.videos.map((video) => (
            <li key={video.src}>
              <Reveal variant="image">
                <VideoPlayer
                  src={video.src}
                  poster={video.poster}
                  label={video.label}
                  caption={video.caption}
                  aspect={video.portrait ? "aspect-[9/16]" : "aspect-video"}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  if (block.kind === "trio") {
    /*
      Three across on a wide screen, stacked on a phone. A shared 4/5 frame
      here on purpose — this is the one block where the pictures are meant to
      be read as a set, and native proportions would make three different
      heights out of what is supposed to be one row.
    */
    return (
      <Container width="wide">
        <ul className="grid grid-cols-1 gap-xl sm:grid-cols-3 sm:gap-x-[2vw]">
          {block.images.map((image, i) => (
            <li key={image.src}>
              <Reveal variant="image" delay={i * 100}>
                <Plate
                  image={image}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 640px) 31vw, 92vw"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    );
  }

  if (block.kind === "duo") {
    /*
      Asymmetric by default is the point of this block: two pictures at the
      same width read as a grid, and a grid is what the brief asks the page
      to stop being. `even` exists for the case where they genuinely pair.
    */
    const columns =
      block.weight === "left"
        ? ["md:col-span-7", "md:col-span-5 md:mt-2xl"]
        : block.weight === "right"
          ? ["md:col-span-5 md:mt-2xl", "md:col-span-7"]
          : ["md:col-span-6", "md:col-span-6"];

    return (
      <Container width="wide">
        <div className="grid gap-xl md:grid-cols-12 md:gap-x-[3vw]">
          {block.images.map((image, i) => (
            <Reveal
              key={image.src}
              variant="image"
              delay={i * 120}
              className={columns[i]}
            >
              <Plate
                image={image}
                sizes="(min-width: 768px) 46vw, 92vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    );
  }

  /* A single plate, at one of three scales. */
  const scale = block.scale ?? "wide";

  if (scale === "bleed") {
    return (
      <Reveal variant="image">
        <Plate
          image={block.image}
          aspect={block.aspect}
          focus={block.focus}
          sizes="100vw"
          bleed
        />
      </Reveal>
    );
  }

  if (scale === "column") {
    return (
      <Container width="wide">
        <div className="grid md:grid-cols-12">
          <Reveal
            variant="image"
            className={cn(
              "md:col-span-7",
              block.align === "right" ? "md:col-start-6" : "md:col-start-1",
            )}
          >
            <Plate
              image={block.image}
              aspect={block.aspect}
              focus={block.focus}
              sizes="(min-width: 768px) 58vw, 92vw"
            />
          </Reveal>
        </div>
      </Container>
    );
  }

  return (
    <Container width="wide">
      <Reveal variant="image">
        <Plate
          image={block.image}
          aspect={block.aspect}
          focus={block.focus}
          sizes="(min-width: 1024px) 90vw, 92vw"
        />
      </Reveal>
    </Container>
  );
}
