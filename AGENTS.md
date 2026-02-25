# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15** personal portfolio/blog site ("Charlie的小站"). It is a single-service, frontend-only application with no database, no backend API, no Docker, and no environment variables.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Build (static export) | `npm run build` |

See `README.md` for full documentation on content editing and deployment.

### Notes

- The project uses **static export** (`output: 'export'` in `next.config.mjs`), so `npm run build` produces static files in `out/`.
- All editable content lives in the `content/` directory as TypeScript files and MDX — no component code changes needed for content updates.
- There are two routes: `/` (homepage with bento layout) and `/notes/scents` (fragrance notes with filtering).
- Lint produces warnings about `<img>` usage in scent components — these are expected and not errors.
- No automated test suite exists; validation is done via lint, build, and manual browser testing.
