import type { MetaFunction } from "react-router";
import { aboutGraph } from "../seo/jsonld";
import { buildMeta } from "../seo/meta";

export { About as default } from "../app/pages/About";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/about", matches, jsonLd: aboutGraph() });
