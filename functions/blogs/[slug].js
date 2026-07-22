// functions/blogs/[slug].js
//
// Cloudflare Pages Function — server-renders the <head> and article text for
// /blogs/<slug> so that clients which DO NOT RUN JAVASCRIPT get a real page.
//
// THE PROBLEM IT SOLVES
//   The site is a client-side SPA. Every route is served the same index.html,
//   whose <head> hardcodes the HOMEPAGE's title and, worse:
//       <link rel="canonical" href="https://www.silenthnyc.com/" />
//   <SEO> corrects that — but only after React boots in a browser. A crawler
//   that does not execute JS therefore sees every blog post claiming to BE the
//   homepage (a duplicate-content signal), with no article text at all.
//
//   Cloudflare's AI Crawl Control happens to run a headless browser for a
//   handful of routes (/, /menu, /events, /story), which masks this. It skips
//   /faq and every blog, has no configuration surface, and is undocumented — so
//   it is not something to depend on. This function is the owned fix.
//
// HOW IT WORKS
//   Fetch the post from Supabase at the edge, then stream index.html through
//   HTMLRewriter, replacing the head tags and injecting the article into #root.
//   Real users are unaffected: React mounts over the injected markup exactly as
//   it does today, and now has meaningful content painted before the JS lands.
//
//   No cloaking: every client — human, Googlebot, ChatGPT-User — gets the same
//   HTML. That is deliberate; UA-sniffing to serve bots different content is the
//   thing Google warns about.
//
// The text rules are imported from src/lib/blogFormat.js — the same module
// BlogContent.jsx uses — so this HTML and the browser's DOM cannot disagree.

import {
  splitBodyText,
  classifyBlock,
  extractFaq,
  buildDescription,
  resolveImageUrl,
} from "../../src/lib/blogFormat.js";
import { RELATED, TITLES } from "../../src/lib/relatedPosts.js";

const SITE = "https://www.silenthnyc.com";

// Supabase credentials for the edge.
//
// These MUST have a literal fallback. Cloudflare Pages Functions run at RUNTIME
// and never see .env (that file is only read at build time), so with no runtime
// variables set in the dashboard the key was "" — fetchPost() returned null and
// this function silently served the bare shell. That is exactly how all 9 blog
// posts shipped broken while the static routes passed.
//
// Inlining the anon key adds NO exposure: it is public by design (Vite already
// inlines it into the JS bundle every visitor downloads), it is committed in
// this repo's .env, and it is read-only against blog_posts — INSERT/UPDATE/
// DELETE are denied at the GRANT level, verified. Set SUPABASE_URL /
// SUPABASE_ANON_KEY as Pages variables to override (e.g. after a key rotation).
const FALLBACK_URL = "https://ggmrhgiclbuvluyanvhd.supabase.co";
const FALLBACK_ANON_KEY =
  "sb_publishable_73fG-32amp7Nwzj_cJ9mhw_ePBn0Mfi";

function creds(env) {
  return {
    url: env.SUPABASE_URL || env.VITE_SUPABASE_URL || FALLBACK_URL,
    key: env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY,
  };
}

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Returns a tagged result so the caller can tell three cases apart:
//   { status: "ok", post }   — a published post exists
//   { status: "notfound" }   — the query SUCCEEDED and matched nothing → 404
//   { status: "error" }      — no key / Supabase unreachable → degrade, never 404
// The distinction matters: a transient Supabase outage must NOT 404 a real post
// (that would deindex live articles), so only a successful empty query is a 404.
async function fetchPost(env, slug) {
  const { url, key } = creds(env);
  if (!key) {
    console.error("[blogs] No Supabase key at runtime — serving bare shell.");
    return { status: "error" };
  }

  const endpoint =
    `${url}/rest/v1/blog_posts` +
    `?select=title,slug,author_name,published_at,updated_at,blog_post_content(title,image_url,body_text)` +
    `&slug=eq.${encodeURIComponent(slug)}&status=eq.published`;

  let res;
  try {
    res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      // Let Cloudflare cache the Supabase read briefly so a burst of crawler hits
      // doesn't become a burst of database reads.
      cf: { cacheTtl: 60, cacheEverything: true },
    });
  } catch {
    console.error("[blogs] Supabase fetch threw — serving bare shell.");
    return { status: "error" };
  }
  if (!res.ok) {
    console.error(`[blogs] Supabase HTTP ${res.status} for slug — serving bare shell.`);
    return { status: "error" };
  }

  const rows = await res.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row || !row.blog_post_content) return { status: "notfound" };
  return { status: "ok", post: row };
}

