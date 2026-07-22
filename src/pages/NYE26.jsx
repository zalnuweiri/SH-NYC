import SEO from "../components/SEO.jsx";
import { breadcrumb, event } from "../lib/seoSchema.js";
import { useOTWidget } from "../components/OTwidget.jsx";

/**
 * NYE Masquerade Dinner landing page — /nye26
 *
 * Figma: "Silent - NYE 2025 - Landing page - Desktop (1280)" frame 4001:84.
 * SEO-only drop: nothing links here from the site chrome. It is reachable by URL,
 * listed in the sitemap, and carries Event structured data — that schema is the
 * whole point of the page, so EVENT below is the load-bearing part.
 *
 * DATE: the Figma still reads 12.31.25 (it is last year's artwork, reused). The
 * client confirmed this page is for the UPCOMING NYE, so every date is derived
 * from EVENT — change that one constant and the hero, the copy and the JSON-LD
 * all move together.
 *
 * Chrome (nav pill, footer, falling dust) all come from <Layout>, matching the
 * Figma frame's own nav/footer/particle layers — this page renders only the hero
 * and the menu.
 *
 * ONE DOM TREE, not the desktop/mobile twin blocks used elsewhere in this repo
 * (Home, Footer, HappyHour). Those pages need it because their two layouts differ
 * structurally; here the structure is identical and only the type scale and gaps
 * change, so twin blocks would buy nothing and cost a second <h1> and a second
 * copy of every dish in the DOM — exactly the wrong trade on a page whose only
 * job is search. Breakpoint styling is therefore mobile-first + `md:`.
 *
 * Type system is the menu system (see components/menu/MenuParts.jsx):
 *   MOBILE                          DESKTOP (@1280)
 *   hero  Monoglyphic Bold 40 UPPER  Monoglyphic Bold 64 UPPER ls.10
 *   title Monoglyphic Bold 24 UPPER  Monoglyphic Bold 40 UPPER ls.07
 *   name  Mondwest    Bold 20 UPPER  Mondwest    Bold 28 UPPER ls.07
 *   desc  NeueBit     Bold 18        NeueBit     Bold 22       ls.10
 * All text #ece1d4 (sh-cream). 1px @1280 = var(--dw)*0.078125/100.
 * The Figma has no mobile frame; the mobile scale follows the menu/happy-hour pages.
 */

const SITE = "https://www.silenthnyc.com";
const URL = `${SITE}/nye26`;
const HERO_IMG = `${SITE}/redesign/nye-hero-1280.webp`;

// Single source of truth for the event's timing. Doors 7pm; the room runs past
// midnight into New Year's Day. Every user-facing date and schema field below is
// derived from these.
const EVENT = {
  start: "2026-12-31T19:00:00-05:00",
  end: "2027-01-01T02:00:00-05:00",
  display: "12.31.26",
};

/* ── Type classes: mobile px → md: vw-scaled (round() keeps pixel fonts crisp) ── */
const T = {
  hero:
    "font-display font-bold uppercase leading-none tracking-[0.10em] " +
    "text-[40px] md:text-[round(calc(var(--dw)*5/100),1px)]",
  sub:
    "font-mondwest font-bold uppercase leading-none tracking-[0.07em] " +
    "text-[24px] md:text-[round(calc(var(--dw)*3.125/100),1px)]",
  date:
    "font-mondwest font-bold leading-[1.2] tracking-[0.07em] " +
    "text-[20px] md:text-[round(calc(var(--dw)*2.1875/100),1px)]",
  title:
    "font-display font-bold uppercase leading-[1.2] md:leading-none " +
    "tracking-[0.05em] md:tracking-[0.07em] " +
    "text-[24px] md:text-[round(calc(var(--dw)*3.125/100),1px)]",
  name:
    "font-mondwest font-bold uppercase leading-[1.2] tracking-[0.07em] " +
    "text-[20px] md:text-[round(calc(var(--dw)*2.1875/100),1px)]",
  desc:
    "font-body font-bold leading-[1.2] tracking-[0.10em] " +
    "text-[18px] md:text-[round(calc(var(--dw)*1.71875/100),1px)]",
};

