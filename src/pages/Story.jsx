import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import RelatedGuides from "../components/RelatedGuides";
import { T, M } from "../styles/figmaTokens";

/* Silent H — Our Story. Pixel-rebuilt from the Figma frames:
     Desktop 5458:894 (1280×4842) · Mobile 5452:806 (393×5788).
   Resolved type (linked style = truth; node "Mondwest" is a stale cache):
     hero  Monoglyphic BOLD 60 / Mobile 40 UPPER     → T.hero + font-bold
     H1    Monoglyphic BOLD 40 UPPER (phil/inspir)    → T.h1  + font-bold
     H2    Monoglyphic Reg 28 (row titles)            → T.h2  (regular)
     body  NeueBit 22 (·18 mobile)                    → T.body / M.body, dimmed to a warm grey
   Headings are cream #ece1d4; body paragraphs render a warm grey (~#b1a79b = cream/75).
   Content images are arches (rounded-t 216px desktop / 200px mobile); hero is full-bleed, NO
   overlay/filter (per .fig). The inspiración photo's warm/faded film grade (.fig paintFilter:
   temperature, lifted shadows, vibrance) is BAKED into the asset via histogram-matching to the
   Figma render — CSS filters couldn't reproduce it. The grandmother photo is likewise
   baked (same histogram-match) and mirrored horizontally (m00=-1).
   Copy is verbatim from the .fig (incl. its “recipe's” / “Mexico’s” quirks). */

const BODY = "text-sh-cream/75"; // warm-grey body (cream dimmed ~75%, matches the .fig render)

const HERO_SUB = "Cuisine that is rooted in tradition, elevated by innovation, and undeniably memorable.";
const PHILOSOPHY =
  "It blends bold creativity with deep respect for Mexico’s rich gastronomic heritage. Guided by Chef Gerardo Álvarez Saucedo, our kitchen reimagines long standing family recipe's bringing familiar flavours with refined technique, creating dishes that honour their origins while inviting new discovery. Every plate is inspired by the streets of Mexico, shaped by obsession for quality, and driven by an uncompromising pursuit of flavour.";

// Alternating image/text rows (Figma Frame 1646/1645/1647). side = image side (desktop).
const ROWS = [
  {
    img: "/redesign/story-1.jpg",
    alt: "Chef Saucedo's grandmother making fresh masa",
    side: "left",
    flip: true, // .fig mirrors this photo horizontally (m00=-1)
    title: "The heart of our kitchen is a story rooted in love, memory, and tradition.",
    body:
      "Chef Saucedo draws inspiration from his late grandmother, whose warmth and passion for cooking shaped his earliest memories.\nHer honoured recipes, once shared around a family table, now come to life on our menu—reimagined with elegance and respect for their origins. Each dish is a tribute to her legacy, blending the rich flavours of traditional Mexican cuisine with the artistry of fine dining. Through every bite, we invite you to experience the soul of his childhood and the enduring spirit of the woman who started it all.",
  },
  {
    img: "/redesign/story-2.jpg",
    alt: "A vibrant spread of cocktails and dishes at Silent H",
    side: "right",
    title: "Setting a tone that is both vibrant and refined.",
    body:
      "Our service is intuitive and heartfelt, attentive without ever intruding.\nWhether you're joining us for an impromptu cocktail after a long day or gathering with friends for a celebratory dinner, we craft each moment with care. The experience feels effortless, elevated, and always memorable. A true taste of contemporary Mexico.",
  },
  {
    img: "/redesign/story-3.jpg",
    alt: "Handcrafted tacos served at Silent H",
    side: "left",
    mBody: 22, // .fig mobile renders this body at NeueBit 22 (others 18)
    title: "Every dish tells a story.",
    body:
      "At Silent H every visit becomes a cherished memory. From the sizzle of Espadas de rib eye asadas arriving at your table to the laughter shared over handcrafted regional inspired cocktails, we’re more than just a place to eat — we’re a place where moments are made. Whether it’s a lively family gathering, a date with a special someone, or a spontaneous night out with friends, our vibrant flavours and warm hospitality create an atmosphere that brings people together. Here, the experience goes beyond the plate, turning every visit into lasting memories.",
  },
];

