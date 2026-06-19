import { Link } from "react-router";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";
import { ExtensionGallery, type Screenshot } from "../components/extension-gallery";

// Power Tools screenshots (polished marketing tiles)
import ptBulk from "../../assets/extensions/power-tools/01-bulk.png";
import ptSummary from "../../assets/extensions/power-tools/02-summary.png";
import ptFigma from "../../assets/extensions/power-tools/03-figma.png";
import ptConvert from "../../assets/extensions/power-tools/04-convert.png";
import ptHistory from "../../assets/extensions/power-tools/05-history.png";

// QA Helper screenshots (product in context)
import qaForce from "../../assets/extensions/qa-helper/01-force-variations.png";
import qaList from "../../assets/extensions/qa-helper/02-experiment-list.png";
import qaDevices from "../../assets/extensions/qa-helper/03-settings-devices.png";
import qaDrawer from "../../assets/extensions/qa-helper/04-drawer-mode.png";
import qaEventLog from "../../assets/extensions/qa-helper/05-event-log.png";
import qaCollapsed from "../../assets/extensions/qa-helper/06-collapsed-tab.png";

interface ExtensionData {
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: { title: string; detail: string }[];
  screenshots: Screenshot[];
  storeUrl: string;
  /** Small reassurance line shown under the CTA (privacy / affiliation note). */
  note?: string;
}

const EXTENSIONS: ExtensionData[] = [
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
    screenshots: [
      { src: qaForce, alt: "Force Variations panel switching a visitor's variation on a live storefront", caption: "Force variations inline" },
      { src: qaList, alt: "Live experiment list dropdown showing active experiments and audiences", caption: "Live experiment list" },
      { src: qaDevices, alt: "Settings panel with device and viewport emulation options", caption: "Device & viewport emulation" },
      { src: qaDrawer, alt: "QA Helper docked as a side drawer alongside the page", caption: "Dock as a side drawer" },
      { src: qaEventLog, alt: "Live event log streaming Optimizely lifecycle and tracked events", caption: "Live event log" },
      { src: qaCollapsed, alt: "Collapsed floating tab tucked at the edge of the page", caption: "Collapsed floating tab" },
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
    screenshots: [
      { src: ptBulk, alt: "Bulk actions selecting multiple tests to pause, archive, or conclude", caption: "Bulk-manage tests from the list" },
      { src: ptSummary, alt: "Inline test summary expanded within the experiment list", caption: "Inline test summaries" },
      { src: ptFigma, alt: "Figma frame picker attaching a design to a variation", caption: "Attach Figma frames to variations" },
      { src: ptConvert, alt: "Converting an A/B test into a Personalization campaign with a diff", caption: "Convert A/B ⇄ Personalization" },
      { src: ptHistory, alt: "Version history timeline with one-click rollback", caption: "Version history & rollback" },
    ],
    storeUrl: "https://chromewebstore.google.com/detail/optimizely-power-tools/khnghhfcmojoblenbinhegjdijcnamod",
    note: "An independent project, not affiliated with or endorsed by Optimizely.",
  },
];

function HeroSection() {
  return (
    <PageSection bg="beige" py="none" className="pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-16 pb-16">
        {/* Left: Heading */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <SectionHeader
            eyebrow="Tools I've Built"
            eyebrowBadge
            title={<>Tools I've built for{" "}<em style={{ fontStyle: "italic" }}>Optimizely<br />power users.</em></>}
            titleWeight={200}
            size="xl"
            as="h1"
          />
        </div>

        {/* Right: description */}
        <div className="lg:col-span-4">
          <p className="text-text-body" style={tx.bodyLg}>
            Years of running experimentation programs surfaced the same friction over and over. So I built it away. Two Chrome extensions, free on the Web Store, that make QA and program management faster for anyone working in Optimizely.
          </p>
        </div>
      </div>
    </PageSection>
  );
}

function ExtensionCard({ ext }: { ext: ExtensionData }) {
  return (
    <article id={`extension-${ext.number}`} className="border border-[rgba(0,0,0,0.1)] rounded-lg bg-cream overflow-hidden">
      <div className="p-8 lg:p-12 flex flex-col gap-10 lg:gap-12">
        {/* Top: identity + CTA  |  gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: identity + CTA */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "12px", color: "var(--slate)", letterSpacing: "1.4px" }}>
                {ext.number}
              </span>
              <div className="h-px w-8 bg-[#c5c6cc]" />
              <span className="uppercase text-slate" style={tx.eyebrow}>
                Chrome Extension
              </span>
            </div>

            <h2 className="text-navy" style={{ fontFamily: serif, fontWeight: 200, fontSize: "clamp(26px, 3vw, 34px)", lineHeight: "1.15" }}>
              {ext.name}
            </h2>

            <p className="text-text-body" style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: "1.4" }}>
              {ext.tagline}
            </p>

            <p style={{ fontFamily: sans, fontWeight: 200, fontSize: "16px", lineHeight: "1.65", color: "var(--text-body)" }}>
              {ext.description}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href={ext.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-8 py-3.5 bg-navy text-white hover:opacity-90 transition-opacity"
                style={tx.ctaLink}
              >
                Add to Chrome →
              </a>
              {ext.note && (
                <p className="text-text-muted" style={{ ...tx.bodyXs, maxWidth: "32ch" }}>
                  {ext.note}
                </p>
              )}
            </div>
          </div>

          {/* Right: screenshot gallery */}
          <div className="lg:col-span-7">
            <ExtensionGallery shots={ext.screenshots} />
          </div>
        </div>

        {/* Bottom: feature grid */}
        <div className="border-t border-[rgba(0,0,0,0.08)] pt-8 lg:pt-10">
          <span className="uppercase tracking-widest text-slate block mb-6" style={tx.eyebrow}>
            What it does
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {ext.features.map((f) => (
              <div key={f.title} className="flex flex-col gap-1.5">
                <span className="text-navy" style={{ fontFamily: sans, fontWeight: 400, fontSize: "14px", letterSpacing: "0.01em" }}>
                  {f.title}
                </span>
                <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "13.5px", lineHeight: "1.55", color: "var(--text-body)" }}>
                  {f.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ExtensionsSection() {
  return (
    <PageSection bg="beige" py="md" borderTop className="border-[rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-8 lg:gap-12">
        {EXTENSIONS.map((ext) => (
          <ExtensionCard key={ext.number} ext={ext} />
        ))}
      </div>
    </PageSection>
  );
}

function FinalCTA() {
  return (
    <PageSection bg="cream" py="lg" narrow innerClassName="flex flex-col items-center gap-6 text-center">
      <SectionHeader
        title={<>Want a tool that fits <em style={{ fontStyle: "italic" }}>your team's workflow?</em></>}
        titleWeight={400}
        size="xl"
        className="items-center text-center"
      />
      <p className="text-text-body mt-2" style={tx.bodyLg}>
        These started as solutions to my own friction. If your experimentation program has a repetitive bottleneck worth automating, I'd love to hear about it.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Link
          to="/contact"
          className="px-10 py-4 bg-navy text-white hover:opacity-90 transition-opacity"
          style={tx.ctaLink}
        >
          Start a Conversation
        </Link>
        <Link
          to="/services"
          className="px-10 py-4 border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors"
          style={tx.ctaLink}
        >
          Explore Services
        </Link>
      </div>
    </PageSection>
  );
}

export function Tools() {
  return (
    <>
      <HeroSection />
      <ExtensionsSection />
      <FinalCTA />
    </>
  );
}
