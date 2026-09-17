import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";

/**
 * Build-time renderer for the prerender step (react-router.config.ts).
 * The site is static (`ssr: false`), so this never runs on a server: it
 * renders each registered route to a complete HTML document once, at build.
 *
 * It waits for `onAllReady` so React resolves every Suspense boundary,
 * including React Router's hydration-data transfer, before the document is
 * captured; `renderToString` would leave that boundary in its fallback state
 * and the page would never hydrate. Providing the entry explicitly keeps
 * @react-router/node and isbot out of the runtime dependencies.
 */
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  return new Promise<Response>((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onAllReady() {
          const chunks: Buffer[] = [];
          const body = new PassThrough();
          body.on("data", (chunk: Buffer) => chunks.push(chunk));
          body.on("end", () => {
            responseHeaders.set("Content-Type", "text/html; charset=utf-8");
            resolve(
              new Response(Buffer.concat(chunks).toString("utf8"), {
                status: responseStatusCode,
                headers: responseHeaders,
              }),
            );
          });
          body.on("error", reject);
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error);
        },
      },
    );
  });
}
