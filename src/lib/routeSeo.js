// src/lib/routeSeo.js
//
// Per-route <head> copy for the STATIC routes, in one place.
//
// WHY THIS EXISTS
//   index.html hardcodes the homepage's <title> and, critically:
//       <link rel="canonical" href="https://www.silenthnyc.com/" />
//   Every route is served that same file, so any client which does not run
//   JavaScript sees EVERY page claiming to be the homepage — a duplicate-content
//   signal that can get pages dropped from the index. <SEO> fixes it, but only
//   after React mounts, which a crawler's first pass never waits for.
//
//   functions/_middleware.js reads this table and rewrites the head AT THE EDGE,
//   so the correct tags are in the HTML before it leaves Cloudflare.
//
// The strings below are copied verbatim from each page's own <SEO> props, so the
// edge HTML and the hydrated DOM agree. If you change a page's <SEO> title or
// description, change it here too — or the crawler and the browser will disagree.
// (Blog posts are NOT here: they are per-slug and come from Supabase via
// functions/blogs/[slug].js.)

export const SITE = "https://www.silenthnyc.com";

/** Canonical for any route — derived, never hardcoded. Matches Layout.jsx. */
export function canonicalFor(pathname) {
  const clean = pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  if (clean === "/aitch") return SITE + "/aitch/";
  return SITE + (clean === "/" ? "/" : clean);
}

export const ROUTE_SEO = {
  "/": {
    title: "Silent H NYC | Modern Mexican Cuisine",
    description:
      "Silent H is a modern Mexican restaurant and agave lounge in NYC's Meatpacking District. Opening soon, with a regional Mexican menu and Aitch next door.",
  },
  "/reservations": {
    title: "Reservations Coming Soon | Silent H NYC",
    description: "Silent H is opening soon at 420 West 13th Street in NYC. Online reservations are coming soon.",
  },
  "/menu": {
    title: "Silent H NYC Menu | Modern Mexican Cuisine (Menu)",
    description:
      "The menu at Silent H, modern Mexican food and tacos in NYC: charred guacamole, crispy chicharron tacos, rib-eye skewers and agave cocktails.",
  },
  "/events": {
    title: "Plan an Event Coming Soon | Silent H NYC",
    description:
      "Event planning at Silent H NYC is coming soon. Details will be announced here.",
  },
  "/story": {
    title: "Our Story | Silent H, Modern Mexican Restaurant NYC",
    description:
      "The story behind Silent H, a modern Mexican restaurant and agave lounge in NYC, led by Monterrey-born chef Gerardo Álvarez Saucedo.",
  },
  "/faq": {
    title: "Silent H FAQ | Mexican Restaurant & Bar, NYC",
    description:
      "Common questions about Silent H, modern Mexican restaurant and Aitch agave lounge in NYC: hours, reservations, menu and parking.",
  },
  "/blogs": {
    title: "Silent H Blog | Mexican Food & Cocktails in NYC",
    description:
      "The Silent H blog: guides to Mexican food, tacos, tequila and mezcal, cocktails and dining out in NYC.",
  },
  "/nye26": {
    title: "New Year's Eve 2026 NYC | Silent H Masquerade Dinner",
    description:
      "Ring in 2027 at Silent H, NYC: a New Year's Eve masquerade dinner on 12.31.26 with a modern Mexican prix-fixe. Event details and reservations are coming soon.",
  },
  "/aitch": {
    title: "Aitch NYC | Memberships Coming Soon",
    description:
      "Aitch NYC is opening soon at 418 West 13th Street. Membership details are coming soon. Contact info@aitchnyc.com for opening enquiries.",
  },
};

/** Look up a route's head copy. Returns null for anything not listed (assets,
 *  /aitch's prebuilt app, /blogs/<slug>) so the caller leaves it untouched. */
export function seoFor(pathname) {
  const clean = pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return ROUTE_SEO[clean] || null;
}

// Every page route the app actually serves — the allowlist functions/_middleware.js
// uses to tell a real page from an invented URL. The SPA fallback
// (public/_redirects: `/* /index.html 200`) answers 200 for ANY path, so typo'd
// and invented URLs (/gift-cards, /careers, /this-does-not-exist…) became
// soft-404s that Google files under "Crawled – not indexed". This list mirrors
// the React routes in src/App.jsx — ADD A ROUTE THERE, ADD IT HERE TOO, or new
// pages will 404. (ROUTE_SEO above is only the head-rewrite subset, so it can't
// double as this allowlist.)
const KNOWN_EXACT_ROUTES = new Set([
  "/", "/menu", "/faq", "/events", "/story",
  "/reservations", "/blogs", "/nye26", "/aitch",
]);

/** True if `pathname` is a route the app really serves, so the middleware can
 *  give anything else a genuine 404 instead of the blank SPA shell. Covers the
 *  exact React routes above, the /aitch sub-app, and /blogs/<slug> (whose own
 *  edge function, functions/blogs/[slug].js, decides if the slug exists). */
export function isKnownRoute(pathname) {
  const clean = pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  if (KNOWN_EXACT_ROUTES.has(clean)) return true;
  if (clean.startsWith("/aitch/")) return true; // /aitch/faq, /aitch/booking, /aitch/assets/*
  if (clean.startsWith("/blogs/")) return true; // /blogs/<slug>
  return false;
}
