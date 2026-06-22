import { useState } from "react";
import { motion } from "motion/react";
import { sans } from "../../lib/typography";

// Dedicated Formspree form for Tools feedback (separate from the Contact inquiry form).
const FEEDBACK_ENDPOINT = "https://formspree.io/f/xlgyewlv";

const TOOL_OPTIONS = [
  "Optimizely Web QA Helper",
  "Optimizely Power Tools",
  "Both / general feedback",
];

const TYPE_OPTIONS = ["Bug report", "Feature request", "General feedback"];

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

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

/** Native <select> styled to match the form inputs, with a custom chevron. */
function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          style={{ ...inputStyle, paddingRight: "40px", cursor: "pointer" }}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="var(--text-body)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function ToolsFeedbackForm() {
  const [form, setForm] = useState({
    tool: TOOL_OPTIONS[2],
    type: TYPE_OPTIONS[0],
    email: "",
    message: "",
    // Honeypot — Formspree silently drops submissions where this is filled.
    _gotcha: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          tool: form.tool,
          type: form.type,
          email: form.email,
          message: form.message,
          _gotcha: form._gotcha,
          _subject: `Tools feedback — ${form.type}: ${form.tool}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 text-center" role="status" aria-live="polite">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-navy"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h3 className="text-navy" style={{ fontFamily: "'Newsreader', serif", fontWeight: 400, fontSize: "28px" }}>
          Thank you — noted.
        </h3>
        <p className="text-text-body" style={{ fontFamily: sans, fontWeight: 200, fontSize: "17px", lineHeight: "1.6", maxWidth: "40ch" }}>
          Your note's in my inbox. If you left an email, I'll follow up when it's relevant.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot field — hidden from users, catches bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form._gotcha}
        onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="feedback-tool"
          label="Which tool"
          value={form.tool}
          onChange={(v) => setForm({ ...form, tool: v })}
          options={TOOL_OPTIONS}
        />
        <Select
          id="feedback-type"
          label="Type of feedback"
          value={form.type}
          onChange={(v) => setForm({ ...form, type: v })}
          options={TYPE_OPTIONS}
        />
      </div>

      <div>
        <label htmlFor="feedback-email" style={labelStyle}>Email (optional)</label>
        <input
          id="feedback-email"
          type="email"
          placeholder="you@company.com — if you'd like a reply"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="contact-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          style={inputStyle}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="feedback-message" style={labelStyle}>
          Your feedback <span style={{ color: "var(--slate)" }}>*</span>
        </label>
        <textarea
          id="feedback-message"
          placeholder="What did you run into, or what would make these better?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          required
          className="contact-input focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {error && (
        <p role="alert" style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px", color: "#b91c1c" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-navy py-5 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: sans, fontWeight: 200, fontSize: "16px", letterSpacing: "0.5px", textTransform: "uppercase" }}
      >
        {submitting ? "Sending…" : "Send Feedback"}
      </button>
    </form>
  );
}
