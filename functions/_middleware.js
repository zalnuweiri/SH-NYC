// functions/_middleware.js
//
// Fixes the <head> AND injects the <body> of the STATIC routes at the edge, for
// clients that don't run JavaScript (crawlers, AI assistants, link unfurlers).
//
// THE BUG IT FIXES
//   Every route is served the same index.html, which hardcodes:
//       <title>Silent H | Modern Mexican Restaurant…</title>
//       <link rel="canonical" href="https://www.silenthnyc.com/" />
//   …and ships NO <meta name="description"> at all. <SEO> corrects all of this,
//   but only once React mounts. So a crawler's first pass sees /faq, /blogs,
//   /nye26 (and any route Cloudflare's opaque renderer doesn't happen to cover)
//   each declaring itself to BE the homepage — a duplicate-content signal that
//   can get them dropped from the index — with no description.
//
// SCOPE
//   Static routes only, from src/lib/routeSeo.js (head) and src/lib/routeContent.js
//   (body). /blogs and its per-slug posts are handled by functions/blogs/index.js
//   and functions/blogs/[slug].js, which inject their bodies from Supabase.
//   Real files (/aitch's prebuilt app, sitemap.xml, images) and 301s pass
//   through untouched. Hashed Vite assets receive one additional guard: a
//   missing asset must be a real 404, never the SPA's index.html fallback.
//
// SOFT-404 → REAL 404
//   The SPA fallback answers 200 for ANY path, so invented URLs became soft-404s.
//   Unmatched routes (not in the src/App.jsx allowlist via routeSeo.isKnownRoute)
//   are re-issued as a genuine 404 — body still the shell, so React's "*" route
//   paints a branded "Page not found" while crawlers see the 404 status.
//
// No cloaking: every client gets identical HTML. No user-agent sniffing.

import { canonicalFor, seoFor, isKnownRoute } from "../src/lib/routeSeo.js";
import { bodyHtmlFor } from "../src/lib/routeContent.js";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function onRequest(context) {
  const { request, next } = context;

  const url = new URL(request.url);

  // Cloudflare Pages applies the SPA fallback from public/_redirects to missing
  // files as well as page routes. Without this guard, a request for an old or
  // not-yet-published Vite hash receives index.html with HTTP 200. Because
  // /assets responses are immutable for one year, browsers can then cache HTML
  // under a .js/.css URL and remain broken after the deploy completes.
  if (
    url.pathname.startsWith("/assets/") &&
    (request.method === "GET" || request.method === "HEAD")
  ) {
    const assetResponse = await next();
    const contentType = assetResponse.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      return new Response(request.method === "HEAD" ? null : "Not Found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    return assetResponse;
  }

  // SEO rewriting only applies to GET page loads.
  if (request.method !== "GET") return next();

  const seo = seoFor(url.pathname);

  // Not a head-rewrite route. This is a real static file, a _redirects 301, a
  // /blogs/<slug> (its own function), OR a genuinely unmatched path. Resolve the
  // pipeline first, then turn a soft-404 into a real 404.
  if (!seo) {
    const passthrough = await next();

    // The SPA fallback (public/_redirects: `/* /index.html 200`) answers 200
    // with index.html for ANY path, so invented URLs (/gift-cards, /careers,
    // /this-does-not-exist…) look like real pages to Google — soft-404s filed
    // under "Crawled – not indexed". Only a 200 text/html response can be that
    // shell; real files (images/js/css/xml), redirects and existing 404s are not
    // and pass through untouched. If the shell was served for a path that is not
    // a real route, re-issue it as a genuine 404.
    const passCt = passthrough.headers.get("content-type") || "";
    const isShell200 = passthrough.ok && passCt.includes("text/html");

    if (isShell200 && !isKnownRoute(url.pathname)) {
      // Keep the shell as the BODY so React Router's "*" route paints a branded
      // "Page not found" for humans; the 404 STATUS is what crawlers act on.
      const headers = new Headers(passthrough.headers);
      headers.set("cache-control", "no-store");
      return new Response(passthrough.body, { status: 404, headers });
    }

    return passthrough;
  }

  const response = await next();

  // next() resolves the redirect/asset pipeline. If that produced anything other
  // than HTML — or a redirect from _redirects — leave it exactly as it is.
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.includes("text/html")) return response;

  const canonical = canonicalFor(url.pathname);

  const rewritten = new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(seo.title);
      },
    })
    .on('link[rel="canonical"]', {
      element(el) {
        el.setAttribute("href", canonical);
      },
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute("content", seo.title);
      },
    })
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute("content", canonical);
      },
    })
    // index.html has no <meta name="description">, so it must be appended in the
    // head handler below. This strips one if it is ever added, so we never emit two.
    .on('meta[name="description"]', {
      element(el) {
        el.remove();
      },
    })
    .on('meta[property="og:description"]', {
      element(el) {
        if (seo.description) el.setAttribute("content", seo.description);
      },
    })
    .on("head", {
      element(el) {
        if (seo.description) {
          el.append(`<meta name="description" content="${esc(seo.description)}">`, {
            html: true,
          });
        }
      },
    })
    // Inject the route's real BODY (h1 + copy + links) into the empty #root so a
    // non-JS crawler gets a page, not a blank shell. See src/lib/routeContent.js
    // for why this is safe: main.jsx uses createRoot().render() (not hydrate), so
    // a real browser discards this markup on mount and renders the identical app.
    // If the route has no prerendered body, #root is left untouched — exactly as
    // before — so this can never break a page.
    .on("div#root", {
      element(el) {
        const body = bodyHtmlFor(url.pathname);
        if (body) el.setInnerContent(body, { html: true });
      },
    })
    .transform(response);

  const headers = new Headers(rewritten.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  return new Response(rewritten.body, {
    status: response.status,
    headers,
  });
}