/* ── Course spacing. Figma drifts on the Dessert block (48/28 where every other
      course is 40/20); normalised to the dominant rhythm so the page reads on one
      grid. Desktop: course gap 60, title→items 40, between items 40, name→desc 20. ── */
const G = {
  solo: "gap-3 md:gap-[calc(var(--dw)*0.9375/100)]",
  title: "gap-6 md:gap-[calc(var(--dw)*3.125/100)]",
  items: "gap-6 md:gap-[calc(var(--dw)*3.125/100)]",
  item: "gap-3 md:gap-[calc(var(--dw)*1.5625/100)]",
};

// The prix-fixe, in Figma order. "Ensalada Verde" is a plated first course, so it
// carries its own description instead of an `items` list; the rest are courses.
const COURSES = [
  {
    title: "Ensalada Verde",
    description:
      "Heirloom tomatoes, queso fresco, avocado and tomatillo vinaigrette, arugula, and olives.",
  },
  {
    title: "Appetizers",
    items: [
      {
        name: "Olvidados De Rib Eye",
        description: "Crispy rib eye tacos, served with beef jus",
      },
      {
        name: "Vegetales Asados",
        description:
          "Roasted asparagus, zucchini, and green onion with butter, garlic, and lemon. Finished with cotija cheese and cilantro oil.",
      },
    ],
  },
  {
    title: "Main Courses",
    items: [
      {
        name: "Arroz Meloso Con Chicharrón de pulpo",
        description:
          "Creamy risotto-style rice with tomato sauce, crispy octopus chicharrón, parsley–lemon butter, and morita chili oil.",
      },
      {
        name: "Pollo En Salsa Macha",
        description:
          "Grilled chicken breast, fried brussels sprouts, and salsa macha vinaigrette.",
      },
      {
        name: "Rib Eye En Su Jugo",
        description:
          "Grilled rib eye, serrano chili ash, 72 hour morita au jus, garlic, crispy onions, chives.",
      },
    ],
  },
  {
    title: "Dessert",
    items: [
      {
        name: "Cheesecake Vasco",
        description:
          "Basque-style cheesecake with apples in brown butter sauce, Lotus crumble, salted caramel and white chocolate ganache.",
      },
      {
        name: "El favorito de papá",
        description:
          "Sticky pear bread, walnut crumble, salted caramel sauce, vanilla gelato.",
      },
    ],
  },
];

const HERO_SRCSET = (ext) =>
  [480, 768, 960, 1280].map((w) => `/redesign/nye-hero-${w}.${ext} ${w}w`).join(", ");

