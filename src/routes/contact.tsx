import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { Contact as default } from "../app/pages/Contact";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/contact", matches });
