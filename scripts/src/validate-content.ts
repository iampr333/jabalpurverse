import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { placeSchema } from "./schema/place.js";
import {
  festivalMetaSchema,
  festivalNoticeSchema,
  pandalSchema,
  visarjanPointSchema,
} from "./schema/festival.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const placesDir = path.join(root, "content/places");
const festivalsRoot = path.join(root, "content/festivals");

async function yamlFiles(dir: string): Promise<string[]> {
  try {
    return (await readdir(dir)).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  } catch {
    return [];
  }
}

async function validatePlaces(errors: string[]): Promise<number> {
  const files = await yamlFiles(placesDir);
  if (!files.length) {
    console.log("No content/places yet — OK for empty scaffold.");
    return 0;
  }

  const slugs = new Set<string>();
  for (const file of files) {
    const full = path.join(placesDir, file);
    const raw = await readFile(full, "utf8");
    let data: unknown;
    try {
      data = parseYaml(raw);
    } catch (e) {
      errors.push(`${file}: YAML parse error — ${(e as Error).message}`);
      continue;
    }

    const parsed = placeSchema.safeParse(data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        errors.push(`${file}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
      }
      continue;
    }

    const place = parsed.data;
    if (slugs.has(place.slug)) {
      errors.push(`${file}: duplicate slug "${place.slug}"`);
    }
    slugs.add(place.slug);
  }
  return files.length;
}

async function validateFestivals(errors: string[]): Promise<{
  years: number;
  pandals: number;
  visarjan: number;
  notices: number;
}> {
  let years = 0;
  let pandals = 0;
  let visarjan = 0;
  let notices = 0;

  let yearDirs: string[] = [];
  try {
    yearDirs = (await readdir(festivalsRoot, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && /^\d{4}$/.test(d.name))
      .map((d) => d.name);
  } catch {
    return { years: 0, pandals: 0, visarjan: 0, notices: 0 };
  }

  for (const year of yearDirs) {
    years += 1;
    const yearDir = path.join(festivalsRoot, year);
    const metaPath = path.join(yearDir, "meta.yaml");
    try {
      const metaRaw = await readFile(metaPath, "utf8");
      const metaData = parseYaml(metaRaw);
      const meta = festivalMetaSchema.safeParse(metaData);
      if (!meta.success) {
        for (const issue of meta.error.issues) {
          errors.push(`festivals/${year}/meta.yaml: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
        }
      } else if (meta.data.year !== Number(year)) {
        errors.push(`festivals/${year}/meta.yaml: year field must match folder ${year}`);
      }
    } catch {
      errors.push(`festivals/${year}/meta.yaml: missing or unreadable`);
    }

    const pandalDir = path.join(yearDir, "pandals");
    const pandalSlugs = new Set<string>();
    for (const file of await yamlFiles(pandalDir)) {
      pandals += 1;
      const full = path.join(pandalDir, file);
      const rel = `festivals/${year}/pandals/${file}`;
      let data: unknown;
      try {
        data = parseYaml(await readFile(full, "utf8"));
      } catch (e) {
        errors.push(`${rel}: YAML parse error — ${(e as Error).message}`);
        continue;
      }
      const parsed = pandalSchema.safeParse(data);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          errors.push(`${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
        }
        continue;
      }
      if (parsed.data.year !== Number(year)) {
        errors.push(`${rel}: year must be ${year}`);
      }
      if (pandalSlugs.has(parsed.data.slug)) {
        errors.push(`${rel}: duplicate pandal slug "${parsed.data.slug}"`);
      }
      pandalSlugs.add(parsed.data.slug);
    }

    const visarjanDir = path.join(yearDir, "visarjan");
    const vSlugs = new Set<string>();
    for (const file of await yamlFiles(visarjanDir)) {
      visarjan += 1;
      const full = path.join(visarjanDir, file);
      const rel = `festivals/${year}/visarjan/${file}`;
      let data: unknown;
      try {
        data = parseYaml(await readFile(full, "utf8"));
      } catch (e) {
        errors.push(`${rel}: YAML parse error — ${(e as Error).message}`);
        continue;
      }
      const parsed = visarjanPointSchema.safeParse(data);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          errors.push(`${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
        }
        continue;
      }
      if (parsed.data.year !== Number(year)) {
        errors.push(`${rel}: year must be ${year}`);
      }
      if (vSlugs.has(parsed.data.slug)) {
        errors.push(`${rel}: duplicate visarjan slug "${parsed.data.slug}"`);
      }
      vSlugs.add(parsed.data.slug);
    }

    const noticesDir = path.join(yearDir, "notices");
    const nSlugs = new Set<string>();
    for (const file of await yamlFiles(noticesDir)) {
      notices += 1;
      const full = path.join(noticesDir, file);
      const rel = `festivals/${year}/notices/${file}`;
      let data: unknown;
      try {
        data = parseYaml(await readFile(full, "utf8"));
      } catch (e) {
        errors.push(`${rel}: YAML parse error — ${(e as Error).message}`);
        continue;
      }
      const parsed = festivalNoticeSchema.safeParse(data);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          errors.push(`${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`);
        }
        continue;
      }
      if (parsed.data.year !== Number(year)) {
        errors.push(`${rel}: year must be ${year}`);
      }
      if (nSlugs.has(parsed.data.slug)) {
        errors.push(`${rel}: duplicate notice slug "${parsed.data.slug}"`);
      }
      nSlugs.add(parsed.data.slug);
    }
  }

  return { years, pandals, visarjan, notices };
}

async function main() {
  const errors: string[] = [];
  const placeCount = await validatePlaces(errors);
  const fest = await validateFestivals(errors);

  if (errors.length) {
    console.error("Content validation failed:\n");
    for (const e of errors) console.error(`  • ${e}`);
    process.exit(1);
  }

  console.log(`Validated ${placeCount} place file(s). OK.`);
  if (fest.years) {
    console.log(
      `Validated festivals: ${fest.years} year(s), ${fest.pandals} pandal(s), ${fest.visarjan} visarjan point(s), ${fest.notices} notice(s). OK.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