/** Build the article markup, mirroring BlogContent.jsx's classes closely enough
 *  that the pre-JS paint looks like the finished page rather than raw text. */
// Related-post links per slug (topical internal linking for SEO/AEO). The map
// now lives in src/lib/relatedPosts.js so this SSR list and BlogContent.jsx's
// rendered-DOM list share ONE source and cannot diverge (Basil spec, Task 3).
function relatedHtml(slug) {
  const rel = RELATED[slug] || [];
  if (!rel.length) return "";
  const links = rel
    .map((s2) => `<li><a href="/blogs/${s2}">${esc(TITLES[s2] || s2)}</a></li>`)
    .join("");
  return `<section style="margin-top:40px"><h2 style="font-family:'Monoglyphic',sans-serif;font-weight:400" class="text-[24px]">Related reading</h2><ul>${links}</ul></section>`;
}

function articleHtml(post, paragraphs, heroUrl) {
  const title = post.blog_post_content.title || post.title;

  const blocks = paragraphs
    .map((text) => {
      const type = classifyBlock(text);
      if (type === "h2") {
        return `<h2 style="font-family:'Monoglyphic',sans-serif;font-weight:400" class="text-[26px] tracking-[0.52px] leading-[1.2] mt-6">${esc(text)}</h2>`;
      }
      if (type === "h3") {
        return `<h3 style="font-family:'NeueBit',sans-serif;font-weight:700" class="text-[22px] tracking-[2.2px] leading-[1.2] mt-2">${esc(text)}</h3>`;
      }
      return `<p>${esc(text)}</p>`;
    })
    .join("");

  return (
    `<div class="bg-[#ece1d4] min-h-screen w-full text-[#0b0b0b]">` +
    `<main class="w-full px-6 pt-[100px] pb-32"><div class="mx-auto w-full max-w-[946px]">` +
    `<p style="font-family:'NeueBit',sans-serif;font-weight:400" class="text-[22px] tracking-[2.2px] leading-[1.2] uppercase">A blog full of experiences</p>` +
    `<h1 style="font-family:'Monoglyphic',sans-serif;font-weight:400" class="text-[28px] tracking-[0.56px] leading-[1.2] mb-8">${esc(title)}</h1>` +
    (heroUrl
      ? `<div class="w-full mb-12 rounded-[4px] overflow-hidden"><img src="${esc(heroUrl)}" alt="${esc(title)}" class="w-full h-[clamp(280px,46.875vw,600px)] object-cover"></div>`
      : "") +
    `<article style="font-family:'NeueBit',sans-serif;font-weight:400" class="w-full text-[22px] tracking-[2.2px] leading-[1.2] flex flex-col gap-[1em]">${blocks}</article>` +
    relatedHtml(post.slug) +
      `<nav style="margin-top:48px" class="flex flex-wrap gap-x-6 gap-y-2 text-[18px] uppercase"><a href="/">Silent H</a><a href="/menu">Menu</a><a href="/happy-hour">Happy Hour</a><a href="/events">Private Events</a><a href="/story">Our Story</a><a href="/faq">FAQ</a><a href="/aitch/">Aitch Lounge</a><a href="/blogs">Blog</a></nav>` +
      `</div></main></div>`
  );
}

