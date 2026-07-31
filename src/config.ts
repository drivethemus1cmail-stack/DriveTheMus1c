export const SUPPORT_EMAIL = "drivethemus1cmail@gmail.com";

/**
 * Storefront product URL for the template pack (Payhip).
 *
 * Leave empty until the listing is live — the buy buttons then scroll to
 * "What's in the pack" instead of dead-ending. Fill it in and every pack CTA
 * points at checkout.
 *
 * Typed as `string` rather than inferred, so assigning a real URL doesn't
 * narrow the literal type and break the comparisons below.
 */
export const PURCHASE_URL: string = "";

export const PACK_PRICE = "$15";

type BuyLink = { href: string; target?: "_blank"; rel?: string };

/** Spread onto any pack CTA: `<a {...buyLinkProps}>` */
export const buyLinkProps: BuyLink = PURCHASE_URL
  ? { href: PURCHASE_URL, target: "_blank", rel: "noopener noreferrer" }
  : { href: "#included" };

export const isStoreLive = PURCHASE_URL !== "";

export type Service = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  /** Stripe/Payhip checkout link. Empty falls back to an email enquiry. */
  url: string;
};

export const SERVICES: Service[] = [
  {
    id: "quick-fix",
    name: "Quick Fix Call",
    price: "$30",
    blurb: "Short troubleshooting session for one specific issue — no signal, latency, a routing problem you can't crack.",
    url: "",
  },
  {
    id: "studio-setup",
    name: "Beginner Studio Setup Call",
    price: "$50",
    blurb: "FL Studio settings, mic and interface, MIDI, plugins, vocal routing, exporting, and keeping your projects organised.",
    url: "",
  },
  {
    id: "first-song",
    name: "First Song Setup Session",
    price: "$75",
    blurb: "Complete setup and recording workflow for your first song, start to finish.",
    url: "",
  },
  {
    id: "in-person",
    name: "Local In-Person Setup",
    price: "$100–$150",
    blurb: "Santa Cruz–area studio or equipment setup, done in the room with you.",
    url: "",
  },
];

/**
 * Booking link for a service. Until checkout links exist, this opens a
 * pre-filled email so sessions are still bookable rather than dead.
 */
export function serviceLinkProps(service: Service): BuyLink {
  if (service.url) {
    return { href: service.url, target: "_blank", rel: "noopener noreferrer" };
  }
  const subject = encodeURIComponent(`${service.name} (${service.price})`);
  const body = encodeURIComponent(
    `Hi, I'd like to book the ${service.name}.\n\nWhat I'm stuck on:\n\nMy DAW / FL Studio version:\nMy audio interface:\nMy operating system:\n`,
  );
  return { href: `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}` };
}
