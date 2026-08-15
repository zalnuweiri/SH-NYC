import { Link } from "react-router-dom";

import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import RelatedGuides from "../components/RelatedGuides";
import ResponsiveImg from "../components/ResponsiveImg";
import { useOTWidget } from "../components/OTwidget.jsx";
import { T, M } from "../styles/figmaTokens";

/* Silent H — Our Story. Pixel-rebuilt from the Figma frames:
     Desktop 5458:894 (1280×4842) · Mobile 5452:806 (393×5788).
   Type now matches the 's DEPLOYED Our-Story styles (globals.css, incl. the
   bottom-of-file override that wins for every `p`):
     hero title  Monoglyphic BOLD 60 / Mobile 40 UPPER          → T.hero + font-bold
     phil/inspir Monoglyphic BOLD 40/clamp UPPER                → T.h1 / inline clamp
     row headers NeueBit BOLD 32 (·30 mobile) ls.035 lh1.08     → font-body font-bold (NOT Monoglyphic)
     hero caption + captions  NeueBit 400 clamp(20-24)/·18 mob, ls.025 lh1.45
   Row headers are cream; caption/body paragraphs render #b9aca4 ('s .our-story-copy p).
   Content images are flat rectangles (squared-off, per  selena's format — the earlier
   rounded-top arches were removed); hero is full-bleed, NO
   overlay/filter (per .fig). The full-bleed hero plus the inspiración, grandmother, table and
   dish photos (the 's Our-Story iteration assets, upscaled / edited) all flow through
   the responsive pipeline — masters under /redesign, jobs in the `story` entry of
   scripts/build-page-images.mjs generate the AVIF/WebP width ladders + imageManifest.json,
   and each is rendered via <ResponsiveImg> (srcset/sizes), framed in its arch via a per-row
   `pos` object-position (no mirroring). Regenerate with: npm run images:build -- story.
   Copy is verbatim from the .fig (incl. its “recipe's” / “Mexico’s” quirks). The closing
   "Experience Silent H" reservation CTA is the 's new footer section. */

const BODY = "text-sh-cream/75"; // warm-grey body (cream dimmed ~75%, matches the .fig render)

const HERO_SUB = "Cuisine that is rooted in tradition, elevated by innovation, and undeniably memorable.";
const PHILOSOPHY =
  "It blends bold creativity with deep respect for Mexico’s rich gastronomic heritage. Guided by Chef Gerardo Álvarez Saucedo, our kitchen reimagines long standing family recipe's bringing familiar flavours with refined technique, creating dishes that honour their origins while inviting new discovery. Every plate is inspired by the streets of Mexico, shaped by obsession for quality, and driven by an uncompromising pursuit of flavour.";

// Alternating image/text rows (Figma Frame 1646/1645/1647). side = image side (desktop).
const ROWS = [
  {
    img: "/redesign/story-1.webp", // 's upscaled grandmother photo (not pre-mirrored)
    alt: "Chef Saucedo's grandmother preparing dough at her family table",
    side: "left",
    pos: "object-[center_43%]", // : .our-story-arched-image > img → object-position center 43%
    imgH: "calc(var(--dw) * 48.2 / 100)", //  grandma image height 617px (@1280)
    title: "The heart of our kitchen is a story rooted in love, memory, and tradition.",
    body:
      "Chef Saucedo draws inspiration from his late grandmother, whose warmth and passion for cooking shaped his earliest memories.\nHer honoured recipes, once shared around a family table, now come to life on our menu—reimagined with elegance and respect for their origins. Each dish is a tribute to her legacy, blending the rich flavours of traditional Mexican cuisine with the artistry of fine dining. Through every bite, we invite you to experience the soul of his childhood and the enduring spirit of the woman who started it all.",
  },
  {
    img: "/redesign/story-2.webp", // 's updated checkered-table spread
    alt: "A cocktail, guacamole and croquettes arranged on a black-and-white tiled table",
    side: "right",
    pos: "object-[center_63%]", // : .our-story-table-image > img → object-position center 63%
    imgH: "calc(var(--dw) * 48.2 / 100)", //  table image height 617px (@1280)
    title: "Setting a tone that is both vibrant and refined.",
    body:
      "Our service is intuitive and heartfelt, attentive without ever intruding.\nWhether you're joining us for an impromptu cocktail after a long day or gathering with friends for a celebratory dinner, we craft each moment with care. The experience feels effortless, elevated, and always memorable. A true taste of contemporary Mexico.",
  },
  {
    img: "/redesign/story-3.webp", // 's smoked-meat + red-cocktail image
    alt: "Smoked roasted meat, bone marrow, and a red cocktail against a black background",
    side: "left",
    pos: "object-[center_62%]", // : .our-story-taco-image > img → object-position center 62%
    imgH: "calc(var(--dw) * 53.75 / 100)", //  dish image height 688px (@1280)
    title: "Every dish tells a story.",
    body:
      "At Silent H every visit becomes a cherished memory. From the sizzle of Espadas de rib eye asadas arriving at your table to the laughter shared over handcrafted regional inspired cocktails, we’re more than just a place to eat — we’re a place where moments are made. Whether it’s a lively family gathering, a date with a special someone, or a spontaneous night out with friends, our vibrant flavours and warm hospitality create an atmosphere that brings people together. Here, the experience goes beyond the plate, turning every visit into lasting memories.",
  },
];

