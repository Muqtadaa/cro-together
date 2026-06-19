import { Link, useSearchParams } from "react-router";
import { useEffect } from "react";
import imgMinimalistWorkspace from "../../assets/workspace.jpg";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";
import { Stat } from "../components/ui/stat";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

interface ServiceData {
  number: string;
  title: string;
  tagline: string;
  description: string;
  whoFor: string;
  deliverables: string[];
  stat?: { label: string; value: string };
}

const SERVICES: ServiceData[] = [
  {
    number: "01",
    title: "Conversion Diagnostic",
    tagline: "Identify the hidden leaks in your revenue engine.",
    description: "I conduct a deep-tissue scan of your digital funnel, cross-referencing quantitative analytics signals with qualitative friction points. This isn't a checklist; it's a forensic investigation into why users hesitate.",
    whoFor: "Mature platforms seeing a plateau in conversion rates despite steady traffic. Perfect for teams needing fresh, objective data signals.",
    deliverables: ["Friction Heatmap Report", "Analytics Integrity Audit", "15 High-Impact Optimization Wins"],
  },
  {
    number: "02",
    title: "Experimentation Roadmap",
    tagline: "A prioritized, scalable roadmap for measurable growth.",
    description: "Strategic frameworks to transform your testing backlog into a rigorous 12-month growth thesis. Every experiment prioritized by impact, confidence, and ease — mapped to your business objectives.",
    whoFor: "Growth teams ready to move from ad hoc testing to a systematic, repeatable experimentation program.",
    deliverables: ["Prioritized Test Backlog", "12-Month Growth Thesis", "Stakeholder Alignment Deck"],
  },
  {
    number: "03",
    title: "A/B Testing & Personalization",
    tagline: "Significant lift in customer lifetime value and ARPU.",
    description: "End-to-end experiment design, implementation, and analysis. I ensure statistical rigor at every step, from hypothesis formation to post-test documentation — building a knowledge base that compounds over time.",
    whoFor: "Teams with development resources who need expert strategic oversight and quality assurance.",
    deliverables: ["Experiment Briefs & Wireframes", "Statistical Analysis Reports", "Personalization Playbook"],
    stat: { value: "142%", label: "Average lift in checkout conversion for D2C partners over 12 months" },
  },
  {
    number: "04",
    title: "Qualitative UX Research Sprint",
    tagline: "Deep empathy that drives smarter product decisions.",
    description: "Quantitative data tells you what happened. Qualitative research tells you why. I run moderated user interviews, unmoderated task studies, and advanced survey design to surface the motivations that metrics can't reveal.",
    whoFor: "Product teams launching new features or redesigns who need to validate assumptions before committing to code.",
    deliverables: ["Moderated User Sessions", "Synthesized Research Report", "Affinity Diagrams & Insight Maps"],
  },
  {
    number: "05",
    title: "Technical Implementation & Measurement",
    tagline: "Give absolute confidence in your data integrity.",
    description: "I assess your measurement infrastructure to ensure testing frameworks are implemented correctly. From event taxonomy to attribution modeling, I build data pipelines that power reliable, repeatable experimentation.",
    whoFor: "Organizations using tools like Optimizely, LaunchDarkly, or Amplitude who need expert configuration and governance.",
    deliverables: ["Analytics Implementation Audit", "Testing Tool Configuration", "Custom Reporting Dashboard"],
  },
  {
    number: "06",
    title: "Fractional CRO Advisory",
    tagline: "Scalable leadership that evolves with your company.",
    description: "An ongoing partnership where I embed directly into your team's communication channels, participate in your stand-ups, and align with your working product roadmap. This ensures total transparency and friction-free communication to build lasting CRO capability within your organization.",
    whoFor: "Series A–C companies with growing teams who need senior CRO leadership without a full-time hire.",
    deliverables: ["Weekly Prioritization Sessions", "Async Strategy Reviews", "Team Training & Enablement"],
  },
];

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

function ServicesAccordion() {
  const [searchParams] = useSearchParams();
  const openNumber = searchParams.get("open") ?? undefined;

  useEffect(() => {
    if (!openNumber) return;
    // Wait for accordion animation to start, then scroll the item into view
    const id = `service-item-${openNumber}`;
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 64; // matches h-16 sticky nav
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [openNumber]);

  return (
    <PageSection bg="beige" py="md" borderTop className="border-[rgba(0,0,0,0.08)]">
      <Accordion type="single" collapsible defaultValue={openNumber} className="w-full">
        {SERVICES.map((service) => (
          <AccordionItem
            key={service.number}
            id={`service-item-${service.number}`}
            value={service.number}
            className="border-b border-[rgba(0,0,0,0.08)] last:border-b-0"
          >
            <AccordionTrigger
              className="py-6 hover:no-underline group w-full text-left"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 flex-1 pr-4">
                <div className="flex items-center gap-4 shrink-0">
                  <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "12px", color: "var(--slate)", letterSpacing: "1.4px" }}>
                    {service.number}
                  </span>
                  <div className="h-px w-8 bg-[#c5c6cc]" />
                </div>
                <span
                  className="text-navy group-hover:opacity-80 transition-opacity"
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
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 pb-8 border-t border-[rgba(0,0,0,0.06)]">
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
                    <span className="uppercase tracking-widest text-slate" style={tx.eyebrow}>
                      Who it's for
                    </span>
                    <p style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", lineHeight: "1.625", color: "var(--text-dark)" }}>
                      {service.whoFor}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="uppercase tracking-widest text-slate" style={tx.eyebrow}>
                      Deliverables
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2" style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "var(--text-dark)" }}>
                          <span>•</span> {d}
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
