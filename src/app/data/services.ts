/**
 * The six services. Rendered as native <details> on /services (each `slug` is
 * the element id, so /services#<slug> deep-links straight to an open item)
 * and as a typographic list on the home page.
 */
export interface ServiceData {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  whoFor: string;
  deliverables: string[];
  stat?: { label: string; value: string };
}

export const SERVICES: ServiceData[] = [
  {
    number: "01",
    slug: "conversion-diagnostic",
    title: "Conversion Diagnostic",
    tagline: "Identify the hidden leaks in your revenue engine.",
    description: "I conduct a deep-tissue scan of your digital funnel, cross-referencing quantitative analytics signals with qualitative friction points. This isn't a checklist; it's a forensic investigation into why users hesitate.",
    whoFor: "Mature platforms seeing a plateau in conversion rates despite steady traffic. Perfect for teams needing fresh, objective data signals.",
    deliverables: ["Friction Heatmap Report", "Analytics Integrity Audit", "15 High-Impact Optimization Wins"],
  },
  {
    number: "02",
    slug: "experimentation-roadmap",
    title: "Experimentation Roadmap",
    tagline: "A prioritized, scalable roadmap for measurable growth.",
    description: "Strategic frameworks to transform your testing backlog into a rigorous 12-month growth thesis. Every experiment prioritized by impact, confidence, and ease — mapped to your business objectives.",
    whoFor: "Growth teams ready to move from ad hoc testing to a systematic, repeatable experimentation program.",
    deliverables: ["Prioritized Test Backlog", "12-Month Growth Thesis", "Stakeholder Alignment Deck"],
  },
  {
    number: "03",
    slug: "ab-testing-personalization",
    title: "A/B Testing & Personalization",
    tagline: "Significant lift in customer lifetime value and ARPU.",
    description: "End-to-end experiment design, implementation, and analysis. I ensure statistical rigor at every step, from hypothesis formation to post-test documentation — building a knowledge base that compounds over time.",
    whoFor: "Teams with development resources who need expert strategic oversight and quality assurance.",
    deliverables: ["Experiment Briefs & Wireframes", "Statistical Analysis Reports", "Personalization Playbook"],
    stat: { value: "142%", label: "Average lift in checkout conversion for D2C partners over 12 months" },
  },
  {
    number: "04",
    slug: "ux-research-sprint",
    title: "Qualitative UX Research Sprint",
    tagline: "Deep empathy that drives smarter product decisions.",
    description: "Quantitative data tells you what happened. Qualitative research tells you why. I run moderated user interviews, unmoderated task studies, and advanced survey design to surface the motivations that metrics can't reveal.",
    whoFor: "Product teams launching new features or redesigns who need to validate assumptions before committing to code.",
    deliverables: ["Moderated User Sessions", "Synthesized Research Report", "Affinity Diagrams & Insight Maps"],
  },
  {
    number: "05",
    slug: "implementation-measurement",
    title: "Technical Implementation & Measurement",
    tagline: "Give absolute confidence in your data integrity.",
    description: "I assess your measurement infrastructure to ensure testing frameworks are implemented correctly. From event taxonomy to attribution modeling, I build data pipelines that power reliable, repeatable experimentation.",
    whoFor: "Organizations using tools like Optimizely, LaunchDarkly, or Amplitude who need expert configuration and governance.",
    deliverables: ["Analytics Implementation Audit", "Testing Tool Configuration", "Custom Reporting Dashboard"],
  },
  {
    number: "06",
    slug: "fractional-cro-advisory",
    title: "Fractional CRO Advisory",
    tagline: "Scalable leadership that evolves with your company.",
    description: "An ongoing partnership where I embed directly into your team's communication channels, participate in your stand-ups, and align with your working product roadmap. This ensures total transparency and friction-free communication to build lasting CRO capability within your organization.",
    whoFor: "Series A–C companies with growing teams who need senior CRO leadership without a full-time hire.",
    deliverables: ["Weekly Prioritization Sessions", "Async Strategy Reviews", "Team Training & Enablement"],
  },
];