export default function Story() {
  const { openReservationWidget } = useOTWidget();

  return (
    <>
      <SEO
        title="Our Story | Silent H, Modern Mexican Restaurant NYC"
        description="The story behind Silent H, a modern Mexican restaurant and agave lounge in NYC, led by Monterrey-born chef Gerardo Álvarez Saucedo."
        url="https://www.silenthnyc.com/story"
        jsonLd={breadcrumb("Our Story", "https://www.silenthnyc.com/story")}
      />
      {/* transparent main so the global dust shows through the black sections (like Home) */}
      <main className="relative z-10 font-body text-sh-cream overflow-hidden">

        {/* ════════════ DESKTOP ════════════ (Figma 5458:894) */}
        <div className="hidden md:block">
          {/* Hero — full-bleed chef portrait, 's two-layer vignette, bold headline + subtitle */}
          <section className="relative w-full h-[calc(var(--dw)*65.23/100)] min-h-[100svh] overflow-hidden">
            <ResponsiveImg src="/redesign/story-hero.jpg" alt="Chef Gerardo Álvarez Saucedo at Silent H" sizes="100vw" loading="eager" className="absolute inset-0 h-full w-full object-cover object-center" />
            {/* .our-story-hero-vignette — vertical (dark top → clear 52% → dark 78% → black) + left scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.24), transparent 52%, rgba(0,0,0,0.5) 78%, #000 100%), linear-gradient(90deg, rgba(0,0,0,0.42), transparent 58%)",
              }}
            />
            <div className="absolute inset-0 mx-auto w-[var(--dw)]">
              {/* top is the .fig 601px (46.95% of --dw), but capped so the block (~15% of --dw
                  tall) never falls below a short viewport — e.g. a wide, low window. On normal-
                  height displays 100svh - 18%·dw > 46.95%·dw, so it stays at the design 601px. */}
              <Reveal
                className="absolute left-[calc(var(--dw)*5.47/100)] w-[calc(var(--dw)*66.41/100)] flex flex-col items-start gap-[calc(var(--dw)*2.5/100)]"
                style={{ top: "min(calc(var(--dw) * 46.95 / 100), calc(100svh - var(--dw) * 18 / 100))" }}
              >
                {/* Hero header — 's .our-story-hero h1: Monoglyphic bold, clamp(54,5.15vw,66),
                    lh 0.98, ls 0.055em, NOT uppercase, max-w 820, shadow; "reimagined" on its own line. */}
                <h1 className="max-w-[820px] font-display font-bold text-sh-cream text-[clamp(54px,5.15vw,66px)] leading-[0.98] tracking-[0.055em] [text-shadow:0_8px_30px_rgba(0,0,0,0.45)]">
                  The soul of México,<br />reimagined
                </h1>
                {/* Hero caption — 's .our-story-hero-content p AFTER the globals override
                    wins: NeueBit 400, clamp(20,1.85vw,24), lh 1.45, ls 0.025em, max-w 890, shadow. */}
                <p className="max-w-[890px] font-body font-normal text-sh-cream text-[clamp(20px,1.85vw,24px)] leading-[1.45] tracking-[0.025em] [text-shadow:0_3px_18px_#000]">{HERO_SUB}</p>
              </Reveal>
            </div>
          </section>

          {/* Our culinary philosophy — centered, bold heading (Frame 1643 @167,975) */}
          <Reveal className="mt-[calc(var(--dw)*10.94/100)] mx-auto w-[calc(var(--dw)*73.91/100)] flex flex-col items-center gap-[calc(var(--dw)*3.44/100)] text-center">
            <h2 className={`${T.h1} font-bold uppercase text-sh-cream leading-[1]`}>Our culinary philosophy</h2>
            <p className={`${T.body} ${BODY} leading-[1.2]`}>{PHILOSOPHY}</p>
          </Reveal>

          {/* La inspiración — 's .inspiration-showcase: 760px-tall (@1280) frame, img
              object-position center 58%, a TOP-DOWN dark→transparent scrim, and the title
              anchored near the TOP (not bottom). Title = clamp(38,4vw,50) ls 0.07em uppercase. */}
          <Parallax speed={-0.05} className="mt-[calc(var(--dw)*10.86/100)] mx-auto w-[calc(var(--dw)*73.91/100)]">
            <div className="relative overflow-hidden h-[calc(var(--dw)*59.375/100)]">
              <ResponsiveImg src="/redesign/story-inspiracion.webp" alt="The streets of México that inspire Silent H" sizes="(min-width: 1280px) 946px, (min-width: 768px) 74vw, 92vw" className="h-full w-full object-cover object-[center_58%]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_28%,transparent_44%)]" />
              <h2 className="absolute inset-x-[calc(var(--dw)*2.34/100)] top-[calc(var(--dw)*8.59/100)] text-center font-display font-bold uppercase text-sh-cream text-[clamp(38px,4vw,50px)] leading-[1] tracking-[0.07em]">La inspiración</h2>
            </div>
          </Parallax>

          {/* Alternating rows — flat rectangular image + text, vertically centred ('s
              squared-off format; the earlier arch/rounded-top has been removed). */}
          {ROWS.map((row) => (
            <div key={row.title} className="mt-[calc(var(--dw)*9.375/100)] mx-auto w-[calc(var(--dw)*73.91/100)] flex items-center gap-[calc(var(--dw)*4.69/100)]">
              <Parallax speed={-0.04} className={`${row.side === "right" ? "order-2" : "order-1"} w-[calc(var(--dw)*36.17/100)] shrink-0`}>
                <div className="overflow-hidden" style={{ height: row.imgH }}>
                  <ResponsiveImg src={row.img} alt={row.alt} sizes="(min-width: 1280px) 463px, (min-width: 768px) 36vw, 92vw" className={`h-full w-full object-cover ${row.pos || "object-center"}`} />
                </div>
              </Parallax>
              <Reveal className={`${row.side === "right" ? "order-1" : "order-2"} flex-1 flex flex-col`}>
                {/* Row header — 's .our-story-copy h2: NeueBit (NOT Monoglyphic), 32px,
                    lh 1.08, ls 0.035em, no uppercase, bold (browser-default h2), 32px bottom gap. */}
                <h3 className="font-body font-bold text-sh-cream text-[calc(var(--dw)*2.5/100)] leading-[1.08] tracking-[0.035em] mb-[calc(var(--dw)*2.5/100)]">{row.title}</h3>
                {/* Caption paragraphs — 's .our-story-copy p (after the globals override
                    wins): NeueBit clamp(20,1.85vw,24), weight 400, lh 1.45, ls 0.025em, #b9aca4,
                    18px inter-paragraph gap. */}
                {row.body.split("\n").map((para, i, arr) => (
                  <p key={i} className={`font-body font-normal text-[#b9aca4] text-[clamp(20px,1.85vw,24px)] leading-[1.45] tracking-[0.025em]${i < arr.length - 1 ? " mb-[18px]" : ""}`}>{para}</p>
                ))}
              </Reveal>
            </div>
          ))}

          <div aria-hidden className="h-[calc(var(--dw)*12.5/100)]" />
        </div>

        {/* ════════════ MOBILE ════════════ (Figma 5452:806, content x36 / w321) */}
        <div className="md:hidden">
          {/* Hero — full-bleed, centered bold headline + subtitle (Frame 1642 @36,689) */}
          <section className="relative w-full h-[920px] min-h-[100svh] overflow-hidden">
            <ResponsiveImg src="/redesign/story-hero.jpg" alt="Chef Gerardo Álvarez Saucedo at Silent H" sizes="100vw" loading="eager" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
            {/* .our-story-hero-vignette (same as desktop) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.24), transparent 52%, rgba(0,0,0,0.5) 78%, #000 100%), linear-gradient(90deg, rgba(0,0,0,0.42), transparent 58%)",
              }}
            />
            {/* top is the .fig 689px, but capped so the block never falls below the visible
                viewport on short phones (block is ~195px tall → keep ~220px of headroom).
                On tall phones 100svh-220 > 689 so it stays at the design 689px, unchanged. */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-30px)] max-w-[620px] flex flex-col items-center gap-8 text-center" style={{ top: "min(689px, calc(100svh - 220px))" }}>
              {/* Hero header — 's mobile .our-story-hero h1: NOT uppercase, clamp(43,12.5vw,58),
                  lh 1.02, ls 0.045em, shadow; "reimagined" on its own line. */}
              <p className="font-display font-bold text-sh-cream text-[clamp(43px,12.5vw,58px)] leading-[1.02] tracking-[0.045em] [text-shadow:0_8px_30px_rgba(0,0,0,0.45)]">
                The soul of México,<br />reimagined
              </p>
              <p className="font-body font-normal text-sh-cream text-[18px] leading-[1.45] tracking-[0.025em] [text-shadow:0_3px_18px_#000]">{HERO_SUB}</p>
            </div>
          </section>

          {/* uniform vertical stack (Frame 1671, gap 60): philosophy → inspiración → rows */}
          <div className="mt-[60px] px-9 flex flex-col gap-[60px]">
            <Reveal className="flex flex-col items-center gap-11 text-center">
              <h2 className="font-display font-bold uppercase text-sh-cream text-[32px] leading-[1] tracking-[0.05em]">Our culinary philosophy</h2>
              <p className={`${M.body} ${BODY} leading-[1.2]`}>{PHILOSOPHY}</p>
            </Reveal>

            <Parallax speed={-0.04}>
              <div className="relative overflow-hidden h-[570px]">
                <ResponsiveImg src="/redesign/story-inspiracion.webp" alt="The streets of México that inspire Silent H" sizes="92vw" className="h-full w-full object-cover object-[center_58%]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_28%,transparent_44%)]" />
                <h2 className="absolute inset-x-[30px] top-[110px] text-center font-display font-bold uppercase text-sh-cream text-[38px] leading-[1] tracking-[0.07em]">La inspiración</h2>
              </div>
            </Parallax>

            {ROWS.map((row) => (
              <div key={row.title} className="contents">
                <Reveal className="flex flex-col">
                  <h3 className="font-body font-bold text-sh-cream text-[30px] leading-[1.08] tracking-[0.035em] mb-8">{row.title}</h3>
                  {row.body.split("\n").map((para, i, arr) => (
                    <p key={i} className={`font-body font-normal text-[#b9aca4] text-[18px] leading-[1.45] tracking-[0.025em]${i < arr.length - 1 ? " mb-[18px]" : ""}`}>{para}</p>
                  ))}
                </Reveal>
                <Parallax speed={-0.04}>
                  <div className="overflow-hidden h-[min(130vw,650px)]">
                    <ResponsiveImg src={row.img} alt={row.alt} sizes="92vw" className={`h-full w-full object-cover ${row.pos || "object-center"}`} />
                  </div>
                </Parallax>
              </div>
            ))}
          </div>

          <div aria-hidden className="h-[80px]" />
        </div>

        {/* ════════════ EXPERIENCE SILENT H — reservation CTA ════════════
            New section from the 's Our Story iterations. Muted rose panel
            (#d24965) with near-black text; dark solid primary + outlined secondary.
            Shared across breakpoints (self-contained clamp type, not --dw-based). */}
        <section className="relative w-full bg-[#d24965] text-[#050505] text-center px-6 py-[78px] md:py-[92px] overflow-hidden">
          <Reveal className="mx-auto w-[min(960px,100%)] flex flex-col items-center">
            <p className="font-body font-bold uppercase text-[14px] tracking-[0.2em]">Your table is waiting</p>
            <h2 className="mt-[22px] font-display font-bold uppercase text-[clamp(30px,6vw,68px)] leading-[0.96] tracking-[0.035em]">
              Experience Silent H
            </h2>
            <p className="mt-6 font-body text-[clamp(18px,1.85vw,24px)] leading-[1.45] tracking-[0.075em] max-w-[680px]">
              Join us for bold Mexican flavours, handcrafted cocktails, and a night made to be remembered.
            </p>
            <div className="mt-[38px] w-full flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
              <button
                onClick={openReservationWidget}
                className="w-full sm:w-auto min-w-[250px] min-h-[56px] inline-flex items-center justify-center rounded-[4px] border border-[#050505] bg-[#050505] text-sh-cream font-body font-bold uppercase text-[14px] tracking-[0.13em] px-[24px] py-[14px] hover:bg-sh-cream hover:text-[#050505] transition-colors"
              >
                Book Your Reservation
              </button>
              <Link
                to="/menu"
                className="w-full sm:w-auto min-w-[250px] min-h-[56px] inline-flex items-center justify-center rounded-[4px] border border-[#050505] bg-transparent text-[#050505] font-body font-bold uppercase text-[14px] tracking-[0.13em] px-[24px] py-[14px] hover:bg-[#050505]/10 transition-colors"
              >
                View the Menu
              </Link>
            </div>
          </Reveal>
        </section>

        <RelatedGuides
          className="py-20 md:py-[calc(var(--dw)*10/100)]"
          links={[
            { to: "/blogs/date-night-restaurants-toronto", label: "Date-night restaurants in Toronto" },
          ]}
        />
      </main>
    </>
  );
}
