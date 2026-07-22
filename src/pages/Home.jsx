import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import SEO from "../components/SEO.jsx";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import { useOTWidget } from "../components/OTwidget.jsx";
import { T, M, BTN_OUTLINE } from "../styles/figmaTokens";
import MenuCarousel from "../components/MenuCarousel";
import LazyVideo from "../components/LazyVideo";
import LazyMount from "../components/LazyMount";


// Outlined Secondary button (cream border, label fades cream→pink on hover). Renders a
// <Link> when `to` is set, else a <button> (for actions like the booking widget). Pass
// width/height via `size`, e.g. size="w-[16.875vw] h-[3.75vw]".
function OutlineButton({ to, onClick, size = "", children }) {
  const cls = `${BTN_OUTLINE} ${size}`;
  return to ? (
      <Link to={to} className={cls}>{children}</Link>
  ) : (
      <button onClick={onClick} className={cls}>{children}</button>
  );
}

// ── Silent H Home — Desktop pixel-exact rebuild from Figma ground-truth ──
// Design frame: 1280×4842. Scale rule: 1px @1280 = 0.078125vw (full-bleed vw).
// Every desktop measurement below is px × 0.078125. Fonts: Mondwest headings
// (font-display), NeueBit body/UI (font-body), Monoglyphic chef-quote 2nd line.
// Colors are the RESOLVED Figma style: SH-Off-white #ece1d4 → text-sh-cream,
// SH-Light-Beige #dfa867 → text-sh-gold, SH-Pink #eb4660 → text-sh-pink.
// The page is dark (black body); the global DustGate shows through transparent
// sections, except where Figma has photos / gradients (handled per-section).

// Menú grid — Frame 1435 @(167,1060). Three cards in a row (Frame 1434, gap21):
//   Frame 1431 269×370 (fig-dsc-4248)  |  Frame 1432 366×371 (Carbelle Djossa)
//   |  Frame 1433 269×371 (DSC9358). Each card: photo r4 + "PRODUCT NAME" caption.
// Then Frame 1417: 8 pagination dots (gap8), the 4th pink (#eb4660), rest grey #9a9a9a.
// Exact De Monterrey arch path (decoded from Figma vector blob 648, "Vector 2", 365×639).
// Used to clip the Monterrey map VIDEO and to stroke the 20px gold OUTSIDE frame (+ thin black).
// Start at the TOP-CENTRE (a smooth curve point), not a corner. A dashed stroke caps (flat) at the
// path start/end — if that point is the bottom-RIGHT corner the gold miter-square never renders
// there while the bottom-left (mid-path) one does. Starting at the top makes BOTH bottom corners
// normal mid-path joins, so both gold squares render. (Same shape, just reordered + clockwise.)
const DM_ARCH = "M 181.6 0 C 279.17 0 344.52 50.62 365 75.93 L 365 639 L 0 639 L 0 75.93 C 19.88 50.62 84.02 0 181.6 0 Z";

const MOBILE_ARCH_WIDTH = 210;
const MOBILE_ARCH_VIEWBOX_WIDTH = 365;
const MOBILE_ARCH_VIEWBOX_HEIGHT = 639;
const MOBILE_ARCH_SCALE = MOBILE_ARCH_WIDTH / MOBILE_ARCH_VIEWBOX_WIDTH;
const MOBILE_ARCH_HEIGHT = MOBILE_ARCH_VIEWBOX_HEIGHT * MOBILE_ARCH_SCALE;

const DM_ARCH_MASK = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365 639"><path fill="black" d="${DM_ARCH}"/></svg>`
)}")`;


const BlogSection = lazy(() => import("../components/BlogSection"));