export default function Story() {
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
          {/* Hero — full-bleed chef portrait (no overlay/filter per .fig), bold headline + subtitle */}
          <section className="relative w-full h-[calc(var(--dw)*65.23/100)] min-h-[100svh] overflow-hidden">
            <img src="/redesign/story-hero.jpg" alt="Chef Gerardo Álvarez Saucedo at Silent H" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 mx-auto w-[var(--dw)]">
              {/* top is the .fig 601px (46.95% of --dw), but capped so the block (~15% of --dw
                  tall) never falls below a short viewport — e.g. a wide, low window. On normal-
                  height displays 100svh - 18%·dw > 46.95%·dw, so it stays at the design 601px. */}
              <Reveal
                className="absolute left-[calc(var(--dw)*5.47/100)] w-[calc(var(--dw)*66.41/100)] flex flex-col items-start gap-[calc(var(--dw)*2.5/100)]"
                style={{ top: "min(calc(var(--dw) * 46.95 / 100), calc(100svh - var(--dw) * 18 / 100))" }}
              >
                <h1 className={`${T.hero} font-bold text-sh-cream leading-[1]`}>The soul of México, reimagined</h1>
                <p className={`${T.subtitle} text-sh-cream leading-[1]`}>{HERO_SUB}</p>
              </Reveal>
            </div>
          </section>

          {/* Our culinary philosophy — centered, bold heading (Frame 1643 @167,975) */}
          <Reveal className="mt-[calc(var(--dw)*10.94/100)] mx-auto w-[calc(var(--dw)*73.91/100)] flex flex-col items-center gap-[calc(var(--dw)*3.44/100)] text-center">
            <h2 className={`${T.h1} font-bold uppercase text-sh-cream leading-[1]`}>Our culinary philosophy</h2>
            <p className={`${T.body} ${BODY} leading-[1.2]`}>{PHILOSOPHY}</p>
          </Reveal>

          {/* La inspiración — arch image (filtered) + overlaid bold title (@360,1809) */}
          <Parallax speed={-0.05} className="mt-[calc(var(--dw)*10.86/100)] mx-auto w-[calc(var(--dw)*73.91/100)]">
            <div className="relative overflow-hidden rounded-t-[calc(var(--dw)*16.875/100)] h-[calc(var(--dw)*46.875/100)]">
              <img src="/redesign/story-inspiracion.jpg" alt="The streets of México that inspire Silent H" className="h-full w-full object-cover object-center" />
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-sh-black/85 to-transparent" />
              <h2 className={`${T.h1} font-bold uppercase text-sh-cream leading-[1] absolute inset-x-0 bottom-[calc(var(--dw)*4.69/100)] text-center`}>La inspiración</h2>
            </div>
          </Parallax>

          {/* Alternating rows — image arch + text, gap title→body tightened, text nudged down to
              centre on the arch (its rounded top shifts the visual weight lower). */}
          {ROWS.map((row) => (
            <div key={row.title} className="mt-[calc(var(--dw)*9.375/100)] mx-auto w-[calc(var(--dw)*73.91/100)] flex items-center gap-[calc(var(--dw)*4.69/100)]">
              <Parallax speed={-0.04} className={`${row.side === "right" ? "order-2" : "order-1"} w-[calc(var(--dw)*36.17/100)] shrink-0`}>
                <div className="overflow-hidden rounded-t-[calc(var(--dw)*16.875/100)] h-[calc(var(--dw)*44.22/100)]">
                  <img src={row.img} alt={row.alt} loading="lazy" className={`h-full w-full object-cover object-center ${row.flip ? "scale-x-[-1]" : ""}`} style={row.filter ? { filter: row.filter } : undefined} />
                </div>
              </Parallax>
              <Reveal className={`${row.side === "right" ? "order-1" : "order-2"} relative top-[calc(var(--dw)*2/100)] flex-1 flex flex-col gap-[calc(var(--dw)*1.56/100)]`}>
                <h3 className={`${T.h2} text-sh-cream leading-[1.2]`}>{row.title}</h3>
                <p className={`${T.body} ${BODY} leading-[1.2] whitespace-pre-line`}>{row.body}</p>
              </Reveal>
            </div>
          ))}

          <div aria-hidden className="h-[calc(var(--dw)*12.5/100)]" />
        </div>

        {/* ════════════ MOBILE ════════════ (Figma 5452:806, content x36 / w321) */}
        <div className="md:hidden">
          {/* Hero — full-bleed, centered bold headline + subtitle (Frame 1642 @36,689) */}
          <section className="relative w-full h-[920px] min-h-[100svh] overflow-hidden">
            <img src="/redesign/story-hero.jpg" alt="Chef Gerardo Álvarez Saucedo at Silent H" className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
            {/* top is the .fig 689px, but capped so the block never falls below the visible
                viewport on short phones (block is ~195px tall → keep ~220px of headroom).
                On tall phones 100svh-220 > 689 so it stays at the design 689px, unchanged. */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[321px] max-w-[calc(100%-72px)] flex flex-col items-center gap-8 text-center" style={{ top: "min(689px, calc(100svh - 220px))" }}>
              <p className="font-display font-bold uppercase text-sh-cream text-[40px] leading-[1] tracking-[0.05em]">The soul of México, reimagined</p>
              <p className={`${M.body} text-sh-cream leading-[1.2]`}>{HERO_SUB}</p>
            </div>
          </section>

          {/* uniform vertical stack (Frame 1671, gap 60): philosophy → inspiración → rows */}
          <div className="mt-[60px] px-9 flex flex-col gap-[60px]">
            <Reveal className="flex flex-col items-center gap-11 text-center">
              <h2 className="font-display font-bold uppercase text-sh-cream text-[32px] leading-[1] tracking-[0.05em]">Our culinary philosophy</h2>
              <p className={`${M.body} ${BODY} leading-[1.2]`}>{PHILOSOPHY}</p>
            </Reveal>

            <Parallax speed={-0.04}>
              <div className="relative overflow-hidden rounded-t-[200px] h-[480px]">
                <img src="/redesign/story-inspiracion.jpg" alt="The streets of México that inspire Silent H" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-x-0 bottom-0 h-[88px] bg-gradient-to-t from-sh-black/85 to-transparent" />
                <h2 className="font-display font-bold uppercase text-sh-cream text-[24px] leading-[1.2] tracking-[0.05em] absolute inset-x-0 bottom-[30px] text-center">La inspiración</h2>
              </div>
            </Parallax>

            {ROWS.map((row) => (
              <div key={row.title} className="contents">
                <Reveal className={`flex flex-col ${row.mBody ? "gap-11" : "gap-7"}`}>
                  <h3 className="font-display text-sh-cream text-[18px] leading-[1.4] tracking-[0.05em]">{row.title}</h3>
                  <p className={`font-body ${BODY} leading-[1.2] tracking-[0.1em] whitespace-pre-line`} style={{ fontSize: `${row.mBody || 18}px` }}>{row.body}</p>
                </Reveal>
                <Parallax speed={-0.04}>
                  <div className="overflow-hidden rounded-t-[200px] h-[480px]">
                    <img src={row.img} alt={row.alt} loading="lazy" className={`h-full w-full object-cover object-center ${row.flip ? "scale-x-[-1]" : ""}`} style={row.filter ? { filter: row.filter } : undefined} />
                  </div>
                </Parallax>
              </div>
            ))}
          </div>

          <div aria-hidden className="h-[80px]" />
        </div>

        <RelatedGuides
          className="pb-20 md:pb-[calc(var(--dw)*10/100)]"
          links={[
            { to: "/blogs/date-night-restaurants-toronto", label: "Date-night restaurants in Toronto" },
          ]}
        />
      </main>
    </>
  );
}
