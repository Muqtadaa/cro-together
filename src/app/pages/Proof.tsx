import { Link } from "react-router";
import imgChart from "../../assets/analytics-tablet.jpg";
import imgSaaS from "../../assets/lightbulb.jpg";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";
import { Stat } from "../components/ui/stat";
import { RevealItem } from "../../lib/reveal";

function HeroSection() {
  return (
    <PageSection bg="beige" py="hero">
      <div className="max-w-[768px] flex flex-col gap-6">
        <SectionHeader
          eyebrow="In-House Growth Track Record"
          eyebrowBadge
          title={<>$15.1M<br />Incremental<br />Revenue.<br />One Year.</>}
          titleWeight={200}
          size="xl"
          as="h1"
          description="A +45% year-over-year improvement, generated through a rigorous in-house experimentation and personalisation programme spanning multiple lines of business. Every dollar is traceable to a hypothesis, a test, and a decision."
        />
      </div>
    </PageSection>
  );
}

function AnnualSnapshot() {
  const stats = [
    { value: "$15.1M", label: "Total incremental revenue in 2025" },
    { value: "+45%", label: "Year-over-year growth vs. $10.4M in 2024" },
    { value: "$5.7M", label: "Q4 alone — the strongest single quarter" },
    { value: "31%", label: "Win Rate across 145 tests conducted in 2024" },
  ];

  return (
    <PageSection bg="navy" py="md">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((s, i) => (
          <Stat key={i} value={s.value} label={s.label} variant="dark" size="fluid" borderTop animated />
        ))}
      </div>
    </PageSection>
  );
}

