# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 15 personal portfolio site ("Charlie的小站") with static export. No database, Docker, or external services are required.

### Services

| Service | Command | Notes |
|---------|---------|-------|
| Dev server | `npm run dev` | Runs at `localhost:3000` |

### Key commands

See `README.md` and `MAINTENANCE.md` for full details. Quick reference:

- **Lint:** `npm run lint`
- **Build:** `rm -rf .next && npm run build` (static output to `out/`)
- **Dev:** `npm run dev`

### Caveats

- The project uses `output: 'export'` (static site generation). There are no API routes or server-side features.
- ESLint will show 2 warnings about `<img>` vs `<Image />` in scent-related components — these are expected and acceptable since `images.unoptimized: true` is set for static export.
- Content is managed via TypeScript files in `content/` directory — no CMS or database.
- Node.js v22 is required (matches `@types/node` version in devDependencies).
