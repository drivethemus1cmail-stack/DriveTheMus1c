export const SUPPORT_EMAIL = "drivethemus1cmail@gmail.com";

export type Track = {
  id: string;
  title: string;
  /** Artists, in billing order. */
  artists: string;
  album: string;
  year: string;
  /** Path under public/audio/ */
  file: string;
  /** Cover under public/art/, square. */
  art?: string;
  /** Streaming link for the Save action. */
  spotify?: string;
};

export const INSTAGRAM_URL = "https://www.instagram.com/drivethemus1c/";

export const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/67pRRvppBtBYqkUVVCJCSt";

const SPOTIFY_TRACK = "https://open.spotify.com/track/";

/**
 * The player queue — Des1's Spotify catalogue. Adding a track is a data edit:
 * drop the mp3 into public/audio/, the square cover into public/art/, and add
 * an entry here. The first entry always plays first; with shuffle on (the
 * default) the rest follow in a random order.
 */
export const TRACKS: Track[] = [
  {
    id: "southside",
    title: "SOUTHSIDE",
    artists: "Des1, Yoniii",
    album: "THE VAULT 1.0",
    year: "2026",
    file: "southside-demo.mp3",
    art: "southside.jpg",
    spotify: `${SPOTIFY_TRACK}3JHom2BG9jjsNReG3LcpHf`,
  },
  {
    id: "wreck",
    title: "Wreck",
    artists: "Des1",
    album: "Wreck",
    year: "2026",
    file: "wreck.mp3",
    art: "wreck.jpg",
    spotify: `${SPOTIFY_TRACK}5jexKaAuzCFDGiSd8g3Unq`,
  },
  {
    id: "hitafterhit",
    title: "HitAfterHit",
    artists: "Des1",
    album: "THE VAULT 1.0",
    year: "2026",
    file: "hitafterhit.mp3",
    art: "the-vault-1.jpg",
    spotify: `${SPOTIFY_TRACK}3dXIOC4BG2ye3xyru73YFg`,
  },
  {
    id: "great-day",
    title: "Great Day",
    artists: "Des1",
    album: "Great Day",
    year: "2026",
    file: "great-day.mp3",
    art: "great-day.jpg",
    spotify: `${SPOTIFY_TRACK}72nDEKtdUuZDDU2o5skuPm`,
  },
  {
    id: "back-in",
    title: "Back In",
    artists: "Des1",
    album: "Back In",
    year: "2026",
    file: "back-in.mp3",
    art: "back-in.jpg",
    spotify: `${SPOTIFY_TRACK}05wZa6zSHEWB6OO3R0GUl9`,
  },
  {
    id: "not-enough",
    title: "Not Enough",
    artists: "Des1",
    album: "THE VAULT 1.0",
    year: "2026",
    file: "not-enough.mp3",
    art: "the-vault-1.jpg",
    spotify: `${SPOTIFY_TRACK}6dekT1sqtPRH2cCP9JylPZ`,
  },
  {
    id: "dont-turn-into-a-fein",
    title: "DontTurnIntoAFein",
    artists: "Des1",
    album: "THE VAULT 1.0",
    year: "2026",
    file: "dont-turn-into-a-fein.mp3",
    art: "the-vault-1.jpg",
    spotify: `${SPOTIFY_TRACK}5sayk8GtH17BgHrRhW97O7`,
  },
  {
    id: "last-day",
    title: "Last Day",
    artists: "Des1",
    album: "Dont Wait",
    year: "2026",
    file: "last-day.mp3",
    art: "dont-wait-ep.jpg",
    spotify: `${SPOTIFY_TRACK}4DHZa9MxjDfEfJrXpunUq4`,
  },
  {
    id: "dont-wait",
    title: "Dont Wait",
    artists: "Des1",
    album: "Dont Wait",
    year: "2026",
    file: "dont-wait.mp3",
    art: "dont-wait-ep.jpg",
    spotify: `${SPOTIFY_TRACK}7kdcTBGMFGxyHRmAlrB0Im`,
  },
  {
    id: "all-day",
    title: "All Day",
    artists: "Des1",
    album: "Dont Wait",
    year: "2026",
    file: "all-day.mp3",
    art: "dont-wait-ep.jpg",
    spotify: `${SPOTIFY_TRACK}1oRsgf9WdEADGLQ1jnlyeb`,
  },
];

export function trackUrl(track: Track) {
  return `${import.meta.env.BASE_URL}audio/${track.file}`;
}

export function artUrl(track: Track) {
  return track.art ? `${import.meta.env.BASE_URL}art/${track.art}` : null;
}

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
export const PURCHASE_URL: string = "https://payhip.com/b/flZ2C";

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
  duration: string;
  blurb: string;
  /** Cal.com booking link. Empty falls back to an email enquiry. */
  url: string;
};

const CAL = "https://cal.com/drivethemus1c";

export const SERVICES: Service[] = [
  {
    id: "quick-fix",
    name: "Quick Fix Call",
    price: "$30",
    duration: "30 min",
    blurb: "Short troubleshooting session for one specific issue — no signal, latency, a routing problem you can't crack.",
    url: `${CAL}/quick-fix-call`,
  },
  {
    id: "studio-setup",
    name: "Beginner Studio Setup Call",
    price: "$50",
    duration: "60 min",
    blurb: "FL Studio settings, mic and interface, MIDI, plugins, vocal routing, exporting, and keeping your projects organised.",
    url: `${CAL}/beginner-studio-setup-call`,
  },
  {
    id: "first-song",
    name: "First Song Setup Session",
    price: "$75",
    duration: "90 min",
    blurb: "Complete setup and recording workflow for your first song, start to finish.",
    url: `${CAL}/first-song-setup-session`,
  },
  {
    id: "in-person",
    name: "In-Person Studio Setup",
    price: "$100",
    duration: "2 hours",
    blurb: "Santa Cruz–area studio or equipment setup, done in the room with you.",
    url: `${CAL}/in-person-studio-setup-santa-cruz-area`,
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
