/**
 * The two Chrome extensions. Text-only metadata so that src/seo/jsonld.ts
 * (SoftwareApplication nodes) and the Node build scripts can import it;
 * the screenshot galleries stay in src/app/pages/Tools.tsx, which merges
 * them in by `number`.
 */
export interface ExtensionInfo {
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: { title: string; detail: string }[];
  storeUrl: string;
  /** Small reassurance line shown under the CTA (privacy / affiliation note). */
  note?: string;
}

export const EXTENSIONS: ExtensionInfo[] = [
  {
    number: "01",
    name: "Optimizely Web QA Helper",
    tagline: "A lightweight QA panel for Optimizely Web Experimentation.",
    description:
      "Everything you need to QA a live experiment, without leaving the page you're testing. The panel runs entirely in your browser — no accounts, no telemetry, no data leaves your machine.",
    features: [
      { title: "Force Variations", detail: "Switch visitor variations inline; single-page tests re-trigger in place, others reload for clean re-bucketing." },
      { title: "Live Experiment List", detail: "A dropdown that updates as experiments activate, showing active audiences at a glance." },
      { title: "QA Cookie Toggle", detail: "Set or clear project QA cookies in one click, configurable per site." },
      { title: "Mobile Viewport Emulation", detail: "Preview real device dimensions so responsive breakpoints and mobile user-agents genuinely activate." },
      { title: "Float or Dock", detail: "Run it as a floating popup or a docked side drawer — preference saved per site." },
      { title: "Live Event Log", detail: "Watch Optimizely lifecycle events, decisions, and tracked events with filters and expandable payloads." },
    ],
    storeUrl: "https://chromewebstore.google.com/detail/optimizely-web-qa-helper/diccoohklmgnapebfindkoocilnlbocg",
    note: "Runs locally in your browser. Collects no data and sends no telemetry.",
  },
  {
    number: "02",
    name: "Optimizely Power Tools",
    tagline: "Productivity superpowers layered into the Optimizely app.",
    description:
      "The bulk actions, shortcuts, and quality-of-life features that turn hours of repetitive program management into a handful of clicks — added right inside the Optimizely interface you already use.",
    features: [
      { title: "Bulk Management", detail: "Select multiple tests to pause, archive, unarchive, or conclude in a single action." },
      { title: "Inline Test Summaries", detail: "Expand any row to see status, IDs, audiences, variations, pages, and metrics without opening the test." },
      { title: "Configuration Copying", detail: "Transfer specific metrics, audiences, code blocks, pages, and variations between experiments — with validation." },
      { title: "A/B ⇄ Personalization", detail: "Convert between A/B tests and Personalization campaigns with a visual diff of what transfers." },
      { title: "Metrics Reordering", detail: "Reorder and bulk-remove metrics with buttons instead of fiddly manual dragging." },
      { title: "Experience Management", detail: "Reorder and group or ungroup Personalization experiences through simple dialog controls." },
      { title: "Version History", detail: "Automatic restore points with one-click rollback and a clear change timeline." },
      { title: "Figma Integration", detail: "Browse and attach design frames to variations without copying URLs around." },
    ],
    storeUrl: "https://chromewebstore.google.com/detail/optimizely-power-tools/khnghhfcmojoblenbinhegjdijcnamod",
    note: "An independent project, not affiliated with or endorsed by Optimizely.",
  },
];
