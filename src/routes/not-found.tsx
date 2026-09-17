import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";
import { NOT_FOUND } from "../seo/routes";

export { NotFound as default } from "../app/pages/NotFound";

/** Splat route: the branded 404. Prerendered at /404 and served by Vercel for every unknown URL. */
export const meta: MetaFunction = ({ matches }) => buildMeta({ path: NOT_FOUND.path, matches, noindex: true });
