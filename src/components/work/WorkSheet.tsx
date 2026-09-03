import Image from "next/image";
import { ActionButton, QuietLink } from "@/components/primitives/ActionLink";
import { Reveal } from "@/components/primitives/Reveal";
import type { PrintStatus, Work, WorkKind, WorkStatus } from "@/content/types";

const kindLabels: Record<WorkKind, string> = {
  personal: "Obra personal",
  commission: "Obra por encargo",
  print: "Print",
};

const printLabels: Record<PrintStatus, string> = {
  available: "Disponibles",
  "sold-out": "Agotados",
};

const statusLabels: Record<WorkStatus, string> = {
  "in-progress": "En proceso",
  available: "Disponible",
  sold: "Vendida",
  "private-collection": "Colección privada",
  "sold-out": "Agotada",
};

interface WorkSheetProps {
  work: Work;
}

/**
 * The work and its label, side by side.
 *
 * Left, the piece at the width of two thirds of the page; right, the sentence
 * Mariela wrote about it and the specification. It replaces a tall portrait
 * plate alone on its screen with the sheet a long way below it — the two things
 * a reader wants together were a scroll apart.
 *
 * The asks are state-driven, and there are up to three: the original, the
 * edition, and a commission. Each of the first two appears only when that
 * thing can actually be had — a piece in a private collection offers neither,
 * and the page closes on the commission instead. This is the whole of what a
 * reader can do about a work, and it sits with the sheet that told them what
 * the work is.
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
  const originalForSale = work.status === "available";
  const printsForSale = work.prints === "available";

  const rows: [string, string][] = [];

  if (work.technique) rows.push(["Técnica", work.technique]);
  if (work.year) rows.push(["Año", String(work.year)]);
  if (work.dimensions) rows.push(["Dimensiones", work.dimensions]);

  /*
    Two rows, because there are two things and they sell separately.

    A work is a unique piece, and it may also have an edition of prints. The
    original of Sueño de Primavera is in a private collection while its
    edition still has a copy left — one line could not say that, and read as a
    category it made "Colección privada" look like it described whatever was
    for sale. Naming each row for the thing it describes settles it, and
    "vendida · disponibles" becomes expressible.

    Either row is omitted when its state is not known. Nothing is guessed.
  */
  const original = [
    work.kind ? kindLabels[work.kind] : undefined,
    work.status ? statusLabels[work.status] : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
  if (original) rows.push(["Original", original]);

  if (work.prints) {
    rows.push([
      "Prints",
      work.printEdition
        ? `Edición limitada · ${printLabels[work.prints]}`
        : printLabels[work.prints],
    ]);
  }

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
            The drawing whole, in its own proportion.

            This was a wide rectangle — 4/3 on a phone, a fixed 30rem band from
            `lg` — cropped to sit level with the sheet beside it. All three of
            these works are portrait, between 0.56 and 0.72, so a landscape
            frame cut every one of them: Bajo su Protección showed the lioness
            and not the cub, because two faces stacked over 1050px of a 1920px
            drawing do not fit a 570px band at any focus. The client asked for
            the original vertical, uncropped, and it is the right call — this
            plate is the work, and the work was being cut to fit its label.

            Intrinsic width and height with `max-h`/`w-auto`, so the browser
            scales the whole thing down instead of filling a box with part of
            it. The cap is what keeps a 0.56 portrait from running past the
            screen; on a phone the column binds first and the cap never
            applies. Centred in its seven columns, since a portrait no longer
            fills them.

            No hover zoom here any more. It was a crop effect, and the point of
            this frame is that nothing is cropped.

            `sheetFocus` is now unused by this component. It stays in the data
            for the gallery, which still crops.
          */}
          <div className="flex justify-center">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              width={work.image.width}
              height={work.image.height}
              sizes="(min-width: 1024px) 42vw, 92vw"
              quality={90}
              className="h-auto max-h-[78svh] w-auto max-w-full"
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

        {/*
          Up to three asks, and each one only if it is true.

          "Consultar obra" used to sit here on every work and point at the
          commission form — on eight pieces in private collections and on one
          being drawn, which invites an enquiry after something that cannot be
          had. Now the original and the edition each get their own button when
          they are available, and both go to the enquiry form at the foot of
          this page with the right question already selected. The commission
          keeps its own route and its own form.
        */}
        {originalForSale || printsForSale ? (
          <Reveal delay={210} className="mt-xl flex flex-col items-start gap-md">
            {originalForSale ? (
              <ActionButton href="#consultar-original">
                Consultar por la obra original
              </ActionButton>
            ) : null}

            {printsForSale ? (
              <ActionButton href="#consultar-print">
                Consultar por la edición
              </ActionButton>
            ) : null}

            <QuietLink href="/encargos#cotizar" className="mt-2xs">
              Quiero un encargo
            </QuietLink>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