export default function Home() {
  const { openReservationWidget } = useOTWidget();


  return (
      <>
        <SEO
            title="Silent H NYC | Modern Mexican Cuisine"
            description="Silent H is a modern Mexican restaurant and agave lounge in NYC's Meatpacking District. Chef-driven plates, $10 happy-hour margaritas, and late nights at Aitch."
            url="https://www.silenthnyc.com/"
            preloads={[
              {
                href: "/redesign/mewhero-393.avif",
                type: "image/avif",
                media: "(max-width: 767px)",
                fetchPriority: "high",
              },
              {
                href: "/redesign/newhero-1280.avif",
                type: "image/avif",
                media: "(min-width: 768px)",
                imageSrcSet: [
                  "/redesign/newhero-960.avif 960w",
                  "/redesign/newhero-1280.avif 1280w",
                  "/redesign/newhero-1600.avif 1600w",
                  "/redesign/newhero-1920.avif 1920w",
                ].join(", "),
                imageSizes: "100vw",
                fetchPriority: "high",
              },
            ]}
        />
        <main className="relative z-10 font-body text-sh-cream">
          {/* ════════════════════════════ 1. HERO ════════════════════════════
            Layer_1 sun graphic @(-284,-268) 971×1193 bleeds off top-left.
            Frame 1427 text @(453,283) 660w, gap32: H1 "Mexican flavours, refined"
            Mondwest Bold 64px ls4.48 cream + paragraph NeueBit 22px cream +
            SecondaryButton 216×48 r4. The hero dust is the global DustGate. */}
          <section className="relative w-full overflow-hidden">
            <div className="relative hidden md:block w-full h-[65.39vw]">
              {/* Full-bleed hero — the stained-glass Sacred Heart. Its natural 1.53 aspect
                matches the 1280×837 frame, so it fills h-[65.39vw] with no crop. */}
              <picture>
                <source
                    type="image/avif"
                    srcSet={[
                      "/redesign/newhero-960.avif 960w",
                      "/redesign/newhero-1280.avif 1280w",
                      "/redesign/newhero-1600.avif 1600w",
                      "/redesign/newhero-1920.avif 1920w",
                    ].join(", ")}
                    sizes="100vw"
                />

                <source
                    type="image/webp"
                    srcSet={[
                      "/redesign/newhero-960.webp 960w",
                      "/redesign/newhero-1280.webp 1280w",
                      "/redesign/newhero-1600.webp 1600w",
                      "/redesign/newhero-1920.webp 1920w",
                    ].join(", ")}
                    sizes="100vw"
                />

                <img
                    src="/redesign/newhero-1280.webp"
                    alt="Silent H modern Mexican restaurant and agave cocktail bar in NYC's Meatpacking District"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute left-0 top-0 w-full h-[65.39vw] object-cover select-none"
                    draggable="false"
                />
              </picture>
              {/* Nav scrim (top) + text scrim (bottom half) so the cream copy stays legible over
                the bright heart. */}
              <div className="absolute inset-x-0 top-0 h-[13vw] bg-gradient-to-b from-black/60 to-transparent pointer-events-none"/>
              <div className="absolute inset-x-0 bottom-0 h-[45vw] bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none"/>
              {/* Frame 1427 @(167,467) 946×276 — CENTERED heading / subtitle / button (Figma:
                flex-col, items-center, gap 32px; all text-center). */}
              <Parallax speed={0.05}
                        className="absolute left-1/2 top-[36.48vw] w-[73.91vw] -translate-x-1/2">
                <Reveal>
                  <div className="flex flex-col items-center text-center gap-[2.5vw]">
                    {/* Monoglyphic Bold 64px, ls 6.4px (10%), centered */}
                    <h1 className="font-display font-bold text-sh-cream leading-none text-[5vw] tracking-[0.5vw]">
                      Mexican flavours, celebrated in NYC
                    </h1>
                    {/* NeueBit Bold 22px ls4.4, centered */}
                    <p className={`w-full ${T.subtitle} text-sh-cream leading-none tracking-[4.4px] font-bold`}>
                      Chef Gerardo brings Mexico's street flavours to NYC. Elevated, authentic and an homage to
                      Monterrey.
                    </p>
                    {/* SecondaryButton: px28 py20 r4 */}
                    <OutlineButton onClick={openReservationWidget} size="px-[2.19vw] py-[0.86vw] font-bold">
                      BOOK YOUR EXPERIENCE
                    </OutlineButton>
                  </div>
                </Reveal>
              </Parallax>
            </div>

                {/* Mobile hero */}
                <div
                 className="
                    md:hidden
                    relative
                    w-full
                    overflow-hidden
                    bg-black
                    pt-[134vw]
                    pb-16
                  "
                >
                  {/* Image layer — fills the entire hero, including behind the copy and button */}
                  <div className="absolute inset-0 z-0">
                    <picture>
                      <source
                          type="image/avif"
                          srcSet="/redesign/mewhero-393.avif 393w"
                          sizes="100vw"
                      />

                      <source
                          type="image/webp"
                          srcSet="/redesign/mewhero-393.webp 393w"
                          sizes="100vw"
                      />

                      <img
                          src="/redesign/mewhero-393.webp"
                          alt="Silent H agave cocktails and Mexican plates, Meatpacking District NYC"
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          draggable="false"
                          className="
                                pointer-events-none
                                h-full
                                w-full
                                select-none
                                object-cover
                                object-top
                                     "
                                    />
                                   </picture>
                  </div>

                  {/*
                      Main lower shadow.
                    */}
                  {/* Mobile hero shadow: fades the image into the black page background */} <div className="absolute left-0 top-[18.52vw] w-full h-[190vh] bg-gradient-to-b from-white to-[#2c0c03] mix-blend-multiply pointer-events-none"/>

                  {/* Subtle side vignette like the reference */}
                  <div
                      aria-hidden="true"
                      className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-10
                            bg-[linear-gradient(to_right,rgba(0,0,0,0.18)_0%,transparent_16%,transparent_82%,rgba(0,0,0,0.24)_100%)]
                          "
                                    />

                  {/* Content */}
                  <Reveal className="relative z-20 mx-auto flex w-full max-w-[321px] flex-col items-start">
                    <h1 className="font-display text-[40px] font-bold uppercase leading-none tracking-[0.05em] text-sh-cream">
                      Mexican flavours, celebrated in NYC
                    </h1>

                    <p className="mt-8 font-body text-[18px] font-bold leading-[1.6] tracking-[0.125em] text-sh-cream">
                      Chef Gerardo brings Mexico&apos;s street flavours to NYC.
                      Elevated, authentic and an homage to Monterrey.
                    </p>

                    <button
                        onClick={openReservationWidget}
                        className="mt-8 inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[16px] tracking-[0.1em] w-[216px] h-[48px] hover:bg-sh-cream hover:text-sh-black transition-colors font-bold"
                    >
                      Book Your Experience
                    </button>
                  </Reveal>
                </div>
          </section>
          <section className="text-sh-cream px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display uppercase text-2xl md:text-4xl mb-6">A Modern Mexican Restaurant in
                NYC</h2>
              <p className="text-base md:text-lg leading-relaxed text-sh-cream/85">Silent H is a modern Mexican
                restaurant and agave cocktail lounge in NYC's Meatpacking District. Led by Chef Gerardo Álvarez
                Saucedo, the kitchen reimagines traditional Mexican family recipes with refined technique, from charred
                guacamole and crispy chicharrón tacos to mesquite-grilled rib-eye espadas and a 44oz tomahawk. Next
                door, our late-night lounge Aitch pours a world-class program of artisanal tequila and mezcal alongside
                elevated bites, with guest DJs Thursday through Sunday. Join us for happy hour every day from 5 to 7pm,
                settle in for a downtown NYC date night, or plan a private event across two Mexican-inspired spaces. Silent
                H is open for dinner Tuesday to Sunday from 5pm at 416 West 13th Street.</p>
            </div>
          </section>


          {/* ═══════════════════ 2. MENÚ EXCEPCIONAL ═══════════════════pm r
            Frame 1436 @(167,957) 946w centered, gap32. Heading Mondwest Bold 28px
            cream centered; subtitle NeueBit Bold 22px cream centered; 3-photo grid
            (cards 269/366/269, r4) + "PRODUCT NAME" caption; 8 dots (4th pink);
            "Explore the Menu" button 184×48 centered. */}
          <MenuCarousel/>

          {/* Figma gap: Menú section → Private Dining (≈95px @1280) — keeps absolute Y in step */}
          <div aria-hidden className="hidden md:block w-full h-[7.42vw]" />

          {/* ════════════════ 3. PRIVATE DINING & EVENTS ════════════════
            Figma composition: a CENTERED heading / subtitle / "Plan Your Event" button,
            then a FULL-BLEED mural (Silent H NYC mural + winged statues, image
            "private-dining-*") that fades from black at the top and carries an edge
            vignette. (Replaced the earlier left-text / right-photo split.) */}
          <section className="relative w-full overflow-hidden">
            {/* Desktop — Figma: centered heading/subtitle/button, then a FULL-BLEED mural
              (Silent H NYC mural + winged statues) that fades from black at the top and
              carries an edge vignette to match the reference. */}
            <div className="hidden md:block relative w-full bg-sh-black">
              {/* Full-bleed mural (natural 1280×602) with the Figma vignette + overlaid centered text */}
              <div className="relative w-full">
                <picture>
                  <source
                      type="image/avif"
                      srcSet={[
                        "/redesign/private-dining-768.avif 768w",
                        "/redesign/private-dining-960.avif 960w",
                        "/redesign/private-dining-1280.avif 1280w",
                      ].join(", ")}
                      sizes="100vw"
                  />
                  <source
                      type="image/webp"
                      srcSet={[
                        "/redesign/private-dining-768.webp 768w",
                        "/redesign/private-dining-960.webp 960w",
                        "/redesign/private-dining-1280.webp 1280w",
                      ].join(", ")}
                      sizes="100vw"
                  />
                  <img
                      src="/redesign/private-dining-1280.webp"
                      width="1280"
                      height="602"
                      alt="Silent H private dining room with a Mexican mural and winged statues"
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto object-cover"
                  />
                </picture>
                {/* Rectangle 187 — radial vignette: bright centre, edges → black, via multiply
                  (Figma: radialGradient white@33.6% → black at the edges, mix-blend multiply). */}
                <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[radial-gradient(ellipse_farthest-side_at_center,transparent_33.6%,#000_100%)]"/>
                {/* Top scrim so the overlaid heading stays legible */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-sh-black via-black/40 to-transparent"/>
                {/* Soft seal to black at the bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-sh-black to-transparent"/>
                {/* Frame 1428 — CENTERED heading / subtitle / button, overlaid near the top */}
                <Reveal className="absolute inset-x-0 top-[3.5vw] z-10 flex flex-col items-center text-center px-[10vw] gap-[2vw]">
                  <h2 className={`${T.h1} uppercase text-sh-cream leading-[1.1]`}>
                    Private dining &amp; events
                  </h2>
                  <p className={`${T.body} text-sh-cream leading-[1.25] max-w-[56vw]`}>
                    Plan your celebración auténtica in our vibrant NYC space. Book your holiday event before
                    October 31st and receive a $100 gift card. Terms apply.
                  </p>
                  <OutlineButton to="/events" size="w-[16vw] h-[3.75vw] font-bold">
                    Plan Your Event
                  </OutlineButton>
                </Reveal>
              </div>
            </div>

            {/* Mobile — same Figma composition: centered heading/subtitle/button, then the
              full-bleed mural with black fades top & bottom. */}
            <div className="md:hidden w-full bg-sh-black flex flex-col items-center pb-16">
              <Reveal className="flex flex-col items-center text-center px-6 pt-10 pb-6 gap-5">
                <h2 className={`${M.h2} uppercase text-sh-cream leading-[1.2]`}>
                  Private dining &amp; events
                </h2>
                <p className="font-body text-[18px] tracking-[0.1em] text-sh-cream leading-[1.4] max-w-[321px]">
                  Plan your celebración auténtica in our vibrant NYC space. Book your holiday event before
                  October 31st and receive a $100 gift card. Terms apply.
                </p>
                <Link to="/events" className="inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[16px] tracking-[0.1em] w-[164px] h-[48px] hover:bg-sh-cream hover:text-sh-black transition-colors">
                  Plan Your Event
                </Link>
              </Reveal>
              <div className="relative w-full">
                <picture>
                  <source
                      type="image/avif"
                      srcSet={[
                        "/redesign/private-dining-480.avif 480w",
                        "/redesign/private-dining-768.avif 768w",
                        "/redesign/private-dining-960.avif 960w",
                      ].join(", ")}
                      sizes="100vw"
                  />
                  <source
                      type="image/webp"
                      srcSet={[
                        "/redesign/private-dining-480.webp 480w",
                        "/redesign/private-dining-768.webp 768w",
                        "/redesign/private-dining-960.webp 960w",
                      ].join(", ")}
                      sizes="100vw"
                  />
                  <img
                      src="/redesign/private-dining-768.webp"
                      width="768"
                      height="361"
                      alt="Silent H private dining room with a Mexican mural and winged statues"
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto"
                  />
                </picture>
                {/* Rectangle 187 radial vignette (multiply) — same as desktop */}
                <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[radial-gradient(ellipse_farthest-side_at_center,transparent_33.6%,#000_100%)]"/>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-sh-black to-transparent"/>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-sh-black to-transparent"/>
              </div>
            </div>
          </section>

          {/* Figma gap: Private Dining → De Monterrey (≈70px @1280) */}
          <div aria-hidden className="hidden md:block w-full h-[5.47vw] bg-sh-black" />

          {/* ═══════════════ 4. DE MONTERREY PARA EL MUNDO ═══════════════
            Mountain bg fig-beautiful-kathmandu @(-1,2764) 1283×490 + pink→black
            gradient (Rect 174 @2341, Rect 176 @3063). LEFT: curved gold "DE MONTERREY"
            over map @(167,2486) + "PARA EL MUNDO" Mondwest Bold 64px GOLD centered
            @(69,3174). RIGHT @(650,2722): quote line1 Mondwest Bold 22px + line2
            Monoglyphic Regular 22px (both cream) + "Chef Gerardo Álvarez Saucedo" NeueBit
            Bold 22px cream + outlined SecondaryButton 306×51. */}
          {/* NO opaque section bg — the global DUST (Spline sparks, fixed z-0 behind the page)
            must show through the De Monterrey sky like the figma reference ("sparks above the
            mountains"). Darkness comes from the black body behind the transparent dust; the
            mountain photo (opaque, lower band) ends the sparks. */}
          <section className="relative w-full overflow-hidden">
            {/* Section spans Figma y2341..3434 (Rect174 top → Blog start) = 1093px → 85.39vw. */}
            <div className="relative hidden md:block w-full h-[85.39vw]">
              {/* very faint twilight wash — dark GREEN tone to match the Figma sky (Rectangle 174
                is a green→transparent gradient, not the old rose) WITHOUT hiding the dust sparks */}
              <div className="absolute inset-0 bg-[#07120a]/20" />
              {/* Rectangle 174 #407440→transparent (Figma ground-truth) — VERTICAL linear gradient,
                drawn BEHIND the mountain so the ridge reads as a silhouette against it. Peak
                #407440 at the mountain's top edge (~46% of the section). */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_8%,#16301a_30%,#2f5e34_42%,#407440_46%,#12300f_50%,transparent_56%)]" />
              {/* Kathmandu mountains @(-1,2764) 1283×490 → top 33.05vw. WEBP keeps the ALPHA: the
                transparent sky ABOVE the jagged ridge lets the glow + dust sparks show through,
                so the ridge reads as a silhouette and the city lights sit below it. (The old .jpg
                lost the alpha → the sky went opaque black and the mountain "disappeared".) */}
              <div className="absolute left-[-0.08vw] top-[33.05vw] w-[100.23vw] h-[38.28vw]">
                <picture>
                  <source
                      type="image/avif"
                      srcSet={[
                        "/redesign/monterrey-mountain-960.avif 960w",
                        "/redesign/monterrey-mountain-1280.avif 1280w",
                        "/redesign/monterrey-mountain-1600.avif 1600w",
                        "/redesign/monterrey-mountain-1920.avif 1920w",
                      ].join(", ")}
                      sizes="100vw"
                  />

                  <source
                      type="image/webp"
                      srcSet={[
                        "/redesign/monterrey-mountain-960.webp 960w",
                        "/redesign/monterrey-mountain-1280.webp 1280w",
                        "/redesign/monterrey-mountain-1600.webp 1600w",
                        "/redesign/monterrey-mountain-1920.webp 1920w",
                      ].join(", ")}
                      sizes="100vw"
                  />

                  <img
                      src="/redesign/monterrey-mountain-1280.webp"
                      width="1280"
                      height="489"
                      alt="Mountains of Monterrey, México"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top brightness-[0.72]"
                  />
                </picture>
                {/* Smooth dark zone UNDER the ridge so the mountain (dark) fades into the city (dark)
                  as the SAME black — no hard seam — and the city lights only read at the bottom. */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_6%,#0b0712_26%,#0b0712_50%,transparent_78%)]"/>
              </div>
              {/* Rectangle 176 @(0,3063): soft bottom seal over the city's lower edge */}
              <div
                  className="absolute inset-x-0 top-[56.41vw] h-[16.17vw] bg-gradient-to-b from-transparent to-black/85"/>
              {/* solid black floor below the mountain to the blog */}
              <div className="absolute inset-x-0 top-[71.33vw] bottom-0 bg-sh-black"/>

              {/* ── Arch @(167,2486) 365×639. Map VIDEO (Monterrey 1) clipped to the arch,
                + Vector 2 gold 20px OUTSIDE frame + Vector 1 black 4px OUTSIDE edge,
                + DE MONTERREY arced over the top. SVG units = design px (1u = 0.078125vw)
                so geometry is exact; overflow-visible lets the outside strokes + text show. */}
              <Parallax speed={-0.05} className="absolute left-[13.05vw] top-[11.33vw] w-[28.52vw]">
                <svg viewBox="0 0 365 639" className="w-full h-auto" style={{ overflow: "visible", filter: "drop-shadow(0 1vw 2vw rgba(0,0,0,0.55))" }}>
                  <defs>
                    <clipPath id="dmArch"><path d={DM_ARCH} /></clipPath>
                    {/* DE MONTERREY arc: tighter radius = more curve (figma curves more) */}
                    <path id="dmTextArc" d="M -14 46 A 315 315 0 0 1 379 46" />
                  </defs>
                  {/* Cream parchment matte (Vector 2 fill) */}
                  <path d={DM_ARCH} fill="#ece1d4" />
                  {/* Vector 2 gold frame = DASHED TEETH ONLY — figma has NO continuous rim, just the
                    spikes. Drawn 40 wide so 20px of teeth show outside after the map covers the
                    inner half. (Removed the solid-band+comb that I wrongly added a rim with.) */}
                  <path d={DM_ARCH} fill="none" stroke="#dfa867" strokeWidth="34" strokeDasharray="1.8 3" strokeLinejoin="miter" />
                  {/* Map VIDEO clipped to the arch. VINTAGE = darker + warmer but COLOUR INTACT
                    (figma is muted-but-saturated, not a faded sepia wash). */}
                  <foreignObject x="0" y="0" width="365" height="639" clipPath="url(#dmArch)">
                    <div className="relative w-full h-full">
                      <LazyVideo
                          src="/redesign/monterrey-map.mp4"
                          poster="/redesign/monterrey-map-poster.jpg"
                          ariaLabel="Animated illustrated map of Monterrey"
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            filter: "saturate(1.2) brightness(0.98) contrast(1.03)",
                          }}
                      />
                      {/* WARM-BEIGE multiply = aged "treasure map" paper. Multiply turns the white
                        paper into beige (white×tan=tan) while keeping the illustration colour. */}
                      <div className="absolute inset-0 bg-[#d6b274] mix-blend-multiply opacity-60" />
                    </div>
                  </foreignObject>
                  {/* Vector 1 thin black edge on the arch outline (drawn over the map edge) */}
                  <path d={DM_ARCH} fill="none" stroke="#0a0608" strokeWidth="3" strokeLinejoin="miter" />
                  {/* DE MONTERREY — Monoglyphic, gold #dfa867, ls 7%, centered. Lighter weight +
                    slightly smaller than before (figma is thinner) and a tighter arc (more curve). */}
                  <text fill="#dfa867" className="font-display" fontSize="37" fontWeight="500" letterSpacing="2.6">
                    <textPath href="#dmTextArc" startOffset="50%" textAnchor="middle">DE MONTERREY</textPath>
                  </text>
                </svg>
              </Parallax>

              {/* PARA EL MUNDO @(69,3174) 560×28 — Monoglyphic Bold 64 gold, centered, ls 7% */}
              <p className={`absolute left-[5.39vw] top-[65.08vw] w-[43.75vw] text-center ${T.h1} text-sh-gold leading-[1] whitespace-nowrap`}>
                PARA EL MUNDO
              </p>

              {/* Frame 1649 quote — every element ABSOLUTE at its EXACT figma Y (no flex-gap
                approximation): L1 @2722, L2 @2796, Chef @2883, Button @2926 (rel section 2341). */}
              <Reveal className="absolute left-[50.78vw] top-[29.77vw] w-[36.17vw]">
                {/* Line 1 — Monoglyphic Regular, the STYLE value Desktop/H2 = 28px (I was wrongly
                  using the node's stale 22px). ls 7% of 28 = 0.153vw. */}
                {/* Line 1 — Monoglyphic Regular, EXACT figma STYLE values (verified in-browser):
                  28px (2.1875vw), letterSpacing 2% (0.044vw), lineHeight 1.2. At 2% ls
                  "I believe the best ingredient" = 438px, fits 463px → explicit break holds. */}
                <h2 className={`${T.h2} text-sh-cream leading-[1.2]`}>
                  &ldquo;I believe the best ingredient<br />is nostalgia,
                </h2>
                {/* Line 2 — NeueBit REGULAR 22 / ls 20% / lh 1.0. (Style/bake say Bold but the
                  live file is Regular — the .fig is a STALE export from when it was Bold; proof:
                  baked line width 400.8px ≈ Bold 398.8, not Regular 387.) Explicit breaks at the
                  reference's points: "México" is a knife-edge wrap (466px vs 463 box) that natural
                  wrap flip-flops per viewport, so force it after "to" to match Figma at all widths. */}
                <h3 className={`absolute top-[5.78vw] w-full ${T.subtitle} text-sh-cream leading-[1] font-bold`}>
                  which is reflected in every dish on this<br />menu. It is a tribute to my family, to<br />México and to my culture.&rdquo;
                </h3>
                {/* Chef — NeueBit Regular @ y2883, 22px (1.72vw), ls 10%. DIMMED to ~0.6 opacity:
                  figma renders the chef attribution at ~0.57× the quote's brightness (muted), so
                  full-cream made it stand out too much, but 0.36 was too muted — ~0.6 (chef reads
                  ~0.6x the quote's brightness). */}
                <p className={`absolute top-[12.57vw] ${T.body} text-sh-cream leading-[1.2] opacity-60`}>
                  Chef Gerardo Álvarez Saucedo
                </p>
                {/* SecondaryButton @ y2926 (top 15.94vw), 306×51 → 23.91vw × 3.98vw */}
                <Link
                    to="/story"
                    className="absolute top-[15.94vw] inline-flex items-center justify-center rounded-[4px] border border-sh-cream/70 font-body font-bold uppercase text-sh-cream text-[round(1.71875vw,1px)] tracking-[0.2em] w-[23.91vw] h-[3.98vw] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-sh-pink"
                >
                  A taste of our story
                </Link>
              </Reveal>
            </div>

            {/* Mobile — exact from Figma mobile frame (Home 6107:1011):
                Group 28 arch tombstone (map + gold dashed frame + curved DE MONTERREY), centered.
                Group 27 mountain/city BAND placed 192px below the arch top, overlapping its lower
                  half — three plain layers (NOT the old over-dark gradient stack that hid them):
                    Rect174  pink #eb4660 → transparent           (sky,  393×198 @ band-y0)
                    photo    beautiful-kathmandu (vert-crop .778)  (393×150 @ band-y130)
                    Rect176  rgba(0,0,0,.3) → black                (seal, 394×63  @ band-y222)
                PARA EL MUNDO over the seal; Frame 1649 quote below.
              Positions are absolute at the .fig mobile Y (arch-top = 0), mirroring the desktop. */}
            {/* pt-14 gives the curved "DE MONTERREY" headroom — its arc bulges ~13px above the
              SVG box (overflow-visible), so with the section's overflow-hidden it would clip
              against the top edge (the "black box" artifact) without padding above it. */}
            <div className="md:hidden relative w-full overflow-hidden pt-14 pb-16 flex flex-col items-center">
              {/* Arch + band region — h = arch-top→quote-top = 494px (.fig 2184→2678) */}
              <div className="relative w-full h-[494px]">
                {/* Group 27 mountain/city band — full-bleed, behind the arch (z-0). Figma geometry
                  (band 285 tall: Rect174 sky 0–198, mountain photo 130–280, seal 222–285) with
                  VISIBLE colours from the Figma (Rectangle 174): green-twilight sky peaking ~#407440
                  and the night-cityscape webp (ridge silhouette + warm city
                  lights) shown at near-full brightness — its transparent sky lets the green
                  through above the ridge. (My prior band buried both → invisible.) */}
                <div aria-hidden className="absolute inset-x-0 top-[150px] h-[345px] overflow-hidden">
                  <div className="absolute inset-0 bg-[#07120a]/25" />
                  {/* green twilight sky (Figma Rectangle 174) — its BRIGHT peak (#407440) sits AT the
                    ridge line so the dark mountains silhouette against it (before, the rose's dark
                    tail was behind the ridge → dark-on-dark → no visible mountain). */}
                  <div className="absolute inset-x-0 top-[40px] h-[185px] bg-[linear-gradient(to_bottom,transparent_0%,#1d3d24_28%,#407440_54%,#20422a_76%,transparent_100%)]" />
                  {/* night cityscape — object-TOP keeps the mountain ridge (it's at the photo's top;
                    object-center had cropped it off); transparent sky lets the rose show above the
                    ridge, the warm city lights read below. */}
                  <picture>
                    <source
                        type="image/avif"
                        srcSet={[
                          "/redesign/monterrey-mountain-640.avif 640w",
                          "/redesign/monterrey-mountain-960.avif 960w",
                        ].join(", ")}
                        sizes="100vw"
                    />

                    <source
                        type="image/webp"
                        srcSet={[
                          "/redesign/monterrey-mountain-640.webp 640w",
                          "/redesign/monterrey-mountain-960.webp 960w",
                        ].join(", ")}
                        sizes="100vw"
                    />

                    <img
                        src="/redesign/monterrey-mountain-640.webp"
                        width="640"
                        height="245"
                        alt="Mountains and city of Monterrey, México"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-x-0 top-[135px] h-[150px] w-full object-cover object-top"
                        style={{
                          filter: "contrast(1.3) brightness(0.4)",
                        }}
                    />
                  </picture>
                  {/* base seal to black — small, so the warm city lights at the photo's bottom still
                    read (a 70px seal had faded them out → city looked thin/over-darkened) */}
                  <div className="absolute inset-x-0 bottom-0 h-[32px] bg-gradient-to-b from-transparent to-black"/>
                </div>

                {/* Arch tombstone (same DM_ARCH construction as desktop), centered, on top.
                NO drop-shadow filter here: a CSS filter on an overflow-visible SVG clips the
                  teeth that extend OUTSIDE the box on iOS Safari → only one corner survived. The
                  dash is also coarsened ("4 3.5" vs desktop "1.8 3") because at 210px the desktop
                  pattern shrinks to ~1px teeth that devices drop; coarser teeth render reliably. */}
                                {/* Arch tombstone — iOS-safe animated version.
                  The animated map stays as a real HTML <video>, but it is masked with a WebKit/CSS
                  SVG mask instead of being placed inside SVG <foreignObject>. This preserves the
                  flying-birds animation while avoiding the iOS Safari foreignObject clipping bug. */}
                <div
                    className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
                    style={{
                      width: `${MOBILE_ARCH_WIDTH}px`,
                      height: `${MOBILE_ARCH_HEIGHT}px`,
                    }}
                >
                  {/* Base SVG: parchment fill + gold teeth behind the clipped video.
    The video covers the inner half of the gold stroke, leaving the outside teeth visible. */}
                  <svg
                      viewBox="0 0 365 639"
                      className="absolute inset-0 z-0 w-full h-full"
                      style={{ overflow: "visible" }}
                  >
                    <path d={DM_ARCH} fill="#ece1d4" />

                    <path
                        d={DM_ARCH}
                        fill="none"
                        stroke="#dfa867"
                        strokeWidth="34"
                        strokeDasharray="4 3.5"
                        strokeLinejoin="miter"
                    />
                  </svg>

                  {/* Animated map layer: normal HTML video, masked to the arch.
    This is the key iOS fix: no foreignObject. */}
                  <div
                      className="absolute left-0 top-0 z-10 overflow-hidden"
                      style={{
                        width: `${MOBILE_ARCH_VIEWBOX_WIDTH}px`,
                        height: `${MOBILE_ARCH_VIEWBOX_HEIGHT}px`,
                        transform: `scale(${MOBILE_ARCH_SCALE})`,
                        transformOrigin: "top left",

                        WebkitMaskImage: DM_ARCH_MASK,
                        maskImage: DM_ARCH_MASK,
                        WebkitMaskSize: `${MOBILE_ARCH_VIEWBOX_WIDTH}px ${MOBILE_ARCH_VIEWBOX_HEIGHT}px`,
                        maskSize: `${MOBILE_ARCH_VIEWBOX_WIDTH}px ${MOBILE_ARCH_VIEWBOX_HEIGHT}px`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "0 0",
                        maskPosition: "0 0",

                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                  >
                    <LazyVideo
                        src="/redesign/monterrey-map.mp4"
                        poster="/redesign/monterrey-map-poster.jpg"
                        ariaLabel="Animated illustrated map of Monterrey"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          filter: "saturate(1.2) brightness(0.98) contrast(1.03)",
                        }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[#d6b274] mix-blend-multiply opacity-60" />
                  </div>

                  {/* Overlay SVG: black edge, corner blocks, and curved text above the video. */}
                  <svg
                      viewBox="0 0 365 639"
                      className="pointer-events-none absolute inset-0 z-20 w-full h-full"
                      style={{ overflow: "visible" }}
                  >
                    <defs>
                      <path id="dmTextArcM" d="M -14 32 A 315 315 0 0 1 379 32" />
                    </defs>

                    <path
                        d={DM_ARCH}
                        fill="none"
                        stroke="#0a0608"
                        strokeWidth="3"
                        strokeLinejoin="miter"
                    />

                    <rect x="-17" y="639" width="17" height="17" fill="#dfa867" />
                    <rect x="365" y="639" width="17" height="17" fill="#dfa867" />

                    <text
                        fill="#dfa867"
                        className="font-display"
                        fontSize="37"
                        fontWeight="700"
                        letterSpacing="3.4"
                    >
                      <textPath href="#dmTextArcM" startOffset="50%" textAnchor="middle">
                        DE MONTERREY
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* PARA EL MUNDO — Monoglyphic Bold ~22, gold, centered; hugs the tombstone base */}
                <p className="absolute inset-x-0 top-[388px] z-10 text-center font-display font-bold text-sh-gold text-[22px] leading-[1] tracking-[0.1em]">
                  PARA EL MUNDO
                </p>
              </div>

              {/* Frame 1649 quote — centered column, w320; line2 = Mobile/Subtitle (NeueBit BOLD 26) */}
              <blockquote className="relative z-10 mx-auto w-full max-w-[321px] text-center">
                {/* Line 1 — ALL CAPS in the reference */}
                <span className={`block ${M.h2} uppercase text-sh-cream leading-[1.2]`}>
                &ldquo;I believe the best ingredient is nostalgia,
              </span>
                {/* Line 2 — NeueBit REGULAR 26 (the Mobile/Subtitle style is Bold, but NeueBit-Bold
                  falls back to Regular in the real render; user confirms L2 is NOT bold, L1 IS). */}
                <span className="block font-body text-[26px] tracking-[0.2em] text-sh-cream leading-[1] mt-3">
                which is reflected in every dish on this menu. It is a tribute to my family, to México
                and to my culture.&rdquo;
              </span>
              </blockquote>
              <p className={`relative z-10 mt-5 ${M.body} text-sh-cream`}>Chef Gerardo Álvarez Saucedo</p>
              <Link to="/story" className="relative z-10 mt-5 inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream text-[18px] tracking-[0.1em] w-[306px] max-w-[88vw] h-[51px] hover:bg-sh-cream hover:text-sh-black transition-colors">
                A taste of our story
              </Link>
            </div>
          </section>

          {/* ═══════════════ 5. A BLOG FULL OF EXPERIENCES ═══════════════
            Frame 1436 @(70,3434) 1140w centered, gap32. Heading "A blog full of
            experiences" Mondwest Bold 40px cream centered; subtitle NeueBit Regular
            22px cream centered; 4 cards 270w gap20 bottom-aligned: fig photo 270×180
            r4 + Mondwest Bold 22px title + small outlined "Read more" pill;
            "View all stories" NeueBit Regular 22px PINK left-aligned. */}
            <LazyMount
                rootMargin="600px 0px"
                fallback={
                    <div
                        aria-hidden="true"
                        className="min-h-[100vw] md:min-h-[40vw]"
                    />
                }
            >
                <Suspense
                    fallback={
                        <div
                            aria-hidden="true"
                            className="min-h-[100vw] md:min-h-[40vw]"
                        />
                    }
                >
                    <BlogSection />
                </Suspense>
            </LazyMount>

        {/* FAQ CTA */}
        <section className="text-sh-cream text-center px-6 py-16 md:py-20">
          <p className="uppercase tracking-[0.25em] text-xs text-sh-gold mb-3">Questions before you visit?</p>
          <Link to="/faq" className="font-display uppercase text-2xl md:text-4xl hover:text-sh-gold transition-colors">Frequently Asked Questions</Link>
        </section>

          {/* Figma gap: Blog → Footer (≈162px @1280) so the footer lands at design Y4092 */}
          <div aria-hidden className="hidden md:block w-full h-[12.66vw]" />
        </main>
      </>
  );
}

// Blog cards — Frame 1648. Photos extracted by their real fill hashes from the .fig (the layer
// names "marijuana/woman/herbal" are stale — the actual images are cactus / cocktail / skulls /
// cooking). Each card: title (Monoglyphic Reg), "Silent H team", "5 days ago", category tag.
