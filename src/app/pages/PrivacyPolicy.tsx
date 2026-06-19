import { serif, sans } from "../../lib/typography";

export function PrivacyPolicy() {
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

  const sections = [
    {
      title: "Overview",
      body: "CRO Together is a boutique CRO consultancy operated by Muqtadaa Miandara. This website exists to share information about services, methodology, and results. Your privacy is taken seriously — this site does not collect, store, or process any personal data, and does not use cookies of any kind.",
    },
    {
      title: "No Data Collection",
      body: "This website does not collect any personally identifiable information (PII) passively or without your knowledge. The only exception is information you voluntarily provide when submitting a contact enquiry or booking a discovery call — such as your name and email address. This information is used solely to respond to your enquiry and is never sold, shared with third parties, or used for marketing purposes without your explicit consent.",
    },
    {
      title: "No Cookies",
      body: "This website does not use cookies — neither first-party nor third-party. No tracking cookies, analytics cookies, advertising cookies, or session cookies are set when you visit this site. You will not be tracked across sessions or across other websites.",
    },
    {
      title: "No Analytics or Third-Party Tracking",
      body: "This site does not integrate any third-party analytics tools (such as Google Analytics, Meta Pixel, or similar services). No behavioural data, session recordings, heatmaps, or page-view data are collected or shared with any third party.",
    },
    {
      title: "External Links",
      body: "This site may contain links to external websites (e.g. LinkedIn). CRO Together is not responsible for the privacy practices of those sites, and this policy does not apply to them. We encourage you to review the privacy policies of any external sites you visit.",
    },
  ];

  return (
    <main className="bg-tan min-h-screen">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
            Last updated: April 2, 2026
          </p>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] mb-12" />

        {/* Content */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-navy mb-3" style={headingStyle}>
                {s.title}
              </h2>
              <p className="text-text-body" style={bodyStyle}>
                {s.body}
              </p>
            </section>
          ))}

          <section>
            <h2 className="text-navy mb-3" style={headingStyle}>
              Contact
            </h2>
            <p className="text-text-body" style={bodyStyle}>
              If you have any questions about this privacy policy, you are welcome to get in touch via the{" "}
              <a
                href="/contact"
                className="text-navy underline underline-offset-2 hover:opacity-60 transition-opacity"
                style={{ fontFamily: sans, fontWeight: 300 }}
              >
                contact page
              </a>
              .
            </p>
          </section>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.08)] mt-16 pt-8">
          <p
            className="text-text-muted"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "13px" }}
          >
            © 2026 CRO Together. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
