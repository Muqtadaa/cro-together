import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { sans } from "../../lib/typography";
import { cn } from "./ui/utils";

export interface Screenshot {
  /** Full-resolution image — used for the lead and the lightbox. */
  src: string;
  /** Optional downscaled image for the thumbnail strip (falls back to src). */
  thumb?: string;
  alt: string;
  caption: string;
}

/**
 * A neutral "browser window" frame — rounded card, subtle border, soft shadow,
 * and a faux chrome top bar with traffic-light dots. Contains the loud blue/red
 * extension screenshots so they read as intentional against the cream palette.
 */
function BrowserFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-white",
        "shadow-[0_24px_60px_-28px_rgba(6,14,26,0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-[rgba(0,0,0,0.07)] bg-tan px-3.5 py-2.5">
        <span className="h-[9px] w-[9px] rounded-full bg-[#d8d2c8]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#e2dcd2]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#ece6dc]" />
      </div>
      {children}
    </div>
  );
}

export function ExtensionGallery({ shots }: { shots: Screenshot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((i) =>
        i === null ? i : (i + dir + shots.length) % shots.length,
      );
    },
    [shots.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  const [lead, ...rest] = shots;

  return (
    <div className="flex flex-col gap-4">
      {/* Lead image */}
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        aria-label={`View screenshot: ${lead.caption}`}
        className="group block w-full cursor-zoom-in rounded-lg text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <BrowserFrame className="transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-26px_rgba(6,14,26,0.42)] motion-reduce:transition-none">
          <img
            src={lead.src}
            alt={lead.alt}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="block aspect-[1280/800] w-full object-cover"
          />
        </BrowserFrame>
      </button>

      {/* Thumbnail strip (remaining shots) */}
      {rest.length > 0 && (
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {rest.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setOpenIndex(i + 1)}
              aria-label={`View screenshot: ${shot.caption}`}
              className="group relative shrink-0 cursor-zoom-in overflow-hidden rounded-md border border-border transition-all duration-200 hover:border-[rgba(6,14,26,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:transition-none"
              style={{ width: "132px" }}
            >
              <img
                src={shot.thumb ?? shot.src}
                alt={shot.alt}
                width={400}
                height={250}
                loading="lazy"
                decoding="async"
                className="block aspect-[1280/800] w-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2 px-4 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
          >
            {isOpen && (
              <DialogPrimitive.Title className="sr-only">
                {shots[openIndex].caption}
              </DialogPrimitive.Title>
            )}

            {/* Close */}
            <DialogPrimitive.Close
              className="absolute -top-1 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-top-12 sm:right-4"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>

            <BrowserFrame>
              {isOpen && (
                <img
                  src={shots[openIndex].src}
                  alt={shots[openIndex].alt}
                  width={1280}
                  height={800}
                  decoding="async"
                  className="block aspect-[1280/800] w-full object-contain bg-white"
                />
              )}
            </BrowserFrame>

            {/* Caption + counter */}
            {isOpen && (
              <div className="mt-4 flex items-center justify-center gap-3 text-white">
                <span style={{ fontFamily: sans, fontWeight: 200, fontSize: "14px" }}>
                  {shots[openIndex].caption}
                </span>
                <span className="text-white/70" style={{ fontFamily: sans, fontWeight: 200, fontSize: "13px" }}>
                  {openIndex + 1} / {shots.length}
                </span>
              </div>
            )}

            {/* Prev / Next */}
            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute top-1/2 left-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-left-2"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute top-1/2 right-0 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-right-2"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
