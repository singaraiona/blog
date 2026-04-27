# CLAUDE.md - hetoku.com

Personal website + blog for Anton Kundenko. Read this before doing anything in this repo.

## Hard rules (non-negotiable)

1. **NEVER use long dashes anywhere.** Forbidden: em-dash (U+2014), en-dash (U+2013), the `--` typographic substitute, and the corresponding HTML named entities (`mdash`, `ndash`). Use a plain hyphen `-` or restructure the sentence. Applies to: site copy, MDX posts, commit messages, PR descriptions, code comments, this file. Sweep with: `grep -rnP "[\x{2013}\x{2014}]" src/ public/ *.md`.
2. **Only straight quotes and apostrophes.** Use ASCII `'` (U+0027) and `"` (U+0022) only. Forbidden: curly singles (U+2018, U+2019), curly doubles (U+201C, U+201D), prime marks (U+2032, U+2033), and the named HTML entities `lsquo`, `rsquo`, `ldquo`, `rdquo`, `apos`, `quot`. Applies everywhere: site copy, MDX posts, code, comments, this file. Sweep with: `grep -rnP "[\x{2018}\x{2019}\x{201C}\x{201D}\x{2032}\x{2033}]" src/ public/ *.md`.
2. **Never invent contact info or project facts.** Cross-check against `../../cv` (sibling dir with the canonical CV PDF, avatar, role summaries, project descriptions). The user works from that source of truth.
3. **Never run destructive git commands** (force push, hard reset, branch -D, clean -f) without explicit ask.

## Canonical facts (verified against ../../cv)

- **Email**: `anton.kundenko@gmail.com`. NOT `anton@kundenko.dev` (don't reintroduce).
- **GitHub**: `singaraiona`
- **LinkedIn**: `anton-kundenko-a22a3667`
- **Reddit**: `het0ku`
- **Title**: `principal systems engineer` / `architect of high-performance database systems` / `programming language creator`
- **Years of experience**: 18+
- **Employer (current)**: Lynx Trading Technologies, since 2013
- **Earlier**: Samsung Electronics R&D, 2012-2013 (KVM on ARM Cortex-A + TrustZone integration)

### Projects (canonical list and order, from the CV)

1. **RayforceDB** (2020-) - SIMD-first columnar analytical DB in C, Rayfall language, sponsored by Lynx. https://rayforcedb.com
2. **ThePlatform** (2016-) - columnar time-series + O language, internal at Lynx. https://theplatform.technology
3. **TeideDB** (2024-) - SQL surface over the Rayforce vectorized core. https://teidedb.com
4. **Teidelum** (2025-) - open-source knowledge infra on Teide, exposes data via MCP and REST. https://lum.teidedb.com
5. **AxlDB** (2021-) - ultra-compact zero-dep vector DB for deterministic-latency workloads. https://axl-db.com
6. **hyperbridge** - open source bridge layer. https://github.com/singaraiona/hyperbridge

## Visual system

- **Palette**: tokens in `src/styles/global.css` under `@theme`. Dark only.
  - bg `#0b0f0d`, fg `#e6ede9`, muted `#7a8a82`, faint `#4a5953`
  - border `#1b2420`, surface `rgba(17,23,20,0.19)`
  - accent `#7ce3b5`, accent-dim `#4fa37e`
- **Type**: mono (JetBrains Mono) for headings, brand, code, metadata. Sans (Inter) for long-form prose body in `.prose`.
- **Identity**: a single blinking caret (`src/components/Caret.astro`). One subtle `fade-up` on first paint. Astro view transitions for page navigation. Nothing else animated. Do not add hover lift, glow, scan lines, or typewriter rotations - those were intentionally removed from the previous site.
- **Headings in prose**: get a `## ` or `### ` accent prefix in `accent-dim` via CSS pseudo-element. Don't hand-author the prefix.
- **Copy register**: lowercase by default in section titles, nav, hero. Sentence case is fine in long-form prose. The site is calm, not loud. Avoid marketing voice.
- **Layout widths**: 920px max for index/home pages, 65ch for prose pages.

## File map

```
src/
  layouts/
    BaseLayout.astro     - html head, font imports, meta, view transitions, page wrapper
    PostLayout.astro     - post header (title/date/reading time/tags) + .prose body
  components/
    Header.astro         - brand left, nav right with active-route underline
    Footer.astro         - copyright, RSS, source link
    Caret.astro          - the one blinking caret (identity)
    Section.astro        - "## title" with optional right-aligned link
    PostCard.astro       - row in writing index: date | title | summary | tags
    ProjectCard.astro    - project tile on home
  pages/
    index.astro          - home: hero, latest writing, projects, contact
    about.astro          - bio, work history, "what I'm good at", elsewhere
    writing/index.astro  - post list grouped by year
    writing/[...slug].astro - dynamic post route, uses PostLayout + render(post)
    rss.xml.ts           - Astro RSS feed
  content/
    writing/             - MDX posts; frontmatter validated by content.config.ts
  content.config.ts      - Zod schema for the writing collection
  styles/global.css      - Tailwind v4 import, theme tokens, .prose, .caret, .fade-up
public/
  avatar.png             - profile photo, 552KB (sourced from ../../cv/avatar.png)
  resume.pdf             - CV PDF, 992KB (sourced from ../../cv/anton_kundenko_cv.pdf)
  CNAME                  - "hetoku.com"
  favicon.svg            - "A_" mark using Roboto Slab Bold A glyph + underscore glyph,
                           extracted via fontTools. Don't replace with hand-drawn geometry.
```

## Common operations

- `npm run dev` - Vite dev server at http://localhost:4321
- `npm run build` - static output to `dist/`
- `npm run preview` - serve `dist/` for local sanity check
- `npx astro check` - typecheck Astro + TS files
