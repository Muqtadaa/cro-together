import { Link } from "react-router";
import imgHero from "../../assets/hero.jpg";
import imgProfile from "../../assets/profile.jpeg";
import svgPaths from "../../imports/svg-oy3pdmbdew";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";
import { Stat } from "../components/ui/stat";
import { RevealItem } from "../../lib/reveal";

function HeroSection() {
  return (
    <PageSection bg="beige" py="hero" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      {/* Left: Headline */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        <h1
          className="text-navy"
          style={{ ...tx.h1Bold, letterSpacing: "-2.4px" }}
        >
          Smarter<br />
          Experimentation,<br />
          <em style={{ fontStyle: "italic", fontWeight: 600 }}>Measurable Growth</em>
        </h1>
        <p
          className="text-text-body max-w-[640px]"
          style={{ fontFamily: sans, fontWeight: 200, fontSize: "clamp(16px, 1.8vw, 24px)", lineHeight: "1.4" }}
        >
          Boutique CRO strategy, qualitative UX research, and hands-on implementation to help digital teams uncover friction and drive revenue.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to="/contact"
            className="px-10 py-4 bg-navy text-white hover:opacity-90 transition-opacity"
            style={tx.ctaLink}
          >
            Book a Discovery Call
          </Link>
          <Link
            to="/services"
            className="px-10 py-4 border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white transition-colors"
            style={tx.ctaLink}
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="lg:col-span-4 h-[480px] lg:h-[600px] rounded-sm overflow-hidden relative bg-tan-light">
        <img
          src={imgHero}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ filter: "saturate(0)", mixBlendMode: "multiply" }}
          fetchPriority="high"
          loading="eager"
        />
      </div>
    </PageSection>
  );
}

function CredibilityStrip() {
  const stats = [
    { label: "Since 2021", value: "5+ Years Experience" },
    { label: "Enterprise Scale", value: "Growth leadership across multi-market brands" },
    { label: "Capabilities", value: "Cross-functional implementation" },
    { label: "Focus", value: "Driving growth through data & insights" },
  ];

  return (
    <PageSection bg="beige" py="sm" className="border-t border-[rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span
              className="text-text-body uppercase tracking-widest"
              style={tx.micro}
            >
              {stat.label}
            </span>
            <span
              className="text-text-dark"
              style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "18px" }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "Traffic without conversion efficiency",
      desc: "Ad spend is rising, but your landing pages remain stagnant. You're filling a leaky bucket without understanding where the water escapes.",
      icon: svgPaths.p26458580,
      viewBox: "0 0 20.4961 20.1953",
    },
    {
      num: "02",
      title: "Lack of testing strategy",
      desc: "Testing \"random things\" yields random results. Without a clinical roadmap, your experimentation program lacks momentum and meaning.",
      icon: svgPaths.p79f2ae0,
      viewBox: "0 0 22.5469 20.1953",
    },
    {
      num: "03",
      title: "Weak prioritization",
      desc: "Teams often test what's easy rather than what's impactful. I move the needle by focusing on the highest leverage customer friction points.",
      icon: svgPaths.p76a8b00,
      viewBox: "0 0 22.2422 20.1953",
    },
    {
      num: "04",
      title: "No insight into hesitation",
      desc: "Data tells you what happened; qualitative research tells you why. Most teams stop at the 'what' and guess at the 'why'.",
      icon: svgPaths.p656fe40,
      viewBox: "0 0 22.5352 20.1953",
    },
  ];

  return (
    <PageSection bg="cream" py="lg" innerClassName="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
      {/* Left heading */}
      <div className="flex items-start">
        <h2
          className="text-navy"
          style={tx.h2Fluid}
        >
          Why Teams Struggle to{" "}
          <em style={{ fontStyle: "italic" }}>Scale Their Gains</em>
        </h2>
      </div>

      {/* Right: Problem list */}
      <div className="flex flex-col gap-12">
        {problems.map((p, i) => (
          <RevealItem key={p.num} index={i} baseDelay={0.05}>
          <div className="flex gap-6 items-start">
            <div className="shrink-0 mt-1">
              <svg fill="none" viewBox={p.viewBox} width="20" height="20">
                <path d={p.icon} fill="#342000" />
              </svg>
            </div>
            <div className="flex flex-col gap-3">
              <h3
                className="text-text-dark"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "20px" }}
              >
                {p.title}
              </h3>
              <p
                className="text-text-body"
                style={tx.body}
              >
                {p.desc}
              </p>
            </div>
          </div>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}

function ServicesSection() {
  const services = [
    { number: "01", title: "Conversion Diagnostic" },
    { number: "02", title: "Experimentation Roadmap" },
    { number: "03", title: "A/B Testing & Personalization" },
    { number: "04", title: "Qualitative UX Research Sprint" },
    { number: "05", title: "Technical Implementation & Measurement" },
    { number: "06", title: "Fractional CRO Advisory" },
  ];

  return (
    <PageSection bg="beige" py="lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-12">
        <h2
          className="text-text-dark"
          style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "1.15" }}
        >
          Six services.<br />
          <em style={{ fontStyle: "italic", fontWeight: 200 }}>One strategic outcome.</em>
        </h2>
        <Link
          to="/services"
          className="text-slate border-b border-[rgba(67,97,124,0.3)] pb-1 hover:border-slate transition-colors shrink-0"
          style={{ fontFamily: sans, fontWeight: 200, fontSize: "15px", letterSpacing: "0.2px" }}
        >
          Explore All Capabilities →
        </Link>
      </div>

      {/* Typographic list */}
      <div className="flex flex-col">
        {services.map((s, i) => (
          <RevealItem key={s.number} index={i}>
            <Link
              to={`/services?open=${s.number}`}
              className="group flex items-center gap-6 py-5 border-t border-[rgba(0,0,0,0.07)] hover:pl-1 transition-all duration-200"
            >
              <span
                className="shrink-0 tabular-nums"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "11px", color: "var(--slate)", letterSpacing: "1.4px" }}
              >
                {s.number}
              </span>
              <div className="h-px w-8 bg-[rgba(0,0,0,0.12)] shrink-0" />
              <span
                className="text-text-dark group-hover:text-slate transition-colors flex-1"
                style={{ fontFamily: serif, fontWeight: 200, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: "1.2" }}
              >
                {s.title}
              </span>
              <span
                className="text-slate opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px" }}
              >
                →
              </span>
            </Link>
          </RevealItem>
        ))}
        <div className="border-t border-[rgba(0,0,0,0.07)]" />
      </div>
    </PageSection>
  );
}