function jsonLd(post, paragraphs, canonical, description, heroUrl) {
  const title = post.blog_post_content.title || post.title;

  const nodes = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Organization", name: post.author_name || "Silent H" },
      publisher: {
        "@type": "Organization",
        name: "Silent H",
        logo: { "@type": "ImageObject", url: `${SITE}/nav-logo.svg` },
      },
      ...(heroUrl ? { image: [heroUrl] } : {}),
      ...(post.published_at ? { datePublished: post.published_at } : {}),
      ...(post.updated_at || post.published_at
        ? { dateModified: post.updated_at || post.published_at }
        : {}),
    },
  ];

  const faq = extractFaq(paragraphs);
  if (faq.length > 0) {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return nodes;
}

export async function onRequestGet(context) {
  const { request, params, env } = context;

  // Serve the SPA shell from the same deployment's static assets.
  const shellUrl = new URL(request.url);
  shellUrl.pathname = "/index.html";
  const shell = await env.ASSETS.fetch(new Request(shellUrl, { method: "GET" }));

  let result;
  try {
    result = await fetchPost(env, params.slug);
  } catch {
    result = { status: "error" };
  }

  // Supabase unreachable / misconfigured: degrade to the untouched 200 shell so a
  // transient outage never 404s a real post — the SPA still renders it client-side.
  if (result.status === "error") return shell;

  // The query succeeded and matched no published post → a GENUINE 404 (invented,
  // typo'd, or unpublished slug), not a soft-404. Body stays the shell so React
  // paints its "Article not found" UI; the 404 status is what crawlers act on.
  if (result.status === "notfound") {
    const headers = new Headers(shell.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("cache-control", "no-store");
    return new Response(shell.body, { status: 404, headers });
  }

  const post = result.post;

  const paragraphs = splitBodyText(post.blog_post_content.body_text);
  const title = ((t)=> (t && t.length <= 47) ? `${t} | Silent H` : (t || "Silent H Blog"))(post.title || post.blog_post_content.title);
  const canonical = `${SITE}/blogs/${post.slug}`;
  const description = buildDescription(paragraphs);
  const heroUrl = resolveImageUrl(
    post.blog_post_content.image_url,
    creds(env).url
  );

  const ld = jsonLd(post, paragraphs, canonical, description, heroUrl);

  const rewritten = new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(title);
      },
    })
    .on('link[rel="canonical"]', {
      element(el) {
        // THE fix: index.html hardcodes the homepage here, which is why every
        // post reads as a duplicate of "/" to a non-JS crawler.
        el.setAttribute("href", canonical);
      },
    })
    // index.html ships NO <meta name="description">, so there is nothing to
    // rewrite — it has to be appended (done in the "head" handler below). This
    // rule only strips one if it is ever added later, so we can never emit two.
    .on('meta[name="description"]', {
      element(el) {
        el.remove();
      },
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute("content", title);
      },
    })
    .on('meta[property="og:description"]', {
      element(el) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute("content", canonical);
      },
    })
    .on('meta[property="og:image"]', {
      element(el) {
        if (heroUrl) el.setAttribute("content", heroUrl);
      },
    })
    .on("head", {
      element(el) {
        el.append(`<meta name="description" content="${esc(description)}">`, {
          html: true,
        });
        el.append(
          `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`,
          { html: true }
        );
      },
    })
    .on("div#root", {
      element(el) {
        el.setInnerContent(articleHtml(post, paragraphs, heroUrl), { html: true });
      },
    })
    .transform(shell);

  const headers = new Headers(rewritten.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  // Browsers revalidate; Cloudflare's edge holds it for a minute, so publishing
  // from the admin shows up quickly without hammering Supabase.
  headers.set("cache-control", "public, max-age=0, must-revalidate");
  headers.set("cdn-cache-control", "public, s-maxage=60, stale-while-revalidate=300");

  return new Response(rewritten.body, { status: 200, headers });
}
