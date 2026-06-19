import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import blueLogo from "../assets/logo.png";

export function Root() {
  useEffect(() => {
    // Favicon
    let favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.type = "image/png";
    favicon.href = blueLogo;

    // Apple touch icon
    let appleIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement | null;
    if (!appleIcon) {
      appleIcon = document.createElement("link");
      appleIcon.rel = "apple-touch-icon";
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = blueLogo;

    // OG image
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("og:image", blueLogo);
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