import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// ── Console easter egg ──────────────────────────────────────────────────────
// A quiet message for anyone curious enough to open the devtools.
// Fitting for a site about understanding what users actually do.
console.log(
  "%cHello, curious one.",
  "font-family: 'Newsreader Variable', Georgia, serif; font-size: 18px; font-style: italic; color: #060e1a;"
);
console.log(
  "%cYou looked at the data instead of just the surface. That's exactly what good CRO looks like.\n\nIf you're interested in working together → https://crotogether.com/contact",
  "font-family: 'Manrope Variable', system-ui, sans-serif; font-size: 13px; color: #45474c; line-height: 1.6;"
);
// ───────────────────────────────────────────────────────────────────────────

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
  // Tells the inline watchdog in src/root.tsx that the bundle ran, so it
  // leaves the `html.js` flag (and the scroll reveals) in place.
  window.__hydrated = true;
});
