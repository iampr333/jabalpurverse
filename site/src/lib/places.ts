import { parse as parseYaml } from "yaml";

export type Bilingual = { en: string; hi: string };

export type PlaceAarti = {
  time_text: string;
  checked_at: string;
  source?: { type?: string; url?: string; accessed?: string };
};

export type Place = {
  id: string;
  slug: string;
  name: Bilingual;
  aliases?: string[];
  category: string;
  tags?: string[];
  coords: [number, number];
  area?: string;
  summary: Bilingual;
  description?: Bilingual;
  status: string;
  river?: "narmada";
  ghat_type?: string[];
  aarti?: PlaceAarti;
  etiquette?: Bilingual;
  river_safety?: Bilingual;
  festival_hubs?: string[];
};

/** Ghat Trail order from BRD §6.22 / Hub plan. */
export const GHAT_TRAIL_ORDER = [
  "gwarighat",
  "uma-ghat",
  "tilwara",
  "lameta",
  "jilheri",
  "saraswati-ghat",
  "bhedaghat",
] as const;

const placeModules = import.meta.glob("../../../content/places/*.{yaml,yml}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function loadPlaces(): Place[] {
  return Object.values(placeModules).map((raw) => parseYaml(raw) as Place);
}

export function loadGhatTrail(): Place[] {
  const bySlug = new Map(loadPlaces().map((p) => [p.slug, p]));
  return GHAT_TRAIL_ORDER.map((slug) => bySlug.get(slug)).filter(
    (p): p is Place => Boolean(p),
  );
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return loadPlaces().find((p) => p.slug === slug);
}

/** Soft heuristic: ~7 pm / 7pm → 19:00 local wall clock (IST editorial). */
export function parseAartiHour(timeText: string): { hour: number; minute: number } | null {
  const m = timeText.match(/\b(\d{1,2})\s*(?::(\d{2}))?\s*(am|pm)\b/i);
  if (!m) return null;
  let hour = Number(m[1]);
  const minute = m[2] ? Number(m[2]) : 0;
  const meridiem = m[3].toLowerCase();
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  return { hour, minute };
}

export function aartiNeedsLocalCheck(place: Place, now = new Date()): boolean {
  if (place.status === "draft") return true;
  if (!place.aarti?.checked_at) return true;
  const checked = Date.parse(`${place.aarti.checked_at}T00:00:00Z`);
  if (Number.isNaN(checked)) return true;
  const ageDays = (now.getTime() - checked) / (1000 * 60 * 60 * 24);
  return ageDays > 180;
}

export function mapsLinks(coords: [number, number], nameEn: string) {
  const [lng, lat] = coords;
  const q = encodeURIComponent(`${nameEn}, Jabalpur`);
  return {
    geo: `geo:${lat},${lng}`,
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`,
    search: `https://www.openstreetmap.org/search?query=${q}`,
  };
}
