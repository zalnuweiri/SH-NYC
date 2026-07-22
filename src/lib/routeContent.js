// src/lib/routeContent.js
//
// Pre-JavaScript BODY content for the static routes, injected into #root at the
// edge by functions/_middleware.js (the sibling of routeSeo.js, which does the
// same job for the <head>).
//
// WHY THIS EXISTS
//   The site is a client-rendered SPA: every route is served the same index.html,
//   whose <body> is just <div id="root"></div>. A client that does not run
//   JavaScript (crawlers, AI assistants, link unfurlers) therefore sees an empty
//   page — no <h1>, no copy, no links — on /, /menu, /faq, /happy-hour, /events
//   and /story. functions/blogs/[slug].js already fixes this for blog posts by
//   injecting the article into #root; this module is the same fix for the static
//   routes.
//
// WHY IT IS SAFE FOR REAL USERS
//   src/main.jsx boots with createRoot().render() — NOT hydrateRoot(). React 19
//   DISCARDS whatever markup is inside #root and renders fresh, so a real browser
//   throws this away on mount and shows the identical app. There is no hydration,
//   hence no hydration-mismatch risk. The only effect for humans is a meaningful
//   first paint instead of a black screen while the JS loads.
//
//   No cloaking: every client gets byte-identical HTML. No user-agent sniffing.
//
// DRIFT
//   /menu, /happy-hour and /faq are GENERATED from the same data modules the
//   pages render (MenuData.js, happyHourData.js, faqData.js), so they cannot fall
//   out of sync. /, /story and /events are curated prose below — if you change
//   that copy on the page, mirror it here (marked "keep in sync").

import { menuData } from "../data/MenuData.js";
import { happyHourIntro, happyHourItems, tuesdays } from "../data/happyHourData.js";
import { faqs } from "../data/faqData.js";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const h1 = (t) => `<h1>${esc(t)}</h1>`;
const h2 = (t) => `<h2>${esc(t)}</h2>`;
const h3 = (t) => `<h3>${esc(t)}</h3>`;
const p = (t) => `<p>${esc(t)}</p>`;
const a = (href, t) => `<a href="${esc(href)}">${esc(t)}</a>`;

// name + optional description, the shape every menu / happy-hour item shares.
const dish = (item) => h3(item.name) + (item.description ? p(item.description) : "");

// Wrap a route's inner HTML in a plain, semantic shell. The wrapper is purely so
// the pre-JS paint has some padding; crawlers only care about the tags inside.
const footerHtml = () =>
  `<footer><p>Silent H is a modern Mexican restaurant and agave cocktail lounge at 416 West 13th Street, New York, NY 10014. Open Tuesday to Sunday from 5pm. Reservations 416 900 3535.</p></footer>`;

const shell = (inner) =>
  `<div style="max-width:960px;margin:0 auto;padding:96px 24px">${inner}${footerHtml()}</div>`;

// Shared footer of internal links so a crawler landing on any page can reach the
// others (mirrors the site's own nav destinations).
const NAV_LINKS = [
  ["/menu", "Menu"],
  ["/happy-hour", "Happy Hour"],
  ["/events", "Plan an Event"],
  ["/story", "Our Story"],
  ["/faq", "FAQ"],
  ["/aitch/", "Aitch Lounge"],
  ["/blogs", "Blog"],
];
const navHtml = (links = NAV_LINKS) =>
  `<nav>${links.map(([href, t]) => a(href, t)).join(" ")}</nav>`;

/* ───────────────────────── / (home) ─────────────────────────
   keep in sync with src/pages/Home.jsx (hero H1 + subtitle, the "A Modern
   Mexican Restaurant in NYC" SEO section, and the De Monterrey quote). */
