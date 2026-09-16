import { Link } from "react-router";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { SectionHeader } from "../components/ui/section-header";

const NEXT_STEPS = [
  { label: "Home", to: "/", note: "Start from the top." },
  { label: "Services", to: "/services", note: "Six ways to work together." },
  { label: "Contact", to: "/contact", note: "Tell me what you were looking for." },
];

export function NotFound() {
  return (
    <PageSection bg="cream" py="xl" narrow innerClassName="flex flex-col gap-12">
      <SectionHeader
        eyebrow="404"
        eyebrowBadge
        title={<>This page <em style={{ fontStyle: "italic" }}>doesn't exist.</em></>}
        titleWeight={200}
        size="xl"
        as="h1"
        description="The address may be mistyped, or the page has moved. Nothing was lost on this end; here is where to go next."
      />

      <ul className="flex flex-col">
        {NEXT_STEPS.map((step) => (
          <li key={step.to} className="border-t border-[rgba(0,0,0,0.07)] last:border-b">
            <Link
              to={step.to}
              className="group flex items-baseline gap-6 py-5 hover:pl-1 transition-all duration-200"
            >
              <span
                className="text-text-dark group-hover:text-slate transition-colors"
                style={{ fontFamily: serif, fontWeight: 200, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: "1.2" }}
              >
                {step.label}
              </span>
              <span className="text-text-body" style={tx.bodySm}>
                {step.note}
              </span>
              <span
                className="text-slate ml-auto shrink-0"
                style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px" }}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
