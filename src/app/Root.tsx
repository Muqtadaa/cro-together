import { Outlet } from "react-router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

/**
 * Layout route shared by every page: sticky nav, the single <main> landmark
 * (the skip link in src/root.tsx targets #main) and the footer. Document-level
 * concerns (head tags, scripts, scroll restoration) live in src/root.tsx.
 */
export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
