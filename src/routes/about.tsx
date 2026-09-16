import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { About as default } from "../app/pages/About";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/about", matches });