function home() {
  return shell(
    h1("Mexican flavours, celebrated in NYC") +
      p(
        "Chef Gerardo brings Mexico's street flavours to NYC. Elevated, authentic and an homage to Monterrey."
      ) +
      h2("A Modern Mexican Restaurant in NYC") +
      p(
        "Silent H is a modern Mexican restaurant and agave cocktail lounge in NYC's Meatpacking District. Led by Chef Gerardo Álvarez Saucedo, the kitchen reimagines traditional Mexican family recipes with refined technique, from charred guacamole and crispy chicharrón tacos to mesquite-grilled rib-eye espadas and a 44oz tomahawk. Next door, our late-night lounge Aitch pours a world-class program of artisanal tequila and mezcal alongside elevated bites, with guest DJs Thursday through Sunday. Join us for happy hour every day from 5 to 7pm, settle in for a downtown NYC date night, or plan a private event across two Mexican-inspired spaces. Silent H is open for dinner Tuesday to Sunday from 5pm at 416 West 13th Street."
      ) +
      `<blockquote>${p(
        "“I believe the best ingredient is nostalgia, which is reflected in every dish on this menu. It is a tribute to my family, to México and to my culture.”"
      )}${p("Chef Gerardo Álvarez Saucedo")}</blockquote>` +
      navHtml()
  );
}

/* ───────────────────────── /menu ─────────────────────────
   generated from src/data/MenuData.js — cannot drift. */
function menu() {
  const sections = [...(menuData.food || []), ...(menuData.drinks || [])]
    .map(
      (cat) =>
        h2(cat.category) + (cat.items || []).map(dish).join("")
    )
    .join("");

  return shell(
    h1("Authentic Mexican Cuisine & Elevated Cocktails in NYC") +
      p(
        "A celebration of authentic Mexican culinary heritage, reimagined for the modern palate. At Silent H, every dish is a story."
      ) +
      sections +
    "<p>More reading: " + a("/blogs/best-mexican-restaurant-toronto", "the best Mexican restaurants in Toronto") + ".</p>" +
      navHtml()
  );
}

/* ───────────────────────── /happy-hour ─────────────────────────
   generated from src/data/happyHourData.js — cannot drift. */
function happyHour() {
  const prices = (happyHourIntro.prices || [])
    .map((x) => `${x.label} ${x.price}`)
    .join(" · ");

  return shell(
    h1(happyHourIntro.title) +
      p(happyHourIntro.schedule) +
      (prices ? p(prices) : "") +
      happyHourItems.map(dish).join("") +
      h2(`${tuesdays.title} — ${tuesdays.schedule} ${tuesdays.price}`) +
      (tuesdays.items || []).map(dish).join("") +
    "<p>More reading: " + a("/blogs/happy-hour-downtown-toronto", "the best happy hours in downtown Toronto") + ".</p>" +
      navHtml()
  );
}

/* ───────────────────────── /faq ─────────────────────────
   generated from src/data/faqData.js — cannot drift. */
function faq() {
  return shell(
    h1("Frequently Asked Questions") +
      faqs.map((f) => h2(f.q) + p(f.a)).join("") +
      navHtml([
        ["/menu", "Menu"],
        ["/happy-hour", "Happy Hour"],
        ["/aitch/", "Aitch Cocktail Bar"],
        ["/events", "Private Events"],
        ["/story", "Our Story"],
      ])
  );
}

/* ───────────────────────── /story ─────────────────────────
   keep in sync with src/pages/Story.jsx (HERO_SUB, PHILOSOPHY, ROWS). */
