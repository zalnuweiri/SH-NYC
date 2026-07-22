// generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { writeFileSync } from "fs";
import path from "path";
import { loadEnv } from "vite";

// This script runs BEFORE vite build (see package.json), so Vite has not loaded
// .env yet and plain `node` never does it automatically. Borrow Vite's own loader
// so a local `npm run build` reads .env exactly like the app does; on Vercel the
// dashboard vars arrive via process.env, which loadEnv also merges in. Without
// this, a local build would quietly fall back to the stale hardcoded list.
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };

const siteUrl = "https://www.silenthnyc.com"; // canonical production domain

// Main app routes (matches src/App.jsx)
const routes = [
  "/",
  "/menu",
  "/events",
  "/story",
  "/happy-hour",
  "/aitch/", "/faq",
  "/blogs",
  "/nye26"
];

// Blog posts are authored in Supabase (via the silenth-admin service), not here,
// so the list is fetched at BUILD time rather than hardcoded — a hardcoded list
// silently goes stale the moment anyone publishes, which is how 5 of 9 live posts
// came to be missing from this file.
//
// Read-only, and uses the same public anon key the site already ships in its
// bundle. If the fetch fails the build does NOT die: we fall back to the known
// slugs below, because shipping a slightly stale sitemap beats failing a deploy.
const FALLBACK_BLOG_SLUGS = [
  "date-night-restaurants-toronto",
  "happy-hour-downtown-toronto",
  "best-mexican-restaurant-toronto",
  "private-dining-toronto",
];

async function fetchPublishedBlogSlugs() {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[sitemap] VITE_SUPABASE_URL/ANON_KEY not set — falling back to the hardcoded blog list."
    );
    return FALLBACK_BLOG_SLUGS;
  }

  try {
    const endpoint =
      `${url}/rest/v1/blog_posts` +
      `?select=slug,updated_at&status=eq.published&order=sort_order.asc`;

    const response = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const rows = await response.json();
    const posts = rows
      .filter((row) => row && typeof row.slug === "string" && row.slug)
      .map((row) => ({ slug: row.slug, lastmod: row.updated_at ?? undefined }));

    if (posts.length === 0) throw new Error("returned 0 published posts");

    console.log(`[sitemap] ${posts.length} published blog posts from Supabase.`);
    return posts;
  } catch (error) {
    console.warn(
      `[sitemap] Could not read blog posts from Supabase (${error.message}) — using the hardcoded fallback.`
    );
    return FALLBACK_BLOG_SLUGS;
  }
}

async function generateSitemap() {
  const blogPosts = await fetchPublishedBlogSlugs();

  const sitemap = new SitemapStream({ hostname: siteUrl });

  for (const url of routes) {
    sitemap.write({ url, changefreq: "weekly", priority: url === "/" ? 1.0 : 0.8 });
  }

  for (const post of blogPosts) {
    // Accepts either a bare slug string (the fallback) or {slug, lastmod}.
    const slug = typeof post === "string" ? post : post.slug;
    const lastmod = typeof post === "string" ? undefined : post.lastmod;

    sitemap.write({
      url: `/blogs/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      ...(lastmod ? { lastmod } : {}),
    });
  }

  sitemap.end();

  const xml = (await streamToPromise(sitemap)).toString();

  // Save into the /public directory so it is deployed with the site
  const filePath = path.resolve("./public/sitemap.xml");
  writeFileSync(filePath, xml);
  console.log(`Sitemap created at: ${filePath}`);
}

generateSitemap().catch(console.error);
