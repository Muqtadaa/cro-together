import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { Services as default } from "../app/pages/Services";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/services", matches });
