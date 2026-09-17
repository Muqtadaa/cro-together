/**
 * WebMCP typings for this site.
 *
 * `webmcp-types` (the official package from webmachinelearning) declares the
 * global `WebMCP` namespace and `document.modelContext`. This file adds what
 * it leaves out: the declarative form attributes on React's JSX types, the
 * `navigator.modelContext` fallback spelling, and the SubmitEvent members
 * that let one submit handler serve people and agents alike.
 */
/// <reference types="webmcp-types" />

import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    /** Declares the form as a WebMCP tool; maps to ModelContextTool.name. */
    toolname?: string;
    /** Maps to ModelContextTool.description. */
    tooldescription?: string;
    /**
     * Lets an agent submit without the person checking the form first.
     * Never set on this site: omitting it is what makes the browser hand the
     * submit button back to the person.
     */
    toolautosubmit?: "";
  }

  interface InputHTMLAttributes<T> {
    /** Description of this control's property in the synthesised input schema. */
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface SelectHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

declare global {
  interface SubmitEvent {
    /** True when an agent, not a person, submitted the form. Absent outside WebMCP browsers. */
    readonly agentInvoked?: boolean;
    /**
     * Replaces the form's navigation with a promise whose value becomes the
     * agent's tool result. preventDefault() must be called first.
     */
    respondWith?(agentResponse: Promise<unknown>): void;
  }

  interface Navigator {
    /** The earlier spelling of document.modelContext, still present in some builds. */
    readonly modelContext?: WebMCP.ModelContext;
  }
}

export {};
