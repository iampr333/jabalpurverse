import { parse as parseYaml } from "yaml";

export type Bilingual = { en: string; hi: string };

export type FestivalSource = {
  type: string;
  url: string;
  accessed: string;
  published_at?: string;
};

export type FestivalMeta = {
  year: number;
  festivals: Array<{
    id: string;
    name: Bilingual;
    window_start: string;
    window_end: string;
    dates_note?: Bilingual;
  }>;
};

export type Pandal = {
  id: string;
  slug: string;
  year: number;
  festival: string;
  name: Bilingual;
  samiti?: string;
  place_ref?: string;
  coords: [number, number];
  area?: string;
  highlights?: Bilingual;
  schedule?: {
    aarti?: string[];
    darshan_hours?: string;
    special_days?: Array<{ day: string; note: string }>;
  };
  crowd_tip?: Bilingual;
  access_note?: Bilingual;
  family_notes?: Bilingual;
  safety: Bilingual;
  sources: FestivalSource[];
  verified_at?: string | null;
  status: string;
};

export type VisarjanPoint = {
  id: string;
  slug: string;
  year: number;
  name: Bilingual;
  kind: string;
  coords: [number, number];
  area?: string;
  summary: Bilingual;
  eco_note?: Bilingual;
  place_ref?: string;
  sources: FestivalSource[];
  verified_at?: string | null;
  status: string;
};

export type FestivalNotice = {
  id: string;
  slug: string;
  year: number;
  title: Bilingual;
  body: Bilingual;
  kind: string;
  source: FestivalSource;
  valid_from: string;
  valid_to: string;
  status: string;
};

const CURRENT_YEAR = 2026;

const metaModules = import.meta.glob("../../../content/festivals/*/meta.yaml", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const pandalModules = import.meta.glob("../../../content/festivals/*/pandals/*.{yaml,yml}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const visarjanModules = import.meta.glob("../../../content/festivals/*/visarjan/*.{yaml,yml}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const noticeModules = import.meta.glob("../../../content/festivals/*/notices/*.{yaml,yml}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function yearFromPath(p: string): number | null {
  const m = p.match(/festivals\/(\d{4})\//);
  return m ? Number(m[1]) : null;
}

export function loadFestivalMeta(year = CURRENT_YEAR): FestivalMeta | null {
  for (const [pathKey, raw] of Object.entries(metaModules)) {
    if (yearFromPath(pathKey) !== year) continue;
    return parseYaml(raw) as FestivalMeta;
  }
  return null;
}

export function loadPandals(year = CURRENT_YEAR): Pandal[] {
  return Object.entries(pandalModules)
    .filter(([p]) => yearFromPath(p) === year)
    .map(([, raw]) => parseYaml(raw) as Pandal)
    .filter((p) => p.status !== "withdrawn")
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
}

export function getPandalBySlug(slug: string, year = CURRENT_YEAR): Pandal | undefined {
  return loadPandals(year).find((p) => p.slug === slug);
}

/** Featured = published + verified_at for the year. */
export function loadFeaturedPandals(year = CURRENT_YEAR): Pandal[] {
  return loadPandals(year).filter((p) => p.status === "published" && Boolean(p.verified_at));
}

export function loadDraftPandals(year = CURRENT_YEAR): Pandal[] {
  return loadPandals(year).filter((p) => p.status === "draft");
}

export function loadVisarjanPoints(year = CURRENT_YEAR): VisarjanPoint[] {
  return Object.entries(visarjanModules)
    .filter(([p]) => yearFromPath(p) === year)
    .map(([, raw]) => parseYaml(raw) as VisarjanPoint)
    .filter((v) => v.status !== "withdrawn")
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
}

export function loadNotices(year = CURRENT_YEAR, now = new Date()): FestivalNotice[] {
  return Object.entries(noticeModules)
    .filter(([p]) => yearFromPath(p) === year)
    .map(([, raw]) => parseYaml(raw) as FestivalNotice)
    .filter((n) => {
      if (n.status === "expired") return false;
      const to = Date.parse(n.valid_to);
      if (!Number.isNaN(to) && to < now.getTime()) return false;
      return n.status === "published" || n.status === "draft";
    })
    .sort((a, b) => a.valid_from.localeCompare(b.valid_from));
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

export function whatsappShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export { CURRENT_YEAR as UTSAV_YEAR };
