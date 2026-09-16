import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import imgMinimalistWorkspace from "../../assets/workspace.jpg";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";
import { Stat } from "../components/ui/stat";
import { SERVICES } from "../data/services";

function HeroSection() {
  return (
    <PageSection bg="beige" py="none" className="pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-16 pb-0">
        {/* Left: Heading */}
        <div className="lg:col-span-8 flex flex-col gap-6 pb-16">
          <SectionHeader
            eyebrow="Strategic Methodology"
            eyebrowBadge
            title={<>Strategic Services to{" "}<em style={{ fontStyle: "italic" }}>Drive Real<br />Outcomes.</em></>}
            titleWeight={200}
            size="xl"
            as="h1"
          />
        </div>

        {/* Right: description */}
        <div className="lg:col-span-4 pb-16">
          <p className="text-text-body" style={tx.bodyLg}>
            Moving beyond tactical tweaks to architectural growth. I deploy editorial precision to complex experimentation frameworks, ensuring every test serves a long-term business objective.
          </p>
        </div>
      </div>

      {/* Full-width image */}
      <div className="pb-16">
        <div className="w-full h-[400px] rounded-lg overflow-hidden relative bg-tan-light">
          <img
            src={imgMinimalistWorkspace}
            alt="Strategic workspace"
            className="absolute w-full h-full object-cover opacity-80"
            style={{ filter: "saturate(0)", objectPosition: "center 20%" }}
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,14,26,0.3)] to-transparent" />
        </div>
      </div>
    </PageSection>
  );
}

/**
 * Native <details name="services"> accordion. Every service body is real,
 * unhidden HTML in the prerendered page (crawlers and agents read all six);
 * `name` makes the items mutually exclusive in the browser, and each item's
 * id doubles as its deep link: /services#experimentation-roadmap.
 */
function ServicesAccordion() {
  const { hash } = useLocation();

  useEffect(() => {
    const slug = hash.replace(/^#/, "");
    if (!slug) return;
    const el = document.getElementById(slug);
    if (!(el instanceof HTMLDetailsElement)) return;
    el.open = true;
    // React Router scrolls to the hash on navigation; this covers the initial
    // load, where the browser may have scrolled before the item was opened.
    el.scrollIntoView({ block: "start" });
  }, [hash]);

  return (
    <PageSection bg="beige" py="md" borderTop className="border-[rgba(0,0,0,0.08)]">
      <div className="w-full">
        {SERVICES.map((service) => (
          <details
            key={service.slug}
            id={service.slug}
            name="services"
            className="service-item border-b border-[rgba(0,0,0,0.08)] last:border-b-0"
          >
            <summary className="service-summary py-6 w-full text-left">
              <div className="flex items-center gap-4">
                <h2 className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 flex-1 pr-4">
                  <span className="flex items-center gap-4 shrink-0">
                    <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "12px", color: "var(--slate)", letterSpacing: "1.4px" }}>
                      {service.number}
                    </span>
                    <span className="h-px w-8 bg-[#c5c6cc]" aria-hidden="true" />
                  </span>
                  <span
                    className="text-navy service-title transition-opacity"
                    style={{ fontFamily: serif, fontWeight: 200, fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "1.15" }}
                  >
                    {service.title}
                  </span>
                  <span
                    className="text-text-body lg:ml-auto lg:text-right"
                    style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: "1.4" }}
                  >
                    {service.tagline}
                  </span>
                </h2>
                <svg
                  className="service-chevron text-text-muted shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </summary>

            <div className="service-body grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 pb-8 border-t border-[rgba(0,0,0,0.06)]">
              {/* Description */}
              <div className="lg:col-span-7">
                <p style={{ fontFamily: sans, fontWeight: 200, fontSize: "17px", lineHeight: "1.65", color: "var(--text-body)" }}>
                  {service.description}
                </p>
                {service.stat && (
                  <div className="mt-6 p-5 border border-[rgba(0,0,0,0.1)] rounded-sm bg-cream">
                    <Stat value={service.stat.value} label={service.stat.label} variant="light" size="lg" />
                  </div>
                )}
              </div>

              {/* Who it's for + Deliverables */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="uppercase tracking-widest text-slate" style={tx.eyebrow}>
                    Who it's for
                  </h3>
                  <p style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", lineHeight: "1.625", color: "var(--text-dark)" }}>
                    {service.whoFor}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="uppercase tracking-widest text-slate" style={tx.eyebrow}>
                    What you get
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2" style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "var(--text-dark)" }}>
                        <span aria-hidden="true">•</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 uppercase tracking-widest hover:opacity-70 transition-opacity"
                  style={{ fontFamily: sans, fontWeight: 200, fontSize: "12px", color: "var(--navy)", letterSpacing: "1.2px" }}
                >
                  Inquire for {service.title} →
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
    </PageSection>
  );
}

function FinalCTA() {
  return (
    <PageSection bg="cream" py="lg" narrow innerClassName="flex flex-col items-center gap-6 text-center">
      <SectionHeader
        title={<>Ready to build a <em style={{ fontStyle: "italic" }}>smarter experimentation program?</em></>}
        titleWeight={400}
        size="xl"
        className="items-center text-center"
      />
      <p className="text-text-body mt-2" style={tx.bodyLg}>
        Tell me your goals. From clinical audits to full-scale experimentation programs, I help high-growth teams find clarity in their data.
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
          to="/proof"
          className="px-10 py-4 border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors"
          style={tx.ctaLink}
        >
          View My Work
        </Link>
      </div>
    </PageSection>
  );
}

export function Services() {
  return (
    <>
      <HeroSection />
      <ServicesAccordion />
      <FinalCTA />
    </>
  );
}
