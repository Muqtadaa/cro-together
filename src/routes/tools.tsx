import type { MetaFunction } from "react-router";
import { toolsGraph } from "../seo/jsonld";
import { buildMeta } from "../seo/meta";

export { Tools as default } from "../app/pages/Tools";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/tools", matches, jsonLd: toolsGraph() });
