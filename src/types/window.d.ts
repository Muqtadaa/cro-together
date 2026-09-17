/**
 * Globals this site puts on `window`.
 */
declare global {
  interface Window {
    /**
     * Set by src/entry.client.tsx once hydrateRoot() has been called. The
     * inline watchdog in src/root.tsx removes the `html.js` class when this
     * is still unset 4 s after the document started, so the scroll reveals
     * never stay hidden if the bundle does not run.
     */
    __hydrated?: boolean;
  }
}

export {};
