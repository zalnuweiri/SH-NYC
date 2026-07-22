// Cloudflare Pages Function — injects the published blog index into /blogs so
// clients that do not run JavaScript receive its H1, introduction and post
// links in the raw HTML. Individual posts remain handled by [slug].js.

const FALLBACK_URL = "https://ggmrhgiclbuvluyanvhd.supabase.co";
const FALLBACK_ANON_KEY =
  "sb_publishable_73fG-32amp7Nwzj_cJ9mhw_ePBn0Mfi";

function creds(env) {
  return {
    url: env.SUPABASE_URL || env.VITE_SUPABASE_URL || FALLBACK_URL,
    key:
      env.SUPABASE_ANON_KEY ||
      env.VITE_SUPABASE_ANON_KEY ||
      FALLBACK_ANON_KEY,
  };
}

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function postHref(post) {
  const href = String(post.href || "").trim();
  if (/^https?:\/\//i.test(href) || href.startsWith("/")) return href;
  return post.slug ? `/blogs/${encodeURIComponent(post.slug)}` : "/blogs";
}

async function fetchPosts(env) {
  const { url, key } = creds(env);
  const endpoint =
    `${url}/rest/v1/blog_posts` +
    `?select=id,title,href,slug,published_at,created_at,sort_order` +
    `&status=eq.published&order=sort_order.asc,published_at.desc`;

  const response = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cf: { cacheTtl: 60, cacheEverything: true },
  });

  if (!response.ok) {
    throw new Error(`Supabase HTTP ${response.status}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

function blogIndexHtml(posts) {
  const articles = posts
    .map(
      (post) =>
        `<article><h2><a href="${esc(postHref(post))}">${esc(
          post.title || "Untitled story"
        )}</a></h2></article>`
    )
    .join("");

  return (
    `<div style="max-width:1140px;margin:0 auto;padding:100px 24px">` +
    `<header><h1>A blog full of experiences</h1>` +
    `<p>A closer look at the flavours, culture, and experiences behind Silent H.</p></header>` +
    `<main><section aria-label="Published articles">${articles}</section></main>` +
    `<nav><a href="/">Home</a> <a href="/menu">Menu</a> ` +
    `<a href="/happy-hour">Happy Hour</a> <a href="/events">Plan an Event</a> ` +
    `<a href="/story">Our Story</a> <a href="/faq">FAQ</a></nav></div>`
  );
}

export async function onRequestGet(context) {
  const { request, env } = context;

  // Fetch the deployment's normal SPA shell. React still replaces this injected
  // markup with the existing BlogsPage when JavaScript starts.
  const shellUrl = new URL(request.url);
  shellUrl.pathname = "/index.html";
  const shell = await env.ASSETS.fetch(new Request(shellUrl, { method: "GET" }));

  let posts;
  try {
    posts = await fetchPosts(env);
  } catch (error) {
    // Fail open: a temporary database problem must never take /blogs down. The
    // existing SPA shell is returned and the browser can fetch posts normally.
    console.error(`[blogs index] ${error.message} — serving SPA shell.`);
    return shell;
  }

  const rewritten = new HTMLRewriter()
    .on("div#root", {
      element(el) {
        el.setInnerContent(blogIndexHtml(posts), { html: true });
      },
    })
    .transform(shell);

  const headers = new Headers(rewritten.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "public, max-age=0, must-revalidate");
  headers.set(
    "cdn-cache-control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );

  return new Response(rewritten.body, { status: 200, headers });
}
