import type { MetaFunction } from "react-router";
import { pageGraph } from "../seo/jsonld";
import { buildMeta } from "../seo/meta";

export { PrivacyPolicy as default } from "../app/pages/PrivacyPolicy";

export const meta: MetaFunction = ({ matches }) => buildMeta({ path: "/privacy", matches, jsonLd: pageGraph("/privacy") });
