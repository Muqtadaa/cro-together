/**
 * WebMCP: the contact form as an agent-callable tool (owner decision D2: WebMCP
 * only, no remote MCP server).
 *
 * The <form> in Contact.tsx carries the declarative attributes (toolname,
 * tooldescription, toolparamdescription on every control) so a supporting
 * browser can fill it in and, because toolautosubmit is deliberately absent,
 * hand the submit button to the person. useInquiryTool() additionally
 * registers the same capability imperatively so an agent can call it with a
 * structured result. Both go through submitInquiry() (src/lib/inquiry.ts).
 */
import { useEffect } from "react";
import { INQUIRY_LIMITS, INQUIRY_SERVICES, submitInquiry, type InquiryInput } from "./inquiry.ts";

export const INQUIRY_TOOL_NAME = "submit_inquiry";

export const INQUIRY_TOOL_DESCRIPTION =
  "Submits a project inquiry to CRO Together. Use when the user wants to get in touch or start a CRO/experimentation project. Requires name, email and message.";

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

/** The text an agent receives after a successful call. Never echoes the email address. */
export function inquirySentText(name: string): string {
  return `Inquiry sent to CRO Together. ${name} will get a personal reply from Muqtadaa within 24 hours at the email address they provided.`;
}

export function inquiryFailedText(reason: string): string {
  return `The inquiry was not sent. ${reason} Ask the user to review the form on this page and try again.`;
}

export const inquiryTool: WebMCP.ModelContextTool = {
  name: INQUIRY_TOOL_NAME,
  title: "Send a project inquiry to CRO Together",
  description: INQUIRY_TOOL_DESCRIPTION,
  inputSchema: inquiryInputSchema,
  annotations: {
    readOnlyHint: false,
    consequentialHint: true, // a real message lands in a real inbox: agents should confirm first
    untrustedContentHint: false, // the result is our own fixed confirmation text
  },
  async execute(input, { signal }) {
    try {
      const inquiry = await submitInquiry(input as InquiryInput, { signal });
      return { content: [{ type: "text", text: inquirySentText(inquiry.name) }] };
    } catch (err) {
      const reason = err instanceof Error && err.message ? err.message : "Something went wrong.";
      return { content: [{ type: "text", text: inquiryFailedText(reason) }], isError: true };
    }
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
 * Registers submit_inquiry while the contact page is mounted and unregisters
 * it (by aborting the registration signal) on unmount. A no-op everywhere
 * WebMCP is absent, and on the server.
 */
export function useInquiryTool(): void {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;
    const controller = new AbortController();
    modelContext.registerTool(inquiryTool, { signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, []);
}
