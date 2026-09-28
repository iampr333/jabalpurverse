/** Place-specific Commons photos only — never borrow another ghat’s image. */

export type GhatShot = {
  src: string;
  position: string;
};

export type GhatMedia = {
  /** Omit when no Commons photo of this ghat exists. */
  hero?: GhatShot;
  chapter?: GhatShot;
  aarti?: GhatShot;
  extra?: GhatShot;
};

const A = "/images/atmosphere";

/**
 * Media is keyed by slug. Only files labeled as that place on Commons.
 * Uma Ghat & Jilheri: no Commons photos found — pages use solid river chrome.
 */
export const GHAT_MEDIA: Record<string, GhatMedia> = {
  gwarighat: {
    hero: { src: `${A}/gwarighat-mass-aarti.jpg`, position: "center 42%" },
    chapter: { src: `${A}/gwarighat-river.jpg`, position: "center 40%" },
    aarti: { src: `${A}/gwarighat-priest-aarti.jpg`, position: "72% center" },
  },
  "uma-ghat": {},
  tilwara: {
    hero: { src: `${A}/tilwara-narmada-river.jpg`, position: "center 45%" },
    chapter: { src: `${A}/tilwara-gandhi-ashes.jpg`, position: "center 40%" },
  },
  lameta: {
    hero: { src: `${A}/lameta-beohar-temples.jpg`, position: "center 40%" },
    chapter: { src: `${A}/lameta-beohar-temples.jpg`, position: "center 65%" },
  },
  jilheri: {},
  "saraswati-ghat": {
    hero: { src: `${A}/saraswati-ghat-narmada.jpg`, position: "center 52%" },
    chapter: { src: `${A}/saraswati-ghat-2.jpg`, position: "center 45%" },
    extra: { src: `${A}/saraswati-ghat-3.jpg`, position: "center 40%" },
  },
  bhedaghat: {
    hero: { src: `${A}/marble-rocks-bhedaghat.jpg`, position: "center 55%" },
    chapter: { src: `${A}/bhedaghat-gorge.jpg`, position: "center 42%" },
    extra: { src: `${A}/bhedaghat-yogini.jpg`, position: "center 35%" },
  },
};

export function getGhatMedia(slug: string): GhatMedia {
  return GHAT_MEDIA[slug] ?? {};
}
