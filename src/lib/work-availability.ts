import { enquiryIntros, enquiryOptions } from "@/content/pages/availability";
import type { ContactPage, Work } from "@/content/types";

/**
 * Does this work state its availability in a block of its own?
 *
 * Where it does, that block is the only place the page says what can be had:
 * the cover drops the status from beside the title, and the technical sheet
 * drops its Original and Prints rows and its buttons. Saying the same thing in
 * three places is how a page ends up contradicting itself when one of them is
 * updated and the others are not.
 *
 * The test is `prints`, not `status`, and deliberately. When the original of
 * El Rescate sells, its status becomes "sold" while the edition stays
 * available — the block still has something to say, and would disappear if it
 * were keyed on the original being for sale.
 *
 * A work with a `printEdition` is excluded: that is the richer block, with the
 * paper, the edition size, the price and its own ask, and two blocks about the
 * same edition on one page is one too many.
 */
export function hasAvailabilityBlock(work: Work): boolean {
  return Boolean(work.prints) && !work.printEdition;
}

/**
 * The enquiry form, narrowed to what this particular work has.
 *
 * One form definition serves every piece, and left as written it offers the
 * same four answers everywhere — including "La obra original" on Sueño de
 * Primavera, whose original hangs in someone's house. A form that lets
 * someone ask to buy something that cannot be bought is worse than one that
 * does not: they write, they wait, and the answer is no.
 *
 * So the options and the line above them are derived from the work's own two
 * states rather than being set per page. Sueño offers the print and "otra
 * consulta"; El Rescate, whose original and edition are both available,
 * offers all four. When El Rescate's original sells, `status` becomes "sold"
 * and its form loses those two options on its own, with nothing to remember.
 *
 * `otra consulta` is always there. Someone with a question the page did not
 * anticipate should not be turned away by a dropdown.
 */
export function shapeEnquiry(page: ContactPage, work: Work): ContactPage {
  const original = work.status === "available";
  const prints = work.prints === "available";

  const options = [
    original ? enquiryOptions.original : null,
    prints ? enquiryOptions.print : null,
    original && prints ? enquiryOptions.both : null,
    enquiryOptions.other,
  ].filter((option) => option !== null);

  const intro =
    original && prints
      ? enquiryIntros.both
      : prints
        ? enquiryIntros.printOnly
        : enquiryIntros.originalOnly;

  return {
    ...page,
    paragraphs: [intro, ...page.paragraphs.slice(1)],
    fields: page.fields.map((field) =>
      field.name === "interes" ? { ...field, options } : field,
    ),
  };
}