const STORY_ROWS = [
  {
    title: "The heart of our kitchen is a story rooted in love, memory, and tradition.",
    body:
      "Chef Saucedo draws inspiration from his late grandmother, whose warmth and passion for cooking shaped his earliest memories. Her honoured recipes, once shared around a family table, now come to life on our menu—reimagined with elegance and respect for their origins. Each dish is a tribute to her legacy, blending the rich flavours of traditional Mexican cuisine with the artistry of fine dining. Through every bite, we invite you to experience the soul of his childhood and the enduring spirit of the woman who started it all.",
  },
  {
    title: "Setting a tone that is both vibrant and refined.",
    body:
      "Our service is intuitive and heartfelt, attentive without ever intruding. Whether you're joining us for an impromptu cocktail after a long day or gathering with friends for a celebratory dinner, we craft each moment with care. The experience feels effortless, elevated, and always memorable. A true taste of contemporary Mexico.",
  },
  {
    title: "Every dish tells a story.",
    body:
      "At Silent H every visit becomes a cherished memory. From the sizzle of Espadas de rib eye asadas arriving at your table to the laughter shared over handcrafted regional inspired cocktails, we're more than just a place to eat — we're a place where moments are made. Whether it's a lively family gathering, a date with a special someone, or a spontaneous night out with friends, our vibrant flavours and warm hospitality create an atmosphere that brings people together. Here, the experience goes beyond the plate, turning every visit into lasting memories.",
  },
];
function story() {
  return shell(
    h1("The soul of México, reimagined") +
      p(
        "Cuisine that is rooted in tradition, elevated by innovation, and undeniably memorable."
      ) +
      h2("Our culinary philosophy") +
      p(
        "It blends bold creativity with deep respect for Mexico's rich gastronomic heritage. Guided by Chef Gerardo Álvarez Saucedo, our kitchen reimagines long standing family recipe's bringing familiar flavours with refined technique, creating dishes that honour their origins while inviting new discovery. Every plate is inspired by the streets of Mexico, shaped by obsession for quality, and driven by an uncompromising pursuit of flavour."
      ) +
      h2("La inspiración") +
      STORY_ROWS.map((r) => h3(r.title) + p(r.body)).join("") +
    "<p>More reading: " + a("/blogs/date-night-restaurants-toronto", "date-night restaurants in Toronto") + ".</p>" +
      navHtml()
  );
}

/* ───────────────────────── /events ─────────────────────────
   keep in sync with src/pages/Events.jsx (heroIntro, whyIntro, benefits,
   EVENTS_FAQ). */
const EVENTS_BENEFITS = [
  "Gracious, personalized hospitality",
  "Semi-private & private options",
  "Seamless, instant booking options",
  "Chef-curated seasonal menus",
  "Dedicated event planning support",
];
const EVENTS_FAQ = [
  { q: "Can you host private events at Silent H?", a: "Yes. Silent H hosts private dining and events in NYC, from intimate dinners to corporate events and full buyouts across two Mexican-inspired spaces." },
  { q: "How many guests can Silent H host?", a: "The main dining room, patios and private spaces seat up to 145 guests, with room for up to 220 for a standing reception." },
  { q: "What kind of events does Silent H host?", a: "Corporate dinners, celebrations, milestone birthdays, engagement parties, product launches and full buyouts, each with chef-curated Mexican menus." },
  { q: "Is there a private space for smaller groups?", a: "Yes. Aitch, our agave lounge downstairs, is available for smaller private bookings and after-parties behind a hidden door." },
];
function events() {
  return shell(
    h1("Plan your auténtica celebración") +
      p(
        "At Silent H, every gathering becomes a celebration of flavour and culture. From intimate dinners to corporate events and full buyouts, our vibrant spaces and elevated Mexican cuisine create unforgettable experiences inspired by the heart of Mexico."
      ) +
      h2("Our spaces") +
      h3("Silent H") +
      h3("Aitch") +
      h2("Why host your event at Silent H?") +
      p(
        "Elevate your occasion with bold, authentic flavours, artisan cocktails, and thoughtfully designed spaces that capture the spirit of modern Mexico."
      ) +
      `<ul>${EVENTS_BENEFITS.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` +
      h2("Events & Private Dining FAQ") +
      EVENTS_FAQ.map((f) => h3(f.q) + p(f.a)).join("") +
    "<p>Ringing in the new year? See our " + a("/nye26", "New Year's Eve Masquerade Dinner") + " at Silent H, NYC.</p>" +
    "<p>More reading: " + a("/blogs/private-dining-toronto", "private dining in Toronto") + ".</p>" +
      navHtml()
  );
}

/* ───────────────────────── /nye26 ─────────────────────────
   keep in sync with src/pages/NYE26.jsx (EVENT.display + COURSES). SEO-only
   landing page: nothing in the site chrome links here, so the prerendered body
   is a crawler's only route to the menu. */
