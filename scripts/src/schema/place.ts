import { z } from "zod";

/** Approx Jabalpur + day-trip bbox (lng, lat) */
export const JABALPUR_BBOX = {
  minLng: 78.5,
  maxLng: 81.5,
  minLat: 21.5,
  maxLat: 24.5,
} as const;

const bilingual = z.object({
  en: z.string().min(1),
  hi: z.string().min(1),
});

const sourceSchema = z.object({
  type: z.enum(["official", "editorial", "osm", "wikidata", "contributor", "samiti"]),
  url: z.string().url().or(z.literal("")),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const imageSchema = z.object({
  file: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().min(1),
  license: z.string().min(1),
  source_url: z.string().min(1),
});

const accessLegOption = z.object({
  mode: z.enum([
    "city_bus",
    "intercity_bus",
    "shared_tempo",
    "auto",
    "cab",
    "own_car",
    "own_bike",
    "train",
    "walk",
  ]),
  route_text: z.string().optional(),
  duration_min: z.tuple([z.number(), z.number()]).optional(),
  fare_inr: z.tuple([z.number(), z.number()]).optional(),
  frequency_text: z.string().optional(),
  first_last: z.string().optional(),
  tip: z.string().optional(),
  checked_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  source: z
    .object({
      type: z.enum(["editorial", "official", "contributor"]),
      url: z.string().optional(),
    })
    .optional(),
});

const accessSchema = z.object({
  nearest_station: z
    .object({
      name: z.string(),
      km: z.number(),
    })
    .optional(),
  parking: z
    .object({
      cars: z.enum(["yes", "no", "limited"]).or(z.string()),
      fee_inr: z.tuple([z.number(), z.number()]).optional(),
      bikes: z.string().optional(),
    })
    .optional(),
  legs: z
    .array(
      z.object({
        from: z.string().min(1),
        road_km: z.number().optional(),
        options: z.array(accessLegOption).min(1),
      }),
    )
    .min(1),
  accessibility_note: z.string().optional(),
  safety_note: z.string().optional(),
});

const timingsSchema = z.object({
  weekly: z.record(z.string(), z.string()).optional(),
  seasonal_note: z.string().optional(),
  last_entry: z.string().optional(),
  best_slots: z
    .array(
      z.object({
        label: z.string(),
        range: z.string(),
        why: z.string().optional(),
      }),
    )
    .optional(),
  checked_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const entrySchema = z.object({
  fees: z.array(
    z.object({
      who: z.string(),
      inr: z.number(),
      note: z.string().optional(),
    }),
  ),
  extras: z
    .array(
      z.object({
        what: z.string(),
        inr: z.number(),
      }),
    )
    .optional(),
  checked_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const aartiSchema = z.object({
  time_text: z.string().min(1),
  checked_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  source: sourceSchema.partial({ url: true }).extend({
    type: z.enum(["official", "editorial", "osm", "wikidata", "contributor", "samiti"]),
    accessed: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const placeSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    name: bilingual,
    aliases: z.array(z.string()).default([]),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    coords: z.tuple([z.number(), z.number()]),
    area: z.string().optional(),
    summary: bilingual,
    description: bilingual.optional(),
    fee_text: z.string().optional(),
    fee_checked_at: z.string().optional(),
    typical_hours_text: z.string().optional(),
    hours_checked_at: z.string().optional(),
    best_time: z.string().optional(),
    visit_minutes: z.number().optional(),
    accessibility: z
      .object({
        step_free: z.enum(["yes", "no", "unknown"]),
      })
      .optional(),
    family_friendly: z.boolean().optional(),
    parking: z.string().optional(),
    safety_note: z.string().optional(),
    timings: timingsSchema.optional(),
    entry: entrySchema.optional(),
    access: accessSchema.optional(),
    images: z.array(imageSchema).default([]),
    sources: z.array(sourceSchema).default([]),
    verified_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
    verified_by: z.string().optional().nullable(),
    status: z.enum([
      "draft",
      "published",
      "temporarily_closed",
      "permanently_closed",
      "archived",
    ]),
    river: z.literal("narmada").optional(),
    ghat_type: z.array(z.string()).optional(),
    aarti: aartiSchema.optional(),
    etiquette: bilingual.optional(),
    river_safety: bilingual.optional(),
    festival_hubs: z.array(z.string()).optional(),
  })
  .superRefine((place, ctx) => {
    const [lng, lat] = place.coords;
    if (
      lng < JABALPUR_BBOX.minLng ||
      lng > JABALPUR_BBOX.maxLng ||
      lat < JABALPUR_BBOX.minLat ||
      lat > JABALPUR_BBOX.maxLat
    ) {
      ctx.addIssue({
        code: "custom",
        message: `coords [${lng}, ${lat}] outside Jabalpur day-trip bounds`,
        path: ["coords"],
      });
    }

    if (place.status !== "published") return;

    if (!place.sources.length) {
      ctx.addIssue({ code: "custom", message: "published place needs sources[]", path: ["sources"] });
    }
    if (!place.verified_at) {
      ctx.addIssue({
        code: "custom",
        message: "published place needs verified_at",
        path: ["verified_at"],
      });
    }
    for (const [i, img] of place.images.entries()) {
      if (!img.alt || !img.license || !img.credit) {
        ctx.addIssue({
          code: "custom",
          message: "published images need alt, credit, license",
          path: ["images", i],
        });
      }
    }

    const needsAccess =
      place.category.startsWith("tourism") ||
      place.category.startsWith("heritage") ||
      place.category.startsWith("food");

    if (needsAccess) {
      if (!place.timings) {
        ctx.addIssue({
          code: "custom",
          message: "published tourism/heritage/food needs timings",
          path: ["timings"],
        });
      }
      if (!place.entry) {
        ctx.addIssue({
          code: "custom",
          message: "published tourism/heritage/food needs entry",
          path: ["entry"],
        });
      }
      if (!place.access?.legs?.length) {
        ctx.addIssue({
          code: "custom",
          message: "published tourism/heritage/food needs access.legs",
          path: ["access", "legs"],
        });
      }
    }

    const isGhat =
      place.category.includes("ghat") || place.river === "narmada" || Boolean(place.ghat_type?.length);

    if (isGhat && !place.river_safety) {
      ctx.addIssue({
        code: "custom",
        message: "ghat pages need river_safety",
        path: ["river_safety"],
      });
    }
    if (isGhat && place.aarti && !place.aarti.checked_at) {
      ctx.addIssue({
        code: "custom",
        message: "aarti ghats need aarti.checked_at",
        path: ["aarti", "checked_at"],
      });
    }
  });

export type Place = z.infer<typeof placeSchema>;
