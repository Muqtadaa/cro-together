import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { serif, sans, tx } from "../../lib/typography";
import { PageSection } from "../components/ui/page-section";

const SERVICE_OPTIONS = [
  "Conversion Diagnostic",
  "Experimentation Roadmap",
  "A/B Testing & Personalization",
  "Qualitative UX Research Sprint",
  "Technical Implementation & Measurement",
  "Fractional CRO Advisory",
];

const LISTBOX_ID = "service-listbox";
const TRIGGER_ID = "service-trigger";

function MultiSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll active option into view
  useEffect(() => {
    if (open && activeIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll('[role="option"]');
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, open]);

  const toggle = useCallback((option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }, [selected, onChange]);

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) toggle(options[activeIndex]);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      setActiveIndex(-1);
      triggerRef.current?.focus();
    }
  }

  const displayText =
    selected.length === 0
      ? "Select all that apply…"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} services selected`;

  const activeOptionId = activeIndex >= 0 ? `service-option-${activeIndex}` : undefined;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        id={TRIGGER_ID}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={LISTBOX_ID}
        aria-labelledby="services-label"
        aria-activedescendant={activeOptionId}
        onClick={() => { setOpen((o) => !o); setActiveIndex(open ? -1 : 0); }}
        onKeyDown={handleTriggerKeyDown}
        style={{
          fontFamily: sans,
          fontWeight: 200,
          fontSize: "16px",
          background: "white",
          border: "1px solid rgba(0,0,0,0.1)",
          padding: "12px 40px 12px 16px",
          width: "100%",
          outline: "none",
          color: selected.length === 0 ? "var(--text-muted)" : "var(--text-dark)",
          textAlign: "left",
          position: "relative",
        }}
      >
        {displayText}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: open ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
            transition: "transform 0.15s ease",
            pointerEvents: "none",
          }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="var(--text-body)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Listbox */}
      {open && (
        <div
          ref={listboxRef}
          id={LISTBOX_ID}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={TRIGGER_ID}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute z-50 w-full bg-white border border-[rgba(0,0,0,0.1)] shadow-md"
          style={{ top: "calc(100% + 2px)", maxHeight: "280px", overflowY: "auto" }}
        >
          {options.map((option, i) => {
            const checked = selected.includes(option);
            const isActive = i === activeIndex;
            return (
              <div
                key={option}
                id={`service-option-${i}`}
                role="option"
                aria-selected={checked}
                onClick={() => toggle(option)}
                onMouseEnter={() => setActiveIndex(i)}
                className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                style={{ background: isActive ? "var(--beige)" : "white" }}
              >
                {/* Checkbox indicator */}
                <span
                  aria-hidden="true"
                  style={{
                    width: "16px",
                    height: "16px",
                    flexShrink: 0,
                    border: checked ? "none" : "1px solid rgba(0,0,0,0.2)",
                    background: checked ? "#060e1a" : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "15px", color: "var(--text-dark)" }}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2" role="group" aria-label="Selected services">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-navy text-white px-3 py-1"
              style={tx.label}
            >
              {s}
              <button
                type="button"
                aria-label={`Remove ${s}`}
                onClick={() => toggle(s)}
                className="ml-1 hover:opacity-70 transition-opacity leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

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

// Replace YOUR_FORMSPREE_ID with the ID from your Formspree dashboard (e.g. "xabcdef1")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdkaokr";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    helpWith: [] as string[],
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          services: formData.helpWith.join(", "),
          message: formData.description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: sans,
    fontWeight: 200,
    fontSize: "16px",
    background: "white",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
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

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
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
        <motion.h3
          className="text-navy"
          style={{ fontFamily: "'Newsreader', serif", fontWeight: 400, fontSize: "32px" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
        >
          Inquiry received.
        </motion.h3>
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="contact-input"
            style={inputStyle}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Work Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="contact-input"
            style={inputStyle}
            autoComplete="email"
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
            type="text"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            style={inputStyle}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="contact-website" style={labelStyle}>Website URL</label>
          <input
            id="contact-website"
            type="url"
            placeholder="https://"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={inputStyle}
            autoComplete="url"
          />
        </div>
      </div>

      {/* Multi-select: What do you need help with? */}
      <div>
        <label id="services-label" style={labelStyle}>What do you need help with?</label>
        <MultiSelect
          options={SERVICE_OPTIONS}
          selected={formData.helpWith}
          onChange={(val) => setFormData({ ...formData, helpWith: val })}
        />
      </div>

      {/* Brief description */}
      <div>
        <label htmlFor="contact-description" style={labelStyle}>Brief Description of Your Challenge</label>
        <textarea
          id="contact-description"
          placeholder="Tell me about your conversion roadblocks..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          className="contact-input"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {/* Error message */}
      {error && (
        <p style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "#b91c1c" }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-5 bg-navy text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "16px", letterSpacing: "0.5px", textTransform: "uppercase" }}
      >
        {submitting ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

export function Contact() {
  return (
    <>
      <HeroSection />

      <PageSection bg="beige" py="md" borderTop>
        <div className="max-w-[860px] mx-auto">
          <div className="bg-white p-10 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
      </PageSection>
    </>
  );
}
