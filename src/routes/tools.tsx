import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { Tools as default } from "../app/pages/Tools";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/tools", matches });
