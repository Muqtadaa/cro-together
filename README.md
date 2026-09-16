# cro-together

Source for [crotogether.com](https://crotogether.com): Vite + React 18 + React Router 7, Tailwind CSS 4, deployed on Vercel.

## Scripts

- `npm run dev` – local dev server
- `npm run typecheck` – `tsc --noEmit`
- `npm run build` – typecheck, then production build
- `npm run preview` – serve the production build locally
- `npm run icons` – regenerate `public/` icons and the Open Graph image from `src/assets/logo.png` (sharp)

## Dependency notes

- `react-router` and `@react-router/dev` are pinned to **7.18.4** exactly, with a matching `overrides` block, so that no transitive update can pull in React Router 8 (which requires React 19 and Vite 7). Bump both together, deliberately.
- Node 22 (`engines` in `package.json`, `node-version` in CI).
