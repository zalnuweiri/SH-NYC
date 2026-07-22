/**
 * verify-seo.mjs — proves the pre-JavaScript HTML is correct on every route.
 *
 *   node scripts/verify-seo.mjs                      # production
 *   node scripts/verify-seo.mjs http://localhost:8788  # local wrangler
 *
 * Exits 0 if everything passes, 1 if anything fails. Safe to run any time.
 *
 * WHY A PLAIN USER-AGENT
 *   Cloudflare's AI Crawl Control runs a headless browser for *recognised*
 *   crawler UAs (Googlebot, GPTBot, ChatGPT-User, PerplexityBot) on some routes.
 *   Testing with one of those can hand back a fully-rendered page whether or not
 *   OUR code works — it hides the bug instead of proving the fix. A plain UA gets
 *   no such help, so what comes back is exactly what our edge functions emit.
 *   That is the strict test, and it is what this script uses deliberately.
 *
 * WHAT IT ASSERTS, per route, with NO JavaScript executed:
 *   • HTTP 200
 *   • <link rel="canonical"> points at the route ITSELF, not the homepage
 *     (index.html hardcodes the homepage canonical — this is the bug that gets
 *     pages treated as duplicates and dropped from the index)
 *   • a <title> that isn't index.html's homepage default
 *   • exactly one <meta name="description">
 *   • prerendered static routes additionally: a real <body> in the raw HTML —
 *     exactly one <h1> and a non-empty #root (the empty-shell bug this fixes)
 *   • blog posts additionally: article text present in the HTML, plus
 *     BlogPosting + BreadcrumbList JSON-LD
 */
import { loadEnv } from "vite";

// Where we FETCH from (can be localhost / a preview deployment)…
const BASE = (process.argv[2] || "https://www.silenthnyc.com").replace(/\/+$/, "");
// …versus what a canonical must POINT AT. These differ on purpose: a canonical
// always names the production URL no matter which host served the page, so
// comparing it to BASE would wrongly fail every local run.
const SITE = "https://www.silenthnyc.com";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };

// index.html's hardcoded default — seeing this on any route means the page was
// served raw and nothing corrected it.
const SHELL_TITLE = "Silent H | Modern Mexican Restaurant & Agave Bar, King West Toronto";

const STATIC_ROUTES = [
  "/", "/menu", "/events", "/story", "/happy-hour", "/faq", "/blogs", "/nye26",
];

// Routes whose <body> is prerendered into #root at the edge. Static routes use
// src/lib/routeContent.js via functions/_middleware.js; /blogs uses its dedicated
// functions/blogs/index.js handler because its published links come from Supabase.
// All must show real content — one <h1> and a non-empty #root — without JavaScript.
const PRERENDER_ROUTES = new Set([
  "/", "/menu", "/events", "/story", "/happy-hour", "/faq", "/blogs", "/nye26", "/aitch",
]);

const grab = (html, re) => (html.match(re) || [])[1] || null;

async function publishedSlugs() {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("! No Supabase creds — checking static routes only.\n");
    return [];
  }
  const res = await fetch(
    `${url}/rest/v1/blog_posts?select=slug&status=eq.published&order=sort_order.asc`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) return [];
  return (await res.json()).map((r) => r.slug);
}

async function check(path, { isBlog, prerendered, expectedBlogSlugs = [] }) {
  const url = BASE + path;
  const problems = [];

  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "silenth-seo-verify/1.0 (plain, no JS)" },
  });
  const html = await res.text();

  if (res.status !== 200) problems.push(`HTTP ${res.status}`);

  const canonical = grab(html, /rel="canonical"\s+href="([^"]*)"/);
  const expected = SITE + (path === "/" ? "/" : path);
  if (!canonical) problems.push("no canonical");
  else if (canonical.replace(/\/+$/, "") !== expected.replace(/\/+$/, "")) {
    problems.push(
      canonical.replace(/\/+$/, "") === SITE
        ? "canonical points at HOMEPAGE"
        : `canonical=${canonical} (expected ${expected})`
    );
  }

  const title = grab(html, /<title>([^<]*)<\/title>/);
  if (!title) problems.push("no <title>");
  else if (path !== "/" && title === SHELL_TITLE) problems.push("title is the shell default");

  const descCount = (html.match(/<meta\s+name="description"/g) || []).length;
  if (descCount === 0) problems.push("no meta description");
  else if (descCount > 1) problems.push(`${descCount} meta descriptions`);

  if (prerendered) {
    if (/<div id="root"><\/div>/.test(html)) problems.push("empty #root (no body prerendered)");
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count === 0) problems.push("no <h1> in body");
    else if (h1Count > 1) problems.push(`${h1Count} <h1> elements (want exactly 1)`);
  }

  if (isBlog) {
    if (/<div id="root"><\/div>/.test(html)) problems.push("no article in HTML (empty #root)");
    if (!/"@type":"BlogPosting"/.test(html)) problems.push("no BlogPosting schema");
    if (!/"@type":"BreadcrumbList"/.test(html)) problems.push("no BreadcrumbList schema");
  }

  if (path === "/blogs") {
    for (const slug of expectedBlogSlugs) {
      if (!html.includes(`href="/blogs/${slug}"`)) {
        problems.push(`missing link to /blogs/${slug}`);
      }
    }
  }

  return { path, bytes: html.length, title, canonical, problems };
}

async function main() {
  const slugs = await publishedSlugs();
  const targets = [
    ...STATIC_ROUTES.map((p) => ({
      path: p,
      isBlog: false,
      prerendered: PRERENDER_ROUTES.has(p),
      expectedBlogSlugs: p === "/blogs" ? slugs : [],
    })),
    ...slugs.map((s) => ({ path: `/blogs/${s}`, isBlog: true, prerendered: false })),
  ];

  console.log(`Verifying pre-JS HTML on ${BASE}`);
  console.log(`${targets.length} routes (${slugs.length} blog posts), plain UA — no JS, no crawler assist.\n`);

  const results = [];
  for (const t of targets) {
    try {
      results.push(await check(t.path, t));
    } catch (e) {
      results.push({ path: t.path, bytes: 0, problems: [`fetch failed: ${e.message}`] });
    }
  }

  for (const r of results) {
    const ok = r.problems.length === 0;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${r.path.padEnd(38)} ${String(r.bytes).padStart(6)}b  ${
        ok ? (r.title || "").slice(0, 44) : r.problems.join("; ")
      }`
    );
  }

  const failed = results.filter((r) => r.problems.length > 0);
  console.log(
    `\n${failed.length === 0 ? "ALL PASS" : "FAILURES"} — ${results.length - failed.length}/${results.length} routes correct before JavaScript.`
  );
  if (failed.length) {
    console.log("\nStill broken:");
    for (const f of failed) console.log(`  ${f.path}: ${f.problems.join("; ")}`);
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