const NYE_DATE = "12.31.26";
const NYE_COURSES = [
  {
    title: "Ensalada Verde",
    description:
      "Heirloom tomatoes, queso fresco, avocado and tomatillo vinaigrette, arugula, and olives.",
  },
  {
    title: "Appetizers",
    items: [
      { name: "Olvidados De Rib Eye", description: "Crispy rib eye tacos, served with beef jus" },
      { name: "Vegetales Asados", description: "Roasted asparagus, zucchini, and green onion with butter, garlic, and lemon. Finished with cotija cheese and cilantro oil." },
    ],
  },
  {
    title: "Main Courses",
    items: [
      { name: "Arroz Meloso Con Chicharrón de pulpo", description: "Creamy risotto-style rice with tomato sauce, crispy octopus chicharrón, parsley–lemon butter, and morita chili oil." },
      { name: "Pollo En Salsa Macha", description: "Grilled chicken breast, fried brussels sprouts, and salsa macha vinaigrette." },
      { name: "Rib Eye En Su Jugo", description: "Grilled rib eye, serrano chili ash, 72 hour morita au jus, garlic, crispy onions, chives." },
    ],
  },
  {
    title: "Dessert",
    items: [
      { name: "Cheesecake Vasco", description: "Basque-style cheesecake with apples in brown butter sauce, Lotus crumble, salted caramel and white chocolate ganache." },
      { name: "El favorito de papá", description: "Sticky pear bread, walnut crumble, salted caramel sauce, vanilla gelato." },
    ],
  },
];
function nye26() {
  const courses = NYE_COURSES.map(
    (c) =>
      h2(c.title) +
      (c.description ? p(c.description) : (c.items || []).map(dish).join(""))
  ).join("");

  return shell(
    h1("New Year's Eve Masquerade Dinner at Silent H") +
      p(`A modern Mexican prix-fixe on ${NYE_DATE}, served through midnight into 2027 at Silent H, NYC.`) +
      courses +
      navHtml()
  );
}

// pathname → builder. Only these routes get body injection; everything else
// returns null and is left untouched by the middleware.
// /aitch - Aitch agave lounge. Keep in sync with src/pages/Aitch.jsx (SEO + hero).
function aitch() {
  return shell(
    h1("Aitch - Agave Cocktail Lounge in NYC") +
    p(
      "Aitch is Silent H's late-night agave lounge in NYC's Meatpacking District. Tucked downstairs behind a hidden door, the intimate room pours a world-class program of 50+ artisanal tequilas and mezcals alongside craft cocktails and elevated Mexican bites, Thursday to Sunday."
    ) +
    h2("The agave program") +
    p(
      "Aitch is built for agave lovers: more than 50 tequilas and mezcals, from sipping spirits to mezcal-forward signature cocktails, guided by our bartenders in a warm, low-lit setting."
    ) +
    h2("Music and late nights") +
    p(
      "Settle in for a late-night date or a night out with friends. Guest DJs play Thursday through Sunday, capturing the spirit of modern Mexico after dark."
    ) +
    h2("Visit Aitch") +
    p(
      "Find Aitch inside Silent H at 416 West 13th Street, New York. Open late alongside the restaurant - reserve ahead at 647 822 5367 or drop in after dinner."
    ) +
    navHtml([
      ["/menu", "Menu"],
      ["/happy-hour", "Happy Hour"],
      ["/events", "Private Events"],
      ["/story", "Our Story"],
      ["/faq", "FAQ"],
    ])
  );
}

const BUILDERS = {
  "/": home,
  "/menu": menu,
  "/happy-hour": happyHour,
  "/faq": faq,
  "/story": story,
  "/events": events,
  "/nye26": nye26,
  "/aitch": aitch,
};

/** The pre-JS body HTML for a static route, or null if the route isn't one we
 *  prerender (assets, /aitch, /blogs and /blogs/<slug>, unknown paths).
 *  /blogs is dynamic and is prerendered separately by functions/blogs/index.js.
 *  Normalises a trailing slash the same way routeSeo.js does. */
export function bodyHtmlFor(pathname) {
  const clean =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const build = BUILDERS[clean];
  return build ? build() : null;
}
