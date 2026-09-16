import type { MetaFunction } from "react-router";
import { buildMeta } from "../seo/meta";

export { Proof as default } from "../app/pages/Proof";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/proof", matches });
