import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

/**
 * Route tree. Every leaf is a thin module in src/routes/ that re-exports the
 * page component from src/app/pages/ and adds `meta()` from the registry in
 * src/seo/routes.ts. The splat route is the branded 404 (prerendered to
 * /404.html by scripts/postbuild.mjs).
 */
export default [
  layout("./app/Root.tsx", [
    index("./routes/home.tsx"),
    route("services", "./routes/services.tsx"),
    route("about", "./routes/about.tsx"),
    route("proof", "./routes/proof.tsx"),
    route("tools", "./routes/tools.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("privacy", "./routes/privacy.tsx"),
    route("*", "./routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
