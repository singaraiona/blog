import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    project: z.enum(["theplatform", "hyperbridge", "rayforce", "axl", "rayforce2"]),
    step: z.enum([
      "theplatform-origin",
      "theplatform-production",
      "hyperbridge",
      "rayforce-restart",
      "rayforce-hardening",
      "axl-experiment",
      "rayforce2-merge",
    ]),
    workPeriod: z.string(),
    perspective: z.enum([
      "log",
      "note",
      "retrospective",
      "postmortem",
      "milestone",
    ]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
