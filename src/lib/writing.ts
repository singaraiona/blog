export const PROJECT_LABELS = {
  theplatform: "ThePlatform",
  hyperbridge: "Hyperbridge",
  rayforce: "RayforceDB",
  axl: "AxlDB",
  rayforce2: "Rayforce2 / Teide",
} as const;

export const PERSPECTIVE_LABELS = {
  log: "in the moment",
  note: "technical note",
  retrospective: "retrospective",
  postmortem: "post-mortem",
  milestone: "milestone",
} as const;

export const STEP_ORDER = [
  "theplatform-origin",
  "theplatform-production",
  "hyperbridge",
  "rayforce-restart",
  "rayforce-hardening",
  "axl-experiment",
  "rayforce2-merge",
] as const;

export const STEP_INFO = {
  "theplatform-origin": {
    title: "ThePlatform: one runtime, one table",
    years: "2016-2019",
    truth:
      "This step was years of proving an idea, not years of polishing a finished product. The bet was that vectors, reactions, and grammars could share one dispatch.",
    summary:
      "The initial design thesis, the K influence, and the first rules for data layout, parsing, and concurrency.",
  },
  "theplatform-production": {
    title: "ThePlatform: proving the shared runtime in production",
    years: "2019-2025",
    truth:
      "The value of ThePlatform was not any one subsystem. It was that one runtime, one debugger, and one extension model survived production pressure.",
    summary:
      "Proofs, retrospectives, and the production lessons that made the unification claim credible.",
  },
  hyperbridge: {
    title: "Hyperbridge: a public concurrency detour",
    years: "2021-2022",
    truth:
      "This was not a side project for optics. It was a practical detour where fairness, wakeups, and panic safety had to be learned the hard way and in public.",
    summary:
      "The MPMC channel work that sharpened the concurrency discipline behind later systems work.",
  },
  "rayforce-restart": {
    title: "Rayforce: restart in C for embeddability",
    years: "2020-2024",
    truth:
      "Rayforce began as a deliberate restart in C because embeddability mattered more than implementation comfort. The constraint, not the language preference, drove the move.",
    summary:
      "The transition away from a server-shaped Rust system toward an embeddable C library and its language core.",
  },
  "rayforce-hardening": {
    title: "Rayforce: hardening toward real users",
    years: "2024-2026",
    truth:
      "The hard part was not inventing kernels. It was making the system measurable, bindable, allocatable, documented, and honest enough for other people to use.",
    summary:
      "Allocator work, binding pressure, benchmarks, release work, and user-facing product decisions.",
  },
  "axl-experiment": {
    title: "AxlDB: test whether there was another shape",
    years: "2025",
    truth:
      "AxlDB was an honest negative result. The experiment mattered because it showed Rayforce was not missing a secret cleaner core.",
    summary:
      "The side experiment that clarified where the engine ended and the database began, then got shelved.",
  },
  "rayforce2-merge": {
    title: "Rayforce2 / Teide: merge the surface with the engine",
    years: "2026-",
    truth:
      "This step is about giving up the comfort of separate projects. The language users knew and the engine I wanted had to become one system.",
    summary:
      "The merge, the morsel pipeline, spec transcription, and the new query surfaces unlocked by the new engine.",
  },
} as const;
