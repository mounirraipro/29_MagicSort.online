# Magic Sort

Magic Sort is a Next.js site that wraps a browser-based liquid sorting puzzle game.

## Project Shape

- `app/` contains the marketing site, SEO pages, blog, sitemap, and level-pack landing pages
- `public/game/` contains the embedded standalone sorting game loaded by `/` and `/play`
- `app/lib/gameData.ts` stores the level-pack copy used across the app layer

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Useful Commands

```bash
npm run dev
npm run build
npm run lint
```

## Notes

- The embedded game is served from `public/game/index.html`
- The embedded game loads directly from `/game/index.html` inside the app iframe
- App copy should stay aligned with the Magic Sort brand and bottle-based liquid sorting mechanics
