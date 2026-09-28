import { z } from "zod";
import { JABALPUR_BBOX } from "./place.js";

const bilingual = z.object({
  en: z.string().min(1),
  hi: z.string().min(1),
});

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const isoDateTime = z.string().min(10);

const festivalSource = z.object({
  type: z.enum(["official", "samiti", "editorial", "contributor", "police", "nagar_nigam"]),
  url: z.string().url().or(z.literal("")),
  accessed: dateOnly,
  published_at: dateOnly.optional(),
});

export const festivalMetaSchema = z.object({
  year: z.number().int().min(2024).max(2100),
  festivals: z
    .array(
      z.object({
        id: z.enum(["ganesh", "durga", "kali", "saraswati", "ramlila", "other"]),
        name: bilingual,
        window_start: dateOnly,
        window_end: dateOnly,
        dates_note: bilingual.optional(),
      }),
    )
    .min(1),
});

export const pandalSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    year: z.number().int(),
    festival: z.enum(["ganesh", "durga", "kali", "saraswati", "ramlila", "other"]),
    name: bilingual,
    samiti: z.string().optional(),
    place_ref: z.string().optional(),
    coords: z.tuple([z.number(), z.number()]),
    area: z.string().optional(),
    highlights: bilingual.optional(),
    schedule: z
      .object({
        aarti: z.array(z.string()).optional(),
        darshan_hours: z.string().optional(),
        special_days: z
          .array(
            z.object({
              day: z.string(),
              note: z.string(),
            }),
          )
          .optional(),
      })
      .optional(),
    crowd_tip: bilingual.optional(),
    access_note: bilingual.optional(),
    family_notes: bilingual.optional(),
    safety: bilingual,
    sources: z.array(festivalSource).default([]),
    verified_at: dateOnly.optional().nullable(),
    status: z.enum(["draft", "published", "withdrawn"]),
  })
  .superRefine((p, ctx) => {
    const [lng, lat] = p.coords;
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
    if (p.status === "published") {
      if (!p.sources.length) {
        ctx.addIssue({
          code: "custom",
          message: "published pandal needs sources[]",
          path: ["sources"],
        });
      }
      if (!p.verified_at) {
        ctx.addIssue({
          code: "custom",
          message: "published pandal needs verified_at (hidden from current-year featured without it)",
          path: ["verified_at"],
        });
      }
    }
  });

export const visarjanPointSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    year: z.number().int(),
    name: bilingual,
    kind: z.enum(["kund", "ghat", "other"]),
    coords: z.tuple([z.number(), z.number()]),
    area: z.string().optional(),
    summary: bilingual,
    eco_note: bilingual.optional(),
    place_ref: z.string().optional(),
    sources: z.array(festivalSource).min(1),
    verified_at: dateOnly.optional().nullable(),
    status: z.enum(["draft", "published", "withdrawn"]),
  })
  .superRefine((v, ctx) => {
    const [lng, lat] = v.coords;
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
    if (v.status === "published" && !v.verified_at) {
      ctx.addIssue({
        code: "custom",
        message: "published visarjan point needs verified_at",
        path: ["verified_at"],
      });
    }
  });

export const festivalNoticeSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    year: z.number().int(),
    title: bilingual,
    body: bilingual,
    kind: z.enum(["traffic", "parking", "safety", "general", "visarjan"]),
    source: festivalSource,
    valid_from: isoDateTime,
    valid_to: isoDateTime,
    status: z.enum(["draft", "published", "expired"]),
  })
  .superRefine((n, ctx) => {
    if (!n.source || !n.source.type) {
      ctx.addIssue({
        code: "custom",
        message: "notice needs source",
        path: ["source"],
      });
    }
    if (!n.valid_to) {
      ctx.addIssue({
        code: "custom",
        message: "notice needs valid_to (auto-expire)",
        path: ["valid_to"],
      });
    }
    const from = Date.parse(n.valid_from);
    const to = Date.parse(n.valid_to);
    if (!Number.isNaN(from) && !Number.isNaN(to) && to <= from) {
      ctx.addIssue({
        code: "custom",
        message: "valid_to must be after valid_from",
        path: ["valid_to"],
      });
    }
  });

export type FestivalMeta = z.infer<typeof festivalMetaSchema>;
export type Pandal = z.infer<typeof pandalSchema>;
export type VisarjanPoint = z.infer<typeof visarjanPointSchema>;
export type FestivalNotice = z.infer<typeof festivalNoticeSchema>;
