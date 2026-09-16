import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export function Root() {
  useEffect(() => {
    // Site-wide Open Graph defaults. Icons and the manifest are static
    // <link>s in index.html; per-route meta arrives with framework mode.
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("og:image", "https://crotogether.com/og-image.png");
    setMeta("og:site_name", "CRO Together");
    setMeta("og:type", "website");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
