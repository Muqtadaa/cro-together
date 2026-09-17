import { Link } from "react-router";
import { serif, sans } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { LINKEDIN_URL, PERSON_NAME, PORTFOLIO_URL, SITE_NAME } from "../../seo/routes";

const LAST_UPDATED = "September 17, 2026";
const FORMSPREE_PRIVACY_URL = "https://formspree.io/legal/privacy-policy/";
const VERCEL_PRIVACY_URL = "https://vercel.com/legal/privacy-policy";

const headingStyle: React.CSSProperties = {
  fontFamily: serif,
  fontWeight: 400,
  fontSize: "22px",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 200,
  fontSize: "15px",
  lineHeight: "1.7",
};

const linkClass = "text-navy underline underline-offset-2 hover:opacity-60 transition-opacity";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} style={{ fontWeight: 300 }}>
      {children}
    </a>
  );
}

/**
 * The privacy policy. Every claim here is checked against what the site
 * actually does: no cookies or analytics, two Formspree forms, self-hosted
 * fonts, Vercel hosting. Update this page when any of that changes.
 */
export function PrivacyPolicy() {
  return (
    <PageSection bg="tan" py="lg" narrow className="min-h-screen" innerClassName="max-w-[760px]">
      <div>
        {/* Header */}
        <div className="mb-12">
          <span
            className="uppercase text-slate"
            style={{ fontFamily: sans, fontWeight: 300, fontSize: "11px", letterSpacing: "1.2px" }}
          >
            Legal
          </span>
          <h1
            className="text-navy mt-3"
            style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(32px, 5vw, 48px)" }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-text-muted mt-3"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] mb-12" />

        {/* Content */}
        <div className="flex flex-col gap-10 text-text-body" style={bodyStyle}>
          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              Overview
            </h2>
            <p>
              {SITE_NAME} (crotogether.com) is a boutique CRO consultancy operated by {PERSON_NAME}. This site exists to
              describe the services, method and results, and to let you get in touch. This policy explains, in plain
              terms, what the site does and does not do with information about you.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              What this site does not do
            </h2>
            <p className="mb-3">Nothing is collected passively. Specifically, this site:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>sets no cookies of any kind, first- or third-party;</li>
              <li>runs no analytics, tag manager, pixel, session recording or heatmap tool;</li>
              <li>embeds no advertising, social widgets or other third-party scripts;</li>
              <li>does not fingerprint, profile or track you across sessions or other sites.</li>
            </ul>
            <p className="mt-3">
              The only information the site ever receives about you is what you type into one of its two forms.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              Contact and feedback forms
            </h2>
            <p className="mb-3">
              There are two forms. The{" "}
              <Link to="/contact" className={linkClass} style={{ fontWeight: 300 }}>
                contact form
              </Link>{" "}
              asks for your name, work email, company, website, the services you are interested in and a description of
              your challenge. The{" "}
              <Link to="/tools" className={linkClass} style={{ fontWeight: 300 }}>
                tools feedback form
              </Link>{" "}
              asks which extension you are writing about, the type of feedback, your message and, optionally, an email
              address if you would like a reply.
            </p>
            <p className="mb-3">
              Both forms are processed by{" "}
              <ExternalLink href="https://formspree.io/">Formspree, Inc.</ExternalLink>, a form-handling service that
              receives what you submit and forwards it to me by email. Formspree stores submissions on its own systems
              and processes them under its{" "}
              <ExternalLink href={FORMSPREE_PRIVACY_URL}>privacy policy</ExternalLink>. Each form also carries a hidden
              anti-spam field that real visitors never see or fill in.
            </p>
            <p>
              What you send is used only to reply to you and, if we go on to work together, to plan that work. It is
              never sold, added to a mailing list or shared with anyone else. Ask at any time and your submission will
              be deleted from my inbox and from Formspree.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              AI-assistant submissions
            </h2>
            <p>
              The contact form is also exposed to browsers that support WebMCP, so an AI assistant can fill it in on your
              behalf. The assistant fills the same form with the same fields, nothing is sent automatically, and you
              confirm before it submits. Once sent, the submission is handled exactly like one you typed yourself.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              Fonts and hosting
            </h2>
            <p className="mb-3">
              The typefaces (Newsreader and Manrope) are served from this site itself, so your browser makes no request to
              Google Fonts or any other font service while rendering a page.
            </p>
            <p>
              The site is hosted by{" "}
              <ExternalLink href="https://vercel.com/">Vercel, Inc.</ExternalLink>. Like any web host, Vercel keeps
              short-lived request logs (IP address, requested URL, user agent, timestamp) to serve pages and defend
              against abuse; these are governed by{" "}
              <ExternalLink href={VERCEL_PRIVACY_URL}>Vercel's privacy policy</ExternalLink>. I do not add analytics on
              top of them and do not use them to identify visitors.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              External links
            </h2>
            <p>
              Some pages link to other sites, such as the Chrome Web Store, LinkedIn, Formspree and my{" "}
              <a href={PORTFOLIO_URL} rel="noopener" className={linkClass} style={{ fontWeight: 300 }}>
                personal site
              </a>
              . This policy applies to crotogether.com only; each of those sites has its own privacy practices, which
              are worth reading before you share anything there.
            </p>
          </section>

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              Your requests
            </h2>
            <p>
              To see, correct or delete anything you have submitted, or to ask a question about this policy, use the{" "}
              <Link to="/contact" className={linkClass} style={{ fontWeight: 300 }}>
                contact page
              </Link>{" "}
              or message me on{" "}
              <ExternalLink href={LINKEDIN_URL}>LinkedIn</ExternalLink>. Requests are answered personally, usually
              within a few days.
            </p>
          </section>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] mt-16 pt-8">
          <p
            className="text-text-muted"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "13px" }}
          >
            © 2026 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
