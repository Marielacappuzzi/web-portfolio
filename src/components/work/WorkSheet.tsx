import Image from "next/image";
import { ActionButton } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import type { Work, WorkKind, WorkStatus } from "@/content/types";

const kindLabels: Record<WorkKind, string> = {
  personal: "Obra personal",
  commission: "Obra por encargo",
  print: "Print",
};

const statusLabels: Record<WorkStatus, string> = {
  available: "Disponible",
  "private-collection": "Colección privada",
  "sold-out": "Agotado",
};

interface WorkSheetProps {
  work: Work;
}

/**
 * The work and its label, side by side.
 *
 * Left, the piece at the width of two thirds of the page; right, the sentence
 * Mariela wrote about it, the specification, and the one action. It replaces a
 * tall portrait plate alone on its screen with the sheet a long way below it —
 * the two things a reader wants together were a scroll apart.
 *
 * The specification carries field names here, which the gallery deliberately
 * does not. In a grid, labels beside ten works are noise; on the piece's own
 * page they are what the reader came to check, and a row of "Técnica" against
 * its value is faster to read than four unlabelled lines.
 *
 * Only what exists is rendered, and nothing marks what does not. El Rescate is
 * unfinished and has no year, technique or dimensions, so its sheet is one row
 * — Original, Obra personal — and stops. It used to close on a "Dato pendiente"
 * marker, which is a note from the build to itself: useful while the catalogue
 * was being filled, and to a visitor just an announcement that something is
 * missing. An absent row says the same thing by saying nothing.
 */
export function WorkSheet({ work }: WorkSheetProps) {
  const rows: [string, string][] = [];

  if (work.technique) rows.push(["Técnica", work.technique]);
  if (work.year) rows.push(["Año", String(work.year)]);
  if (work.dimensions) rows.push(["Dimensiones", work.dimensions]);

  /*
    "Original", not "Categoría".
    On Sueño de Primavera the sheet says "Colección privada" and the block
    below it offers a print — read as a category, that line looks like it
    describes whatever is for sale. Naming the row for the piece it describes
    makes the two unmistakable: the original is in a collection, the edition
    is what is available.
  */
  const category = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
  if (category) rows.push(["Original", category]);

  return (
    /*
      The section's own grid, with no page container around it.

      Held inside the 90rem column the plate came out at 43% of a 1920 screen,
      which is what made the drawing read small. Escaping the container puts it
      at 58% of the viewport and the label at the remaining 42% — seven columns
      against five, with nothing dead between them. The label carries its own
      gutter so it keeps the page's right-hand axis.
    */
    <div className="grid gap-2xl lg:grid-cols-12 lg:items-center lg:gap-x-[4vw]">
      {work.image ? (
        <Reveal variant="image" className="lg:col-span-7">
          {/*
            A wide rectangle, capped at the height of the label beside it.

            4/3 on a phone, where the column is narrow and a band would leave
            the drawing a strip; from `lg` the height is fixed at 30rem and the
            width takes what the column gives it, which is how the plate ends
            up level with the sheet rather than towering over it.

            The cost is real and worth recording: at this height Bajo su
            Protección shows the lioness and not the cub. Its two faces are
            stacked over about 1050px of a 1920px drawing, and a band level
            with a four-row sheet is roughly 570px — the whole subject does not
            fit at this proportion at any focus. The composition entire is in
            the row of three below, which is where it now lives.

            `sheetFocus` is tuned per work against this frame specifically.
          */}
          <div className="group relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[30rem]">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 92vw"
              quality={90}
              className="object-cover transition-transform duration-[900ms] ease-out-quart group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={{ objectPosition: work.sheetFocus ?? work.coverFocus ?? "50% 30%" }}
            />
          </div>
        </Reveal>
      ) : null}

      {/*
        Columns 8 to 12, not 9 to 12.

        It started at 9 and spanned 4, which left column 8 empty between the
        plate and the label — a dead column the layout was paying for twice.
        The label was 33% of the screen and everything in it broke short: the
        technique ran to three lines, the sentence above it to five. At 42% the
        sentence sets in three and the technique in two, and the column reaches
        the height of the plate beside it instead of running past its foot.
      */}
      <div className="gutter lg:col-span-5 lg:col-start-8 lg:pl-0">
        {work.shortStory ? (
          <Reveal>
            <p className="max-w-[48ch] font-serif text-lg font-light leading-snug text-pretty text-fg-strong">
              {work.shortStory}
            </p>
          </Reveal>
        ) : null}

        {rows.length > 0 ? (
          <Reveal delay={120} className="mt-xl">
            <dl className="flex flex-col">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-3xs border-t border-rule py-md last:border-b sm:flex-row sm:items-baseline sm:gap-md"
                >
                  {/*
                    8rem, down from 9. The field names are short — the longest
                    is "Dimensiones" — and every millimetre the label keeps is
                    one the value has to wrap around.
                  */}
                  <dt className="font-sans text-2xs uppercase tracking-label text-fg-muted sm:w-[8rem] sm:shrink-0">
                    {label}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed text-pretty text-fg">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        {work.note ? (
          <Reveal delay={180} className="mt-md">
            <p className="max-w-[48ch] font-sans text-xs leading-relaxed text-fg-muted">
              {work.note}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={210} className="mt-xl">
          <ActionButton href="/encargos#cotizar">Consultar obra</ActionButton>
        </Reveal>
      </div>
    </div>
  );
}
