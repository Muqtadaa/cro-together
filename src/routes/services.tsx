import type { MetaFunction } from "react-router";
import { servicesGraph } from "../seo/jsonld";
import { buildMeta } from "../seo/meta";

export { Services as default } from "../app/pages/Services";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/services", matches, jsonLd: servicesGraph() });
