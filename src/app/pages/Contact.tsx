import { useState } from "react";
import { motion } from "motion/react";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";
import { INQUIRY_ENDPOINT, INQUIRY_SERVICES, submitInquiry, type InquiryInput } from "../../lib/inquiry";
import {
  INQUIRY_PARAMS,
  INQUIRY_TOOL_DESCRIPTION,
  INQUIRY_TOOL_NAME,
  inquiryFailedText,
  inquirySentText,
  useInquiryTool,
} from "../../lib/webmcp";

function HeroSection() {
  return (
    <PageSection bg="beige" py="hero" innerClassName="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left: Heading */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <h1
          className="text-navy"
          style={tx.h1}
        >
          Let's Start a{" "}
          <em style={{ fontStyle: "italic" }}>Conversation.</em>
        </h1>
        <p
          className="text-text-body max-w-[640px]"
          style={{ fontFamily: sans, fontWeight: 200, fontSize: "24px", lineHeight: "1.35" }}
        >
          Tell me about your growth challenges. From clinical audits to full-scale experimentation strategy, I help high-growth teams find clarity in their data.
        </p>
      </div>

      {/* Right: Standard note */}
      <div className="lg:col-span-4 pt-0 lg:pt-32">
        <div
          className="relative p-8"
          style={{ borderLeft: "3px solid rgba(67,97,124,0.35)" }}
        >
          <span
            className="text-slate uppercase block mb-3"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", letterSpacing: "1.4px" }}
          >
            The Standard
          </span>
          <blockquote
            className="text-text-dark"
            style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontSize: "18px", lineHeight: "1.4" }}
          >
            "What to expect: I personally review every inquiry and respond within 24 hours."
          </blockquote>
        </div>
      </div>
    </PageSection>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 200,
  fontSize: "16px",
  background: "white",
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "12px 16px",
  width: "100%",
  color: "var(--text-dark)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 200,
  fontSize: "12px",
  color: "var(--text-body)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  display: "block",
  marginBottom: "8px",
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/**
 * A native, uncontrolled form. The `action`/`method` pair lets it post to
 * Formspree without JavaScript; the `toolname`/`tooldescription`/
 * `toolparamdescription` attributes describe it to WebMCP browsers, which
 * fill it in and then hand the submit button to the person (there is
 * deliberately no `toolautosubmit`). The submit handler is the one path
 * both a person and an agent go through.
 */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input: InquiryInput = { ...Object.fromEntries(data), services: data.getAll("services") };
    setError(null);
    setSubmitting(true);

    const pending = submitInquiry(input);

    // An agent-invoked submit gets a structured result instead of a navigation;
    // the page still updates so the person sees the same outcome.
    const native = e.nativeEvent as SubmitEvent;
    if (native.agentInvoked && typeof native.respondWith === "function") {
      native.respondWith(
        pending.then(
          (inquiry) => ({ content: [{ type: "text", text: inquirySentText(inquiry.name) }] }),
          (err: unknown) => ({
            content: [{ type: "text", text: inquiryFailedText(err instanceof Error ? err.message : "Something went wrong.") }],
            isError: true,
          }),
        ),
      );
    }

    pending
      .then(
        () => setSubmitted(true),
        (err: unknown) => setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again."),
      )
      .finally(() => setSubmitting(false));
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.div
          className="w-16 h-16 bg-navy rounded-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <motion.h2
          className="text-navy"
          style={{ fontFamily: serif, fontWeight: 400, fontSize: "32px" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
        >
          Inquiry received.
        </motion.h2>
        <motion.p
          className="text-text-body"
          style={tx.bodyLg}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.25 }}
        >
          I'll personally review your message and respond within 24 hours.
        </motion.p>
      </div>
    );
  }

  return (
    <form
      action={INQUIRY_ENDPOINT}
      method="post"
      toolname={INQUIRY_TOOL_NAME}
      tooldescription={INQUIRY_TOOL_DESCRIPTION}
      aria-describedby="contact-assistant-note"
      onSubmit={handleSubmit}
      className="contact-form flex flex-col gap-6"
    >
      {/* Honeypot field — hidden from people, catches bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        toolparamdescription={INQUIRY_PARAMS._gotcha}
        className="honeypot"
      />
      {/* Subject line for the no-JS post; the JS path sets its own in submitInquiry() */}
      <input
        type="hidden"
        name="_subject"
        value="New inquiry from crotogether.com"
        toolparamdescription={INQUIRY_PARAMS._subject}
      />

      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>
            Name <span style={{ color: "var(--slate)" }}>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            className="contact-input"
            style={inputStyle}
            autoComplete="name"
            maxLength={120}
            toolparamdescription={INQUIRY_PARAMS.name}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>
            Work Email <span style={{ color: "var(--slate)" }}>*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Where should I reply?"
            className="contact-input"
            style={inputStyle}
            autoComplete="email"
            maxLength={254}
            toolparamdescription={INQUIRY_PARAMS.email}
            required
          />
        </div>
      </div>

      {/* Row 2: Company + Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-company" style={labelStyle}>Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="Acme Inc."
            className="contact-input"
            style={inputStyle}
            autoComplete="organization"
            maxLength={120}
            toolparamdescription={INQUIRY_PARAMS.company}
          />
        </div>
        <div>
          <label htmlFor="contact-website" style={labelStyle}>Website URL</label>
          <input
            id="contact-website"
            name="website"
            type="url"
            placeholder="https://"
            className="contact-input"
            style={inputStyle}
            autoComplete="url"
            maxLength={300}
            toolparamdescription={INQUIRY_PARAMS.website}
          />
        </div>
      </div>

      {/* Services: six native checkboxes */}
      <fieldset className="contact-fieldset m-0 min-w-0 border-0 p-0">
        <legend style={{ ...labelStyle, padding: 0 }}>What do you need help with?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {INQUIRY_SERVICES.map((service, i) => (
            <label
              key={service}
              htmlFor={`contact-service-${i}`}
              className="flex items-start gap-3 cursor-pointer"
              style={{ fontFamily: sans, fontWeight: 200, fontSize: "15px", lineHeight: "1.4", color: "var(--text-dark)" }}
            >
              <input
                id={`contact-service-${i}`}
                name="services"
                type="checkbox"
                value={service}
                className="contact-checkbox"
                toolparamdescription={INQUIRY_PARAMS.services}
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Brief description */}
      <div>
        <label htmlFor="contact-message" style={labelStyle}>
          Brief Description of Your Challenge <span style={{ color: "var(--slate)" }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me about your conversion roadblocks..."
          rows={5}
          className="contact-input"
          style={{ ...inputStyle, resize: "vertical" }}
          maxLength={5000}
          toolparamdescription={INQUIRY_PARAMS.message}
          required
        />
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "#b91c1c" }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="contact-submit w-full py-5 bg-navy text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "16px", letterSpacing: "0.5px", textTransform: "uppercase" }}
      >
        {submitting ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

export function Contact() {
  useInquiryTool();

  return (
    <>
      <HeroSection />

      <PageSection bg="beige" py="md" borderTop>
        <div className="max-w-[860px] mx-auto">
          <div className="bg-white p-10 rounded-lg shadow-sm">
            <ContactForm />
          </div>
          <p
            id="contact-assistant-note"
            className="text-text-muted mt-6"
            style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", lineHeight: "1.6" }}
          >
            Using an AI assistant? In browsers that support WebMCP it can fill in this form for you. Nothing is sent
            until you check it and press Submit.
          </p>
        </div>
      </PageSection>
    </>
  );
}