function MethodSection() {
  const steps: { num: string; label: string; sub: string; active?: boolean; accent?: boolean }[] = [
    { num: "1", label: "Diagnose", sub: "Data Auditing", active: true },
    { num: "2", label: "Research", sub: "Behavioral UX", active: false },
    { num: "3", label: "Prioritize", sub: "RICE Framework", active: false },
    { num: "4", label: "Experiment", sub: "Precision Execution", active: false },
    { num: "5", label: "Scale", sub: "Growth Insight", accent: true },
  ];

  return (
    <PageSection bg="cream" py="lg" innerClassName="flex flex-col items-center gap-24">
      <h2
        className="text-text-dark text-center"
        style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 4vw, 48px)" }}
      >
        The Clinical Method
      </h2>

      <div className="w-full relative">
        {/* Connector line */}
        <div className="absolute top-6 left-0 right-0 h-px bg-[rgba(197,198,204,0.3)]" />

        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <RevealItem key={step.num} index={i} baseDelay={0.05}>
            <div className="flex flex-col items-center gap-4 pt-0">
              <div
                className="relative z-10 flex items-center justify-center rounded-xl size-12 shrink-0"
                style={{
                  background: step.accent ? "#ffddb1" : step.active ? "#060e1a" : "#e6e2dd",
                  border: step.active || step.accent ? "none" : "1px solid rgba(6,14,26,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: sans,
                    fontWeight: 200,
                    fontSize: "14px",
                    color: step.accent ? "#291800" : step.active ? "#fff" : "#060e1a",
                  }}
                >
                  {step.num}
                </span>
              </div>
              <span
                className="text-center"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "16px", color: "var(--text-dark)" }}
              >
                {step.label}
              </span>
              <span
                className="text-center uppercase tracking-wider"
                style={{ ...tx.micro, color: "var(--text-body)", letterSpacing: "0.6px" }}
              >
                {step.sub}
              </span>
            </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function ProofAboutSection() {
  return (
    <PageSection bg="navy-mid" py="lg" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Stats */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <span
            className="text-gold uppercase tracking-widest"
            style={tx.label}
          >
            Proven Outcomes
          </span>
          <h2
            className="text-white"
            style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: "1.1" }}
          >
            I don't just test;<br />I deliver compound gains.
          </h2>
          <div className="grid grid-cols-2 gap-12 mt-4">
            <Stat value="$15.1M" label="Incremental revenue generated through experimentation in 2025 alone." variant="dark" animated />
            <Stat value="+45%" label="Year-over-year revenue growth vs. $10.4M generated in 2024." variant="dark" animated />
          </div>
        </div>

        {/* Right: Quote card */}
        <div className="lg:col-span-5 bg-navy p-12 flex flex-col items-center gap-8">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-navy-mid">
            <img
              src={imgProfile}
              alt="Muqtadaa Miandara"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <blockquote
            className="text-white text-center"
            style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "18px", lineHeight: "1.55" }}
          >
            "The best conversion work starts with empathy and ends with evidence. I believe the best growth work comes from listening closely, thinking clearly, and testing with intention."
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            <span className="text-white" style={tx.bodySm}>Muqtadaa Miandara</span>
            <span className="text-text-muted-invert" style={tx.bodySm}>Founder &amp; Chief Strategist</span>
          </div>
          <Link
            to="/about"
            className="text-gold border-b border-[rgba(255,221,177,0.3)] pb-1 uppercase tracking-widest hover:border-gold transition-colors"
            style={tx.label}
          >
            About the Practice
          </Link>
        </div>
    </PageSection>
  );
}

function FinalCTA() {
  return (
    <PageSection bg="cream" py="xl" narrow innerClassName="flex flex-col items-center gap-8 text-center">
      <h2
        className="text-navy"
        style={tx.h2Fluid}
      >
        Ready to uncover your{" "}
        <em style={{ fontStyle: "italic" }}>next growth opportunity?</em>
      </h2>
      <p
        className="text-text-body"
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "20px", lineHeight: "1.6" }}
      >
        My calendar stays lean to ensure high-touch delivery. Reach out today to see if I'm a fit for your current growth stage.
      </p>
      <Link
        to="/contact"
        className="px-12 py-5 bg-navy text-white hover:opacity-90 transition-opacity mt-2"
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "18px", letterSpacing: "0.45px" }}
      >
        Start a Conversation
      </Link>
    </PageSection>
  );
}

export function Home() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <ProblemSection />
      <ServicesSection />
      <MethodSection />
      <ProofAboutSection />
      <FinalCTA />
    </>
  );
}
