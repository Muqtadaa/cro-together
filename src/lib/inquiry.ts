/**
 * The single submit path for the contact form.
 *
 * Both the human form (src/app/pages/Contact.tsx) and the WebMCP tool
 * (src/lib/webmcp.ts) call submitInquiry(), so validation, the honeypot and
 * the Formspree request never drift apart. No React in here.
 */

export const INQUIRY_ENDPOINT = "https://formspree.io/f/mzdkaokr";

/** The six services a visitor can ask about; mirrors src/app/data/services.ts titles. */
export const INQUIRY_SERVICES = [
  "Conversion Diagnostic",
  "Experimentation Roadmap",
  "A/B Testing & Personalization",
  "Qualitative UX Research Sprint",
  "Technical Implementation & Measurement",
  "Fractional CRO Advisory",
] as const;

export type InquiryService = (typeof INQUIRY_SERVICES)[number];

/** Length caps applied by normalizeInquiry(); generous for people, hostile to payload dumps. */
export const INQUIRY_LIMITS = {
  name: 120,
  email: 254,
  company: 120,
  website: 300,
  message: 5000,
} as const;

/** Raw input, as it arrives from FormData or from an agent. Every field is optional and untrusted. */
export interface InquiryInput {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  services?: unknown;
  message?: unknown;
  /** Honeypot. Real people never see it; anything in it drops the submission. */
  _gotcha?: unknown;
}

/** A normalised, validated inquiry: what actually gets sent. */
export interface Inquiry {
  name: string;
  email: string;
  company: string;
  website: string;
  services: InquiryService[];
  message: string;
}

/** A submission problem with a message safe to show to a person or return to an agent. */
export class InquiryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InquiryError";
  }
}

// One "@", something either side, a dot in the domain, no whitespace. Deliberately loose:
// Formspree and the reply itself are the real checks.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function multiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n?/g, "\n").trim().slice(0, max);
}

function services(value: unknown): InquiryService[] {
  const list = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const picked = new Set<InquiryService>();
  for (const item of list) {
    const label = text(item, 80);
    const match = INQUIRY_SERVICES.find((s) => s.toLowerCase() === label.toLowerCase());
    if (match) picked.add(match);
  }
  return INQUIRY_SERVICES.filter((s) => picked.has(s));
}

/** Trim, cap and coerce without judging. normalizeInquiry() adds the judgement. */
function shape(input: InquiryInput): Inquiry {
  return {
    name: text(input.name, INQUIRY_LIMITS.name),
    email: text(input.email, INQUIRY_LIMITS.email),
    company: text(input.company, INQUIRY_LIMITS.company),
    website: text(input.website, INQUIRY_LIMITS.website),
    services: services(input.services),
    message: multiline(input.message, INQUIRY_LIMITS.message),
  };
}

/**
 * Trims and caps every field, filters services to the known six, and throws
 * an InquiryError when name, email or message is missing or the email has no
 * plausible shape.
 */
export function normalizeInquiry(input: InquiryInput): Inquiry {
  const inquiry = shape(input);
  if (!inquiry.name) throw new InquiryError("Please add your name.");
  if (!inquiry.email) throw new InquiryError("Please add the email address you would like a reply at.");
  if (!EMAIL_SHAPE.test(inquiry.email)) throw new InquiryError("That email address does not look right. Please check it.");
  if (!inquiry.message) throw new InquiryError("Please describe your challenge in a sentence or two.");
  return inquiry;
}

export function isHoneypotFilled(input: InquiryInput): boolean {
  return typeof input._gotcha === "string" && input._gotcha.trim().length > 0;
}

/**
 * Sends the inquiry to Formspree and resolves with the normalised copy.
 *
 * A filled honeypot resolves without sending anything (bots learn nothing).
 * Validation problems and non-OK responses reject with an InquiryError whose
 * message can be shown as-is; an aborted request rejects with the AbortError.
 */
export async function submitInquiry(input: InquiryInput, { signal }: { signal?: AbortSignal } = {}): Promise<Inquiry> {
  if (isHoneypotFilled(input)) return shape(input);

  const inquiry = normalizeInquiry(input);
  const subject = inquiry.company
    ? `New inquiry from ${inquiry.name} (${inquiry.company})`
    : `New inquiry from ${inquiry.name}`;

  let res: Response;
  try {
    res = await fetch(INQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...inquiry, services: inquiry.services.join(", "), _subject: subject }),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new InquiryError("Network error. Please check your connection and try again.");
  }

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { errors?: { message?: string }[] };
    throw new InquiryError(body?.errors?.[0]?.message ?? `The form service returned an error (HTTP ${res.status}). Please try again.`);
  }

  return inquiry;
}
