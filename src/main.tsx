import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

// ── Console easter egg ──────────────────────────────────────────────────────
// A quiet message for anyone curious enough to open the devtools.
// Fitting for a site about understanding what users actually do.
console.log(
  "%cHello, curious one.",
  "font-family: 'Newsreader', Georgia, serif; font-size: 18px; font-style: italic; color: #060e1a;"
);
console.log(
  "%cYou looked at the data instead of just the surface. That's exactly what good CRO looks like.\n\nIf you're interested in working together → https://crotogether.com/contact",
  "font-family: 'Manrope', system-ui, sans-serif; font-size: 13px; color: #45474c; line-height: 1.6;"
);
// ───────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
