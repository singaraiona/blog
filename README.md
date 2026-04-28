# anton.kundenko.dev

Personal site of Anton Kundenko - systems engineer, vector databases.

Built with [Astro](https://astro.build/), MDX, and Tailwind. Deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # serve ./dist locally
```

## Write

Posts live in `src/content/writing/*.mdx` with frontmatter:

```yaml
---
title: On SIMD allocators
summary: One-line summary that shows up in indexes and OG cards.
publishedAt: 2026-04-15
tags: [simd, allocators]
draft: false
---
```

Set `draft: true` to hide a post from production builds (still visible in `astro dev`).