function FeaturedCase() {
  return (
    <PageSection bg="cream" py="md" borderTop>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Image */}
        <div className="lg:col-span-7 rounded-lg overflow-hidden bg-tan" style={{ height: "430px" }}>
          <img
            src={imgChart}
            alt="Bento panel engagement lift"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0)", objectPosition: "center" }}
            loading="lazy"
          />
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-5 flex flex-col gap-6 pt-4">
          <span className="text-text-body uppercase" style={tx.eyebrow}>
            Featured Win · Rent-A-Center Homepage
          </span>
          <h2 className="text-text-dark" style={tx.h2}>
            Killing the Carousel: The Bento Panel Revolution
          </h2>

          {/* Result badge */}
          <div className="inline-flex self-start flex-col bg-tan-light px-4 py-2 rounded-sm">
            <span className="text-text-body uppercase" style={{ fontFamily: sans, fontWeight: 200, fontSize: "10px", letterSpacing: "-0.5px" }}>
              Peak Engagement Lift
            </span>
            <span className="text-navy" style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px, 2.5vw, 28px)", lineHeight: "1.2" }}>
              +291% Panel Clicks
            </span>
          </div>

          {/* The Challenge */}
          <div className="flex flex-col gap-2">
            <h3 className="text-slate uppercase" style={{ fontFamily: sans, fontWeight: 300, fontSize: "11px", letterSpacing: "1.5px" }}>
              The Challenge
            </h3>
            <p className="text-text-body" style={tx.body}>
              The homepage relied on auto-scrolling carousels that users had learned to ignore. Banner blindness was suppressing click-through across every campaign — seasonal, promotional, and product-led alike.
            </p>
          </div>

          {/* The Approach */}
          <div className="flex flex-col gap-2">
            <h3 className="text-slate uppercase" style={{ fontFamily: sans, fontWeight: 300, fontSize: "11px", letterSpacing: "1.5px" }}>
              The Approach
            </h3>
            <p className="text-text-body" style={tx.body}>
              I designed and validated a static bento-grid layout across five sequential seasonal campaigns — from Rocktober to Black Friday. Variation 1 of the Rocktober bento drove +117.03% All Panel CTR; the $10 Pays campaign peaked at +291.21%. The bento format was then adopted as the homepage standard.
            </p>
          </div>

          {/* Supporting metrics */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { v: "+258%", l: "Alt. variation lift" },
              { v: "+117%", l: "CTR, Rocktober" },
              { v: "+28%", l: "Black Friday lift" },
            ].map((m) => (
              <div key={m.l} className="bg-beige px-3 py-3 flex flex-col gap-1">
                <span className="text-navy" style={tx.statXs}>{m.v}</span>
                <span className="text-text-body" style={{ fontFamily: sans, fontWeight: 200, fontSize: "11px", lineHeight: "1.4" }}>
                  {m.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function DualCase() {
  return (
    <PageSection bg="beige" py="md" borderTop>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left: Personalisation */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-text-body uppercase" style={tx.eyebrow}>
              Personalisation at Scale
            </span>
            <h2 className="text-text-dark" style={tx.h2Md}>
              First-Party Data Driving the Homepage
            </h2>
          </div>

          <div className="rounded-lg overflow-hidden bg-tan-light relative" style={{ height: "300px" }}>
            <img
              src={imgSaaS}
              alt="Personalised homepage panels"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "saturate(0.2)" }}
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white px-5 py-4 flex flex-col gap-1">
              <span className="text-navy" style={tx.statMd}>+28%</span>
              <p className="text-text-body" style={tx.bodyXs}>
                Relative lift in Product Web Orders for returning customers with browsing history (6.39% vs 4.99%)
              </p>
            </div>
            <div className="bg-white px-5 py-4 flex flex-col gap-1">
              <span className="text-navy" style={tx.statMd}>2 LOBs</span>
              <p className="text-text-body" style={tx.bodyXs}>
                Personalisation scaled from RAC homepage to Acima marketplace, amplified via wishlist email campaigns
              </p>
            </div>
          </div>

          <blockquote
            className="border-l-2 border-slate pl-4"
            style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "17px", color: "var(--text-dark)", lineHeight: "1.5" }}
          >
            "Surfacing recently viewed products in the bento for returning customers wasn't a UX guess — it was a hypothesis built from first-party browsing data, validated in the wild."
          </blockquote>
        </div>

        {/* Right: OOS Rescue (dark card) */}
        <div className="bg-navy p-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-text-muted-invert uppercase" style={tx.eyebrow}>
              Dead-End Page Rescue
            </span>
            <h2 className="text-white" style={tx.h2Md}>
              Out of Stock Experience Redesign
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gold" style={tx.statXl}>+35.7%</span>
            <span className="text-text-muted-invert uppercase" style={tx.micro}>
              Online Checkout Conversion Lift
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-text-muted-invert uppercase" style={tx.eyebrow}>The Insight</h3>
            <p className="text-[rgba(255,255,255,0.7)]" style={tx.bodyMd}>
              Out-of-stock product pages were a conversion black hole — users hit a dead end and left. Qualitative research revealed that users weren't opposed to alternatives; they simply weren't being offered any.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-text-muted-invert uppercase" style={tx.eyebrow}>The Outcome</h3>
            <p className="text-[rgba(255,255,255,0.7)]" style={tx.bodyMd}>
              Redesigned the OOS PDP to surface substitute products and flexible options. Product Web Orders lifted +8.68–11.19%, Online Checkout conversions +35.74%, and Reservations +27.53%. A dead end became a revenue touchpoint.
            </p>
          </div>

          {/* Supporting metrics */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { v: "+11.2%", l: "Product Web Orders" },
              { v: "+27.5%", l: "Reservations" },
              { v: "+35.7%", l: "Online Checkout Conversion" },
            ].map((m) => (
              <div key={m.l} className="border border-[rgba(255,255,255,0.1)] px-3 py-3 flex flex-col gap-1">
                <span className="text-gold" style={tx.statXs}>{m.v}</span>
                <span className="text-text-body" style={{ fontFamily: sans, fontWeight: 200, fontSize: "11px", lineHeight: "1.4" }}>
                  {m.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function WinsGrid() {
  const wins = [
    {
      tag: "Conversion Optimisation",
      title: "Modal for Social New Users",
      summary:
        "A targeted modal popup for users arriving via social channels — presented at the right moment in the flow — delivered +187.29% Online Checkout conversion for Social New Users, with a positive lift in Product Web Leads.",
      metric: "+187%",
      metricLabel: "Online Checkout Conversion",
    },
    {
      tag: "Copywriting & Value Messaging",
      title: "Value Props in the Bento Panel",
      summary:
        "Replaced default value propositions in the Feature Panel with research-backed messaging. In under two weeks the variation generated $53K in incremental revenue, proving the power of right-message, right-moment framing.",
      metric: "$53K",
      metricLabel: "Incremental revenue in <2 weeks",
    },
    {
      tag: "Funnel Friction Reduction",
      title: "Remove Online Checkout Off-Ramps",
      summary:
        "Users were being given unnecessary exit points during the finance application flow. Redirecting them to the happy path improved Online Checkout conversion by +8.01% and cut Checkout Bounce by -6.32%.",
      metric: "−6.3%",
      metricLabel: "Checkout Bounce Rate",
    },
    {
      tag: "Cross-Sell & Ecosystem Growth",
      title: "RAC Declines → Brigit Cross-Sell",
      summary:
        "Rather than losing declined RAC customers entirely, I introduced a Brigit cross-sell path. Across 9,522 impressions: 827 clicks, 261 installs, 159 sign-ups, 108 bank connects, and 20 approvals — users retained in the Upbound ecosystem.",
      metric: "261",
      metricLabel: "App installs from declined users",
    },
  ];

  return (
    <PageSection bg="cream" py="md" borderTop>
      <SectionHeader
        eyebrow="Supporting Wins"
        title="More experiments. More evidence."
        titleWeight={200}
        size="md"
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {wins.map((w, i) => (
          <RevealItem key={w.title} index={i}>
          <div className="bg-white p-8 flex flex-col gap-5 h-full">
            <span
              className="text-slate uppercase self-start bg-[rgba(67,97,124,0.07)] px-2 py-1 rounded-sm"
              style={{ fontFamily: sans, fontWeight: 200, fontSize: "9px", letterSpacing: "1.2px" }}
            >
              {w.tag}
            </span>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-text-dark" style={tx.h3}>
                {w.title}
              </h3>
              <div className="shrink-0 flex flex-col items-end">
                <span className="text-navy" style={tx.statSm}>{w.metric}</span>
                <span
                  className="text-text-body text-right"
                  style={{ fontFamily: sans, fontWeight: 200, fontSize: "10px", lineHeight: "1.4", maxWidth: "120px" }}
                >
                  {w.metricLabel}
                </span>
              </div>
            </div>
            <p className="text-text-body flex-1" style={tx.bodyMd}>
              {w.summary}
            </p>
          </div>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}

function FinalCTA() {
  return (
    <PageSection bg="cream" py="lg" borderTop innerClassName="flex flex-col items-center gap-6 text-center">
      <SectionHeader
        title="Ready for your next strategic win?"
        titleWeight={400}
        size="xl"
        className="items-center text-center"
      />
      <p className="text-text-body max-w-[560px]" style={tx.bodyLg}>
        Every result above started with a conversation and a hypothesis. Let's find yours.
      </p>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Link
          to="/contact"
          className="px-10 py-4 bg-navy text-white hover:opacity-90 transition-opacity flex items-center gap-2"
          style={tx.ctaLink}
        >
          Start a Conversation ↗
        </Link>
        <Link
          to="/about"
          className="px-10 py-4 border border-[rgba(6,14,26,0.2)] text-navy hover:border-navy transition-colors"
          style={tx.ctaLink}
        >
          View the methodology
        </Link>
      </div>
    </PageSection>
  );
}

export function Proof() {
  return (
    <>
      <HeroSection />
      <AnnualSnapshot />
      <FeaturedCase />
      <DualCase />
      <WinsGrid />
      <FinalCTA />
    </>
  );
}
