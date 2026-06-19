import { Link } from "react-router";
import imgProfessionalPortrait from "../../assets/profile.jpeg";
import svgPaths from "../../imports/svg-7e3xnlrxqu";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";

function HeroSection() {
  return (
    <PageSection bg="beige" py="hero" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left: Heading */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <SectionHeader
          eyebrow="The Methodology"
          title={<>Bridging the Gap<br />Between{" "}<em style={{ fontStyle: "italic" }}>Strategy</em><br />and{" "}<em style={{ fontStyle: "italic" }}>Execution.</em></>}
          titleWeight={200}
          size="xl"
          as="h1"
        />
      </div>

      {/* Right: Description */}
      <div className="lg:col-span-4 pt-0 lg:pt-24">
        <p
          className="text-text-body"
          style={tx.bodyLg}
        >
          In a landscape saturated with generic "optimization," I provide the clinical precision required to turn raw data into durable business growth.
        </p>
      </div>
    </PageSection>
  );
}

function BioSection() {
  return (
    <PageSection bg="beige" py="none" innerClassName="pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left: Portrait */}
      <div className="lg:col-span-5 rounded-sm overflow-hidden bg-tan-light" style={{ height: "520px" }}>
        <img
          src={imgProfessionalPortrait}
          alt="Muqtadaa Miandara"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Right: Bio */}
      <div className="lg:col-span-7 flex flex-col gap-6 py-8">
        <h2
          className="text-navy"
          style={tx.h2}
        >
          Cross-functional expertise that scales.
        </h2>

        <div className="flex flex-col gap-6">
          {[
            "My approach is rooted in the belief that experimentation is not a siloed task, but a thread that must weave through the entire product lifecycle. With a background spanning UX research, deep analytics, and front-end engineering, I sit at the intersection of what is desirable, what is measurable, and what is possible.",
            "I have spent a decade refining a workflow that eliminates friction between stakeholders. By speaking the language of designers, developers, and executives simultaneously, I ensure that strategic insights don't just sit in a slide deck — they manifest in the product.",
            "Clients partner with me not just for the data I produce, but for the senior judgment I bring to every decision. It's about knowing which experiments are worth running and, more importantly, which ones are not.",
          ].map((para) => (
            <p key={para.slice(0, 20)} className="text-text-body" style={tx.bodyLg}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function SkillsSection() {
  const skills = [
    {
      title: "Experimentation",
      desc: "Hypothesis engineering, A/B/n testing and personalisation strategy, and statistical validation frameworks — built into quality roadmaps prioritised by RICE scoring for high-velocity growth teams.",
      icon: svgPaths.p1cb77890,
      viewBox: "0 0 212 21.2499",
    },
    {
      title: "UX Research",
      desc: "Moderated studies, unmoderated tasks on look-alike panels, and live site intercepts — synthesised into actionable insight using tools like UserTesting, Medallia, and Maze.",
      icon: svgPaths.p20c79560,
      viewBox: "0 0 212 23.7499",
    },
    {
      title: "Analytics",
      desc: "Custom tracking implementations, customer attribution, and revenue impact modelling — including a systematic process for defining MDE, time-to-significance estimates based on traffic throughput and segment reach, and conversion rate baselines for experiment setup.",
      icon: svgPaths.p31247f40,
      viewBox: "0 0 212 21.4302",
    },
    {
      title: "Implementation",
      desc: "HTML, CSS, JavaScript, and React proficiency for building and deploying experiments end-to-end — including API integrations and hands-on platform work across Optimizely, VWO, and similar experimentation tools.",
      icon: svgPaths.p892b2a0,
      viewBox: "0 0 24.1346 14.1346",
      natural: true,
    },
  ];

  return (
    <PageSection bg="cream" py="lg">
      <SectionHeader
        eyebrow="Core Competencies"
        title="A clinical breakdown of skills."
        titleWeight={200}
        size="lg"
        className="mb-16"
      />

      <div className="flex flex-col">
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-8 border-t border-[rgba(0,0,0,0.07)] items-start"
          >
            {/* Icon + title */}
            <div className="lg:col-span-4 flex items-center gap-5">
              <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                <svg
                  style={{ height: "20px", width: skill.natural ? "auto" : "20px" }}
                  viewBox={skill.viewBox}
                  fill="none"
                  preserveAspectRatio={skill.natural ? "xMinYMid meet" : "xMidYMid meet"}
                >
                  <path d={skill.icon} fill="#43617C" />
                </svg>
              </div>
              <h3
                className="text-navy"
                style={{ fontFamily: serif, fontWeight: 200, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: "1.2" }}
              >
                {skill.title}
              </h3>
            </div>
            {/* Description */}
            <p className="lg:col-span-8 text-text-body" style={tx.bodyMd}>
              {skill.desc}
            </p>
          </div>
        ))}
        <div className="border-t border-[rgba(0,0,0,0.07)]" />
      </div>
    </PageSection>
  );
}

function CollaborationSection() {
  const points = [
    {
      num: "01",
      title: "Embedded Integration",
      desc: "I integrate directly into your workflow — joining stand-ups, aligning with your product roadmap, and maintaining total transparency and friction-free communication at every stage.",
    },
    {
      num: "02",
      title: "Evidence-Led Remapping",
      desc: "I prioritise recommendations using RICE (Reach, Impact, Confidence, Effort) frameworks, grounded in practical experience. Every recommendation is backed by clinical hypotheses and a measurable outcome.",
    },
    {
      num: "03",
      title: "Experimentation Workflow Design",
      desc: "I design experimentation workflows custom to the business — building scalable, repeatable processes and integrating AI and agent-supported tooling where it meaningfully accelerates velocity and decision quality.",
    },
    {
      num: "04",
      title: "Practical Knowledge Transfer",
      desc: "My goal is to eventually make myself obsolete. I document processes and train internal teams so that experimentation becomes a core capability of your organization.",
    },
  ];

  return (
    <PageSection bg="beige" py="lg" innerClassName="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-navy"
          style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(36px, 4vw, 48px)", lineHeight: "1.1" }}
        >
          How I{" "}
          <em style={{ fontStyle: "italic" }}>Collaborate.</em>
        </h2>
        <p
          className="text-text-body mt-4"
          style={tx.bodyLg}
        >
          I don't operate as a distant vendor. I embed into your workflow as a senior strategic partner, ensuring alignment at every stage.
        </p>
        <div
          className="mt-6 p-5 rounded-sm"
          style={{ background: "rgba(67,97,124,0.08)", borderLeft: "3px solid #43617c" }}
        >
          <p className="text-slate" style={tx.bodySm}>
            <strong style={{ fontWeight: 300 }}>The difference I offer:</strong> Clinically structured data collection and evidence-based judgment that turns insights into action plans with true business impact.
          </p>
        </div>
      </div>

      {/* Right: numbered points */}
      <div className="flex flex-col gap-10">
        {points.map((point) => (
          <div key={point.num} className="flex gap-6 items-start">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span
                className="text-slate font-semibold"
                style={{ fontFamily: sans, fontWeight: 300, fontSize: "14px" }}
              >
                {point.num}
              </span>
              <div className="w-px flex-1 bg-[rgba(67,97,124,0.2)] min-h-[40px]" />
            </div>
            <div className="flex flex-col gap-2">
              <h3
                className="text-text-dark"
                style={{ fontFamily: sans, fontWeight: 300, fontSize: "18px" }}
              >
                {point.title}
              </h3>
              <p className="text-text-body" style={tx.bodyMd}>
                {point.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function CTASection() {
  return (
    <PageSection bg="navy" py="lg" innerClassName="flex flex-col items-center gap-8 text-center">
      <SectionHeader
        title={<>Let's discuss your{" "}<em style={{ fontStyle: "italic" }}>roadmap.</em></>}
        titleWeight={400}
        size="xl"
        variant="dark"
        as="h2"
      />
      <Link
        to="/contact"
        className="px-10 py-4 bg-white text-navy hover:bg-beige transition-colors mt-2"
        style={{ fontFamily: sans, fontWeight: 300, fontSize: "16px" }}
      >
        Start a Conversation
      </Link>
    </PageSection>
  );
}

export function About() {
  return (
    <>
      <HeroSection />
      <BioSection />
      <SkillsSection />
      <CollaborationSection />
      <CTASection />
    </>
  );
}
