import type { Config } from "@react-router/dev/config";
import { NOT_FOUND, ROUTES } from "./src/seo/routes";

/**
 * React Router framework mode, static output only.
 *
 * `ssr: false` + `prerender` renders every registered route to a real HTML
 * file at build time (build/client/<route>/index.html), so crawlers and AI
 * agents that do not execute JavaScript still receive the full page. The app
 * then hydrates in the browser and navigates client-side as before.
 */
export default {
  appDirectory: "src",
  ssr: false,
  prerender: [...ROUTES, NOT_FOUND.path],
} satisfies Config;