// One course: a title, then either a single description (Ensalada Verde) or the
// dish list.
function Course({ course }) {
  return (
    <section className={`flex flex-col ${course.description ? G.solo : G.title}`}>
      <h2 className={`${T.title} text-sh-cream`}>{course.title}</h2>

      {course.description ? (
        <p className={`${T.desc} text-sh-cream`}>{course.description}</p>
      ) : (
        <div className={`flex flex-col ${G.items}`}>
          {course.items.map((item) => (
            <div key={item.name} className={`flex flex-col ${G.item}`}>
              <h3 className={`${T.name} text-sh-cream`}>{item.name}</h3>
              <p className={`${T.desc} text-sh-cream`}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function NYE26() {
  const { openReservationWidget } = useOTWidget();

  return (
    <>
      <SEO
        title="New Year's Eve 2026 NYC | Silent H Masquerade Dinner"
        description="Ring in 2027 at Silent H, NYC: a New Year's Eve masquerade dinner on 12.31.26 with a modern Mexican prix-fixe. Reserve your table."
        url={URL}
        preloads={[
          {
            href: "/redesign/nye-hero-480.avif",
            type: "image/avif",
            media: "(max-width: 767px)",
            fetchPriority: "high",
          },
          {
            href: "/redesign/nye-hero-1280.avif",
            type: "image/avif",
            media: "(min-width: 768px)",
            imageSrcSet: HERO_SRCSET("avif"),
            imageSizes: "100vw",
            fetchPriority: "high",
          },
        ]}
        jsonLd={[
          breadcrumb("New Year's Eve", URL),
          event({
            name: "New Year's Eve Masquerade Dinner at Silent H",
            description:
              "A New Year's Eve masquerade dinner at Silent H in NYC — a modern Mexican prix-fixe menu served through midnight into 2027.",
            url: URL,
            image: HERO_IMG,
            startDate: EVENT.start,
            endDate: EVENT.end,
          }),
        ]}
      />

      <main className="relative z-10 font-body text-sh-cream">
        {/* ══════════════════════ HERO ══════════════════════
            Figma: photo 1280×896 @(0,0) + #281d03 multiply @50% + Frame 1427
            text stack @(360,403), gap32. The nav pill above it is <Layout>'s. */}
        <section className="relative w-full overflow-hidden">
          <picture>
            <source type="image/avif" srcSet={HERO_SRCSET("avif")} sizes="100vw" />
            <source type="image/webp" srcSet={HERO_SRCSET("webp")} sizes="100vw" />
            <img
              src="/redesign/nye-hero-1280.webp"
              alt="The gold arches at the entrance to Silent H, set for the New Year's Eve Masquerade Dinner in NYC"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable="false"
              className="w-full h-[560px] md:h-[calc(var(--dw)*70/100)] object-cover select-none"
            />
          </picture>

          {/* Rectangle 169 — #281d03 multiply @50%, sinks the photo behind the type */}
          <div
            className="pointer-events-none absolute inset-0 bg-[#281d03] opacity-50 mix-blend-multiply"
            aria-hidden="true"
          />

          {/* Frame 1427. Mobile centres in the photo; desktop pins to the Figma's
              403px (= 31.48vw) so the type sits between the arches as drawn. */}
          <div
            className={
              "absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center " +
              "md:justify-start md:gap-[calc(var(--dw)*2.5/100)] md:px-0 " +
              "md:pt-[calc(var(--dw)*31.484/100)]"
            }
          >
            <h1 className={`${T.hero} text-sh-cream`}>New Years Eve</h1>
            <p className={`${T.sub} text-sh-cream`}>Masquerade Dinner</p>
            <p className={`${T.date} text-sh-cream`}>{EVENT.display}</p>

            {/* Figma "SecondaryButton - Desktop" 192×50. Same hover semantics as
                BTN_OUTLINE / <Button variant="ghost">: label + outline fade
                cream→pink together, fill stays transparent. */}
            <button
              onClick={openReservationWidget}
              className={
                "inline-flex items-center justify-center rounded-[4px] border border-sh-cream " +
                "font-body font-bold uppercase tracking-[0.20em] text-sh-cream " +
                "transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                "hover:text-sh-pink hover:border-sh-pink " +
                "mt-2 px-7 py-4 text-[16px] " +
                "md:mt-[calc(var(--dw)*0.625/100)] md:px-[calc(var(--dw)*2.1875/100)] " +
                "md:py-[calc(var(--dw)*1.5625/100)] md:text-[round(calc(var(--dw)*1.5625/100),1px)]"
              }
            >
              Reserve now
            </button>
          </div>
        </section>

        {/* ══════════════════════ MENU ══════════════════════
            Figma: Frame 1453 @(263,1097) 756 wide, gap60 between courses. The hero
            ends at 896 and the menu starts at 1097 → 201px (15.7vw) above.
            Transparent, so <Layout>'s falling dust shows through (as in the .fig). */}
        <div
          className={
            "mx-auto flex flex-col gap-10 px-6 pt-14 pb-20 " +
            "md:w-[calc(var(--dw)*59.0625/100)] md:gap-[calc(var(--dw)*4.6875/100)] " +
            "md:px-0 md:pt-[calc(var(--dw)*15.7/100)] md:pb-[calc(var(--dw)*15/100)]"
          }
        >
          {COURSES.map((course) => (
            <Course key={course.title} course={course} />
          ))}
        </div>
      </main>
    </>
  );
}
