/**
 * WebMCP: the contact form as an agent-callable tool (owner decision D2: WebMCP
 * only, no remote MCP server).
 *
 * Two tools, one form, and a person presses Submit either way:
 *
 *   - `submit_inquiry` is the <form> in Contact.tsx itself, declared with the
 *     toolname/tooldescription/toolparamdescription attributes. A supporting
 *     browser fills it in and, because toolautosubmit is deliberately absent,
 *     hands the submit button to the person. Only that submit reaches
 *     submitInquiry() (src/lib/inquiry.ts).
 *   - `draft_inquiry` is the imperative tool registered by useDraftInquiryTool()
 *     while the page is mounted. It writes the agent's structured input into
 *     the same form controls, scrolls to the submit button and stops. It
 *     never sends anything: this module does not import submitInquiry() and
 *     never calls fetch.
 */
import { useEffect } from "react";
import { INQUIRY_LIMITS, INQUIRY_SERVICES } from "./inquiry.ts";

/** Name of the declarative form tool (the <form toolname> in Contact.tsx). */
export const INQUIRY_TOOL_NAME = "submit_inquiry";

export const INQUIRY_TOOL_DESCRIPTION =
  "Submits a project inquiry to CRO Together. Use when the user wants to get in touch or start a CRO/experimentation project. Requires name, email and message.";

/** Name of the imperative tool that fills the form in without sending it. */
export const DRAFT_TOOL_NAME = "draft_inquiry";

export const DRAFT_TOOL_DESCRIPTION =
  "Fills in the contact form on this page with a project inquiry to CRO Together so the user can review it and press Submit themselves. Nothing is sent by this tool. Use when the user wants to get in touch or start a CRO/experimentation project. Requires name, email and message.";

/** Per-field guidance shared by the form's toolparamdescription attributes and the tool schema. */
export const INQUIRY_PARAMS = {
  name: "The name the person wants to be addressed by.",
  email: "The person's own email address, for the reply. Ask them for it; never guess or invent one.",
  company: "Optional. The company or brand the inquiry is about.",
  website: "Optional. The website they want help with, as a full URL such as https://example.com.",
  services: `Optional. Which of the six services they are interested in: ${INQUIRY_SERVICES.join("; ")}.`,
  message: "What they need, in their own words: the conversion or experimentation challenge, goals, timeline and any context they gave.",
  _gotcha: "Anti-spam field. Leave it empty; anything in it discards the submission.",
  _subject: "Fixed email subject line for the inbox. Leave as is.",
} as const;

export const inquiryInputSchema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: INQUIRY_LIMITS.name, description: INQUIRY_PARAMS.name },
    email: { type: "string", format: "email", maxLength: INQUIRY_LIMITS.email, description: INQUIRY_PARAMS.email },
    company: { type: "string", maxLength: INQUIRY_LIMITS.company, description: INQUIRY_PARAMS.company },
    website: { type: "string", format: "uri", maxLength: INQUIRY_LIMITS.website, description: INQUIRY_PARAMS.website },
    services: {
      type: "array",
      description: INQUIRY_PARAMS.services,
      items: { type: "string", enum: [...INQUIRY_SERVICES] },
      uniqueItems: true,
    },
    message: { type: "string", maxLength: INQUIRY_LIMITS.message, description: INQUIRY_PARAMS.message },
  },
  required: ["name", "email", "message"],
  additionalProperties: false,
} as const;

/** The text an agent receives after a successful declarative submit. Never echoes the email address. */
export function inquirySentText(name: string): string {
  return `Inquiry sent to CRO Together. ${name} will get a personal reply from Muqtadaa within 24 hours at the email address they provided.`;
}

export function inquiryFailedText(reason: string): string {
  return `The inquiry was not sent. ${reason} Ask the user to review the form on this page and try again.`;
}

/** What draft_inquiry returns once the controls are filled. */
export const DRAFT_FILLED_TEXT =
  "The contact form is filled in. Ask the user to review it and press Submit; nothing is sent until they do.";

/** What draft_inquiry returns when the form is not on the page (another route, or already submitted). */
export const DRAFT_NO_FORM_TEXT =
  "The contact form is not on this page. Open /contact and call this tool again.";

/* ── Filling the form ───────────────────────────────────────────────────── */

function asText(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

/**
 * Sets a control's value the way a person typing would, so React (which
 * tracks the value property) sees the change: the native prototype setter,
 * then input and change events that bubble to React's root listener.
 */
function setValue(control: HTMLInputElement | HTMLTextAreaElement, value: string): void {
  const proto = control instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (setter) setter.call(control, value);
  else control.value = value;
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

function setChecked(box: HTMLInputElement, checked: boolean): void {
  if (box.checked === checked) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked")?.set;
  if (setter) setter.call(box, checked);
  else box.checked = checked;
  box.dispatchEvent(new Event("input", { bubbles: true }));
  box.dispatchEvent(new Event("change", { bubbles: true }));
}

/** The mounted contact form, if the page is showing one. */
export function findInquiryForm(): HTMLFormElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLFormElement>(`form[toolname="${INQUIRY_TOOL_NAME}"]`);
}

/**
 * Writes the agent's input into the form's controls. Unknown services are
 * ignored; every checkbox is set explicitly so a second call replaces the
 * first instead of adding to it. Ends by scrolling to and focusing the submit
 * button, which is the one thing it leaves to the person.
 */
export function fillInquiryForm(form: HTMLFormElement, input: Record<string, unknown>): void {
  const control = (name: string) =>
    form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]:not([type="checkbox"])`);

  const textFields = ["name", "email", "company", "website", "message"] as const;
  for (const field of textFields) {
    const el = control(field);
    if (el) setValue(el, asText(input[field], INQUIRY_LIMITS[field]));
  }

  const wanted = new Set(
    (Array.isArray(input.services) ? input.services : [])
      .filter((s): s is string => typeof s === "string")
      .map((s) => s.trim().toLowerCase()),
  );
  for (const box of form.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="services"]')) {
    setChecked(box, wanted.has(box.value.toLowerCase()));
  }

  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (submit) {
    submit.scrollIntoView({ block: "center", behavior: "smooth" });
    submit.focus({ preventScroll: true });
  }
}

export const draftInquiryTool: WebMCP.ModelContextTool = {
  name: DRAFT_TOOL_NAME,
  title: "Draft an inquiry to CRO Together in the contact form",
  description: DRAFT_TOOL_DESCRIPTION,
  inputSchema: inquiryInputSchema,
  annotations: {
    readOnlyHint: false, // it changes what the page shows
    consequentialHint: false, // but sends nothing: the person still has to press Submit
    untrustedContentHint: false, // the result is our own fixed text
  },
  async execute(input) {
    const form = findInquiryForm();
    if (!form) return { content: [{ type: "text", text: DRAFT_NO_FORM_TEXT }], isError: true };
    fillInquiryForm(form, (input ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: DRAFT_FILLED_TEXT }] };
  },
};

/**
 * The document's model context, if this browser has one. Chrome's origin trial
 * exposes document.modelContext; navigator.modelContext is the earlier
 * spelling some builds still ship.
 */
export function getModelContext(): WebMCP.ModelContext | undefined {
  if (typeof document === "undefined") return undefined;
  return document.modelContext ?? navigator.modelContext;
}

/**
 * Registers draft_inquiry while the contact page is mounted and unregisters
 * it (by aborting the registration signal) on unmount. A no-op everywhere
 * WebMCP is absent, and on the server.
 */
export function useDraftInquiryTool(): void {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;
    const controller = new AbortController();
    modelContext.registerTool(draftInquiryTool, { signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, []);
}
