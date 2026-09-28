import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { placeSchema } from "./schema/place.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const placesDir = path.join(root, "content/places");

async function main() {
  const errors: string[] = [];
  const slugs = new Set<string>();

  let files: string[] = [];
  try {
    files = (await readdir(placesDir)).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  } catch {
    console.log("No content/places yet — OK for empty scaffold.");
    return;
  }

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
    if (place.id !== place.slug && place.id !== path.basename(file, path.extname(file))) {
      // id may differ from filename; slug uniqueness is the hard rule
    }
  }

  if (errors.length) {
    console.error("Content validation failed:\n");
    for (const e of errors) console.error(`  • ${e}`);
    process.exit(1);
  }

  console.log(`Validated ${files.length} place file(s). OK.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
