import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { Home as default } from "../app/pages/Home";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/", matches });
