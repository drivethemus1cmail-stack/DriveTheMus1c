/**
 * Storefront product URL (Gumroad, Payhip, etc.).
 *
 * Leave empty until the listing is live — the buy buttons then just scroll to
 * "What's in the pack" instead of leading to a dead link. Fill it in and every
 * CTA on the site points at checkout.
 *
 * Typed as `string` rather than inferred, so assigning a real URL doesn't
 * narrow the literal type and break the comparisons below.
 */
export const PURCHASE_URL: string = "";

type BuyLink = { href: string; target?: "_blank"; rel?: string };

/** Spread onto any buy CTA: `<a {...buyLinkProps}>` */
export const buyLinkProps: BuyLink = PURCHASE_URL
  ? { href: PURCHASE_URL, target: "_blank", rel: "noopener noreferrer" }
  : { href: "#included" };

export const isStoreLive = PURCHASE_URL !== "";
