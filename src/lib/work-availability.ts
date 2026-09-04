import type { Work } from "@/content/types";

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
