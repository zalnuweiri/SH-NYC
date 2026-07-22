import SEO from "../components/SEO.jsx";
import { faqPage } from "../lib/seoSchema.js";

import Button from "../components/Button";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import RelatedGuides from "../components/RelatedGuides";
import useIsDesktop from "../lib/media/useIsDesktop";

/* Figma desktop frame 4272:1438 (1280×4079) / mobile 4272:3130.
   Hero heading = Mondwest Bold 64 cream (serif); section headers + space labels = Monoglyphic Bold ~40
   UPPER cream; body/intro = NeueBit Regular 22 cream; benefits = NeueBit Regular 16 UPPER cream w/ dotted
   dividers; CTA = Mondwest Bold 20 UPPER. Buttons = OUTLINE (cream stroke/label, transparent), label
   "Start Planning". Hero media = /Silent-H-FINAL.webm (gold-arch montage); why-host media = /newvid-small.mp4
   (the venue tour — a DIFFERENT clip). Spaces = mirrored arches w/ 4px gold border (Silent H rounds top,
   Aitch rounds bottom). Mobile (frame 4272:3130): full-bleed hero video + heading/intro/button CENTERED over
   it; Monoglyphic headings (H1 32 / H2 24), NeueBit body (hero-intro 18, why-intro 22, benefits 16), CTA =
   Mono Reg 18 mixed-case. Desktop hero = Mondwest serif heading over the gold-arch video. */

const PLAN_URL = "https://silenth.tripleseat.com/party_request/32814";

const heroIntro =
    "At Silent H, every gathering becomes a celebration of flavour and culture. From intimate dinners to corporate events and full buyouts, our vibrant spaces and elevated Mexican cuisine create unforgettable experiences inspired by the heart of Mexico.";
// Mobile hero breaks after the first sentence ("…culture.") to match the Figma layout exactly
// (with 13% letter-spacing this reproduces the figma's 7-line wrap). Desktop wraps naturally.
const heroIntroM = heroIntro.split(/(?<=\.) (?=From)/);
const whyIntro =
    "Elevate your occasion with bold, authentic flavours, artisan cocktails, and thoughtfully designed spaces that capture the spirit of modern Mexico.";
const benefits = [
    "Gracious, personalized hospitality",
    "Semi-private & private options",
    "Seamless, instant booking options",
    "Chef-curated seasonal menus",
    "Dedicated event planning support",
];

// ── desktop type (vw) ──
const D = {
    hero:   "font-display font-bold leading-[1.05] tracking-[0.06em] text-[round(5vw,1px)] text-sh-cream",
    header: "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(3.125vw,1px)] text-sh-cream",
    label:  "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(3.125vw,1px)] text-sh-cream",
    body:   "font-body leading-[1.4] tracking-[0.10em] text-[round(1.71875vw,1px)] text-sh-cream",
    bodyGrey:"font-body leading-[1.4] tracking-[0.10em] text-[round(1.71875vw,1px)] text-sh-grey-300",
    benefit:"font-body uppercase leading-[1.2] tracking-[0.20em] text-[round(1.25vw,1px)] text-sh-cream",
    cta:    "font-display font-bold uppercase leading-[1.4] tracking-[0.07em] text-[round(1.5625vw,1px)] text-sh-cream",
};
// ── mobile type (px) — resolved from the mobile frame's LINKED text styles (the node
//    fontSizes are stale caches; baked baseline geometry confirms these): Mobile/H1 = Mono
//    Bold 32 (hero heading + "Our spaces"), Mobile/H2 = Mono Bold 24 (space labels + "Why
//    host"), hero intro = NeueBit 18 (Desktop-Mobil/Body), why-intro = NeueBit 22 (Desktop/
//    Body), benefits = NeueBit 16 (Caption 1), CTA = Mono REG 18 mixed-case (Mobile/H3). ──
const M = {
    hero:    "font-display font-bold uppercase leading-[1] tracking-[0.05em] text-[36px] text-sh-cream",   // Mobile/H1 UPPER (.fig case=UPPER, ls5%, lh1.0=baked 32/32px); .fig size=32, bumped to 36 per "slightly larger"
    header:  "font-display font-bold uppercase leading-[1.1] tracking-[0.05em] text-[32px] text-sh-cream", // Mobile/H1 UPPER
    label:   "font-display font-bold uppercase leading-[1.2] tracking-[0.05em] text-[24px] text-sh-cream", // Mobile/H2 UPPER
    heroBody:"font-body leading-[1.22] tracking-[0.14em] text-[18px] text-sh-cream",                       // NeueBit 18; ls 14% = MAX that keeps figma's exact 7-line wrap (15%+ shifts line2); user wants more inter-letter space; lh 22px=1.22
    whyBody: "font-body leading-[1.2] tracking-[0.10em] text-[22px] text-sh-grey-300",                     // NeueBit 22 (grey, matches desktop)
    benefit: "font-body uppercase leading-[1.2] tracking-[0.20em] text-[16px] text-sh-cream",              // NeueBit 16
    cta:     "font-display font-extralight leading-[1.25] tracking-[0.05em] text-[22px] text-sh-cream",     // Monoglyphic EXTRALIGHT (200) mixed-case — .fig Mobile/H3; Regular(400) read too thick, lighter weight = thinner strokes, same font
};

// dotted cream rule (Figma LINE dash [1,8] round caps)
const Rule = ({ className = "" }) => (
    <div className={`h-[2px] w-full ${className}`} style={{
        backgroundImage: "radial-gradient(circle, #ece1d4 1px, transparent 1.6px)",
        backgroundSize: "9px 2px", backgroundRepeat: "repeat-x", backgroundPosition: "left center",
    }} />
);

// fading gold ruler seam (Figma "Vertical lines" = 285 gold ticks ~every 4px, masked so it fades from
// black at the exterior to full gold in the interior). Connects the two arches.
const Seam = ({ className = "", h = "h-[2.19vw]" }) => (
    // gold ruler ticks + a horizontal rule top & bottom (Figma "Horizontal lines"), all fading with the band
    <div className={`${h} border-y-[3px] border-sh-gold ${className}`} style={{
        backgroundImage: "repeating-linear-gradient(to right, #dfa867 0 1px, transparent 1px 4px)",
        WebkitMaskImage: "linear-gradient(to right, transparent 2%, #000 24%, #000 76%, transparent 98%)",
        maskImage: "linear-gradient(to right, transparent 2%, #000 24%, #000 76%, transparent 98%)",
    }} />
);

const EVENTS_FAQ = [
  { q: "Can you host private events at Silent H?", a: "Yes. Silent H hosts private dining and events in NYC, from intimate dinners to corporate events and full buyouts across two Mexican-inspired spaces." },
  { q: "How many guests can Silent H host?", a: "The main dining room, patios and private spaces seat up to 145 guests, with room for up to 220 for a standing reception." },
  { q: "What kind of events does Silent H host?", a: "Corporate dinners, celebrations, milestone birthdays, engagement parties, product launches and full buyouts, each with chef-curated Mexican menus." },
  { q: "Is there a private space for smaller groups?", a: "Yes. Aitch, our agave lounge downstairs, is available for smaller private bookings and after-parties behind a hidden door." },
];

export default function Events() {
    // Mount ONLY the block for the current viewport — both blocks have autoplay videos and a
    // hidden block still decodes them; rendering all four at once (+ the dust WebGL) overruns the
    // GPU on some machines (page goes black). See useIsDesktop.
    const isDesktop = useIsDesktop();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silenthnyc.com" },
            { "@type": "ListItem", position: 2, name: "Plan an Event", item: "https://www.silenthnyc.com/events" },
        ],
    };

    return (
        <>
            <SEO
                title="Private Dining & Events in NYC | Silent H"
                description="Private dining and events at Silent H in NYC: corporate dinners, celebrations and full buyouts in two Mexican-inspired spaces with chef menus."
                url="https://www.silenthnyc.com/events"
                jsonLd={[breadcrumbSchema, faqPage(EVENTS_FAQ.map((f) => ({ question: f.q, answer: f.a })))]}
            />
            <main className="relative z-10 font-body text-sh-cream overflow-hidden">

                {/* ════════════ DESKTOP ════════════ (only mounted ≥768px so mobile never decodes these videos) */}
                {isDesktop && (
                    <div className="hidden md:block">
                        {/* Hero — gold-arch VIDEO (dinner party), full-bleed, text bottom-left */}
                        <section className="relative w-full h-[65.23vw]">
                            <video autoPlay muted loop playsInline poster="/redesign/ev-hero.webp" className="absolute inset-0 h-full w-full object-cover">
                                <source src="/Silent-H-FINAL.webm" type="video/webm" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-sh-black via-sh-black/30 to-transparent" />
                            <div className="absolute left-[5.47vw] bottom-[5.2vw] w-[66.4vw] flex flex-col items-start gap-[2.5vw]">
                                <Reveal><h1 className={D.hero}>Plan your auténtica celebración</h1></Reveal>
                                <Reveal delay={0.1}><p className={`${D.body} max-w-[66.4vw] font-bold`}>{heroIntro}</p></Reveal>
                                <Reveal delay={0.2}><Button variant="ghost" className="font-bold" as="a" href={PLAN_URL} target="_blank" rel="noopener noreferrer">Start Planning</Button></Reveal>
                            </div>
                        </section>

                        {/* Our spaces */}
                        <Reveal className="mt-[7.5vw] text-center"><h2 className={D.header}>Our spaces</h2></Reveal>

                        {/* Connected split tombstone: Silent H (top arch) + fading gold seam + Aitch (bottom arch).
              Each arch keeps its gold outline except where it touches the seam (open edge). */}
                        <Reveal className="mt-[5vw] mx-auto w-[73.9vw]">
                            <div className="relative overflow-hidden rounded-t-[16.875vw] border-t-[3px] border-x-[3px] border-sh-gold">
                                <img src="/redesign/ev-silenth.webp" alt="Silent H venue" className="w-full h-[51.33vw] object-cover" />
                                <div className="absolute inset-x-0 bottom-0 h-[11vw] bg-gradient-to-t from-sh-black/85 to-transparent" />
                                <h3 className={`${D.label} absolute inset-x-0 bottom-[3vw] text-center !text-white`}><a
                                    href="https://my.matterport.com/show/?m=Rs9KDtdhnm6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:text-sh-gold transition-colors"
                                >
                                    Silent H
                                </a></h3>
                            </div>
                            <div className="bg-sh-black"><Seam /></div>
                            <div className="relative overflow-hidden rounded-b-[16.875vw] border-b-[3px] border-x-[3px] border-sh-gold">
                                <img src="/redesign/ev-aitch.webp" alt="Aitch venue" className="w-full h-[48.75vw] object-cover" />
                                <div className="absolute inset-x-0 top-0 h-[11vw] bg-gradient-to-b from-sh-black/85 to-transparent" />
                                <h3 className={`${D.label} absolute inset-x-0 top-[3vw] text-center`}><a
                                    href="https://my.matterport.com/show/?m=Rs9KDtdhnm6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:text-sh-gold transition-colors"
                                >
                                    Aitch
                                </a></h3>
                            </div>
                        </Reveal>

                        {/* Why host */}
                        <Reveal className="mt-[9vw] mx-auto w-[73.9vw] flex flex-col items-center gap-[1.25vw] text-center">
                            <h2 className={D.header}>Why host your event at Silent H?</h2>
                            <p className={`${D.bodyGrey} max-w-[73.9vw]`}>{whyIntro}</p>
                        </Reveal>

                        <div className="mt-[3.75vw] mx-auto w-[69.45vw] flex items-stretch justify-between gap-[4.69vw]">
                            {/* why-host VIDEO = the venue tour (Figma node "SilentH venue", vid e906e0…) — a
                DIFFERENT clip from the gold-arch hero; web copy = /newvid-small.mp4 */}
                            <video autoPlay muted loop playsInline poster="/redesign/ev-whyhost.webp" className="w-[36.17vw] shrink-0 h-[20.625vw] object-cover rounded-[4px]">
                                <source src="/newvid-small.mp4" type="video/mp4" />
                            </video>
                            {/* benefits span the full video height: first item top-aligned, last bottom-aligned */}
                            <div className="w-[28.6vw] flex flex-col justify-between py-[0.3vw]">
                                {benefits.map((b, i) => (
                                    <div key={b} className="flex flex-col">
                                        {i > 0 && <Rule className="mb-[1.1vw]" />}
                                        <p className={`${D.benefit} text-left`}>{b}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <Reveal className="mt-[7.5vw] mb-[6.25vw] mx-auto w-[73.75vw] flex flex-col items-center gap-[3.125vw] text-center">
                            <p className={`${D.cta} max-w-[73.75vw]`}>{"Let us transform your event into an unforgettable culinary experience."}</p>
                            <Button variant="ghost" className="font-bold" as="a" href={PLAN_URL} target="_blank" rel="noopener noreferrer">Start Planning</Button>
                        </Reveal>
                    </div>
                )}

                {/* ════════════ MOBILE ════════════ (Figma frame 4272:3130, 393w; margins 36 / col 321) */}
                {!isDesktop && (
                    <div className="md:hidden">
                        {/* Hero — full-bleed gold-arch VIDEO (Figma "Dinner Party Website Final" @-15,0 424×917).
              h-[917px] is the figma design height; min-h-[100svh] guarantees the video always fills the
              screen on viewports taller than 917. Heading/intro/button centered over it (Frame 1427). */}
                        <section className="relative w-full h-[917px] min-h-[100svh] overflow-hidden">
                            <video autoPlay muted loop playsInline poster="/redesign/ev-hero.webp" className="absolute inset-0 h-full w-full object-cover">
                                <source src="/Silent-H-FINAL.webm" type="video/webm" />
                            </video>
                            {/* soft tint for legibility + a fade to black at the bottom into the page */}
                            <div className="absolute inset-0 bg-gradient-to-b from-sh-black/30 via-sh-black/15 to-sh-black" />
                            {/* hero text — Figma Frame 1427: a FIXED 321-wide column (not viewport-relative) so the text
                wraps exactly like Figma on any screen width; caps to viewport-72 on screens narrower than
                393. top 320 within the 917 video, gap 32, centered. */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-[321px] max-w-[calc(100%-72px)] top-[320px] flex flex-col items-center gap-8 text-center">
                                <Reveal><h1 className={M.hero}>Plan your auténtica celebración</h1></Reveal>
                                <Reveal delay={0.1}><p className={M.heroBody}>{heroIntroM[0]}<br />{heroIntroM[1]}</p></Reveal>
                                {/* Figma SecondaryButton = 164×48; h-[48px] matches (default ghost box is ~42 tall) */}
                                <Reveal delay={0.2}><Button variant="ghost" className="!font-normal h-[48px] rounded-[4px] font-bold" as="a" href={PLAN_URL} target="_blank" rel="noopener noreferrer">Start Planning</Button></Reveal>
                            </div>
                        </section>

                        {/* gap hero(917)→"Our spaces"(y=1056) = 139 */}
                        <Reveal className="mt-[139px] text-center px-9"><h2 className={M.header}>Our spaces</h2></Reveal>

                        {/* Connected split tombstone: Silent H (top arch) + gold ruler seam + Aitch (bottom arch).
              Figma: 324×421 / 324×400, per-corner radius 200 (caps to a semicircle on the 321 box),
              4px gold border, labels on the gradient overlays. */}
                        <Reveal className="mt-[42px] px-9">
                            <div className="relative overflow-hidden rounded-t-[200px] border-t-[4px] border-x-[4px] border-sh-gold">
                                <img src="/redesign/ev-silenth.webp" alt="Silent H venue" className="w-full h-[421px] object-cover" />
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sh-black/85 to-transparent" />
                                <h3 className={`${M.label} absolute inset-x-0 bottom-[44px] text-center !text-white`}><a
                                    href="https://my.matterport.com/show/?m=Rs9KDtdhnm6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:text-sh-gold transition-colors"
                                >
                                    Silent H
                                </a></h3>
                            </div>
                            <div className="bg-sh-black"><Seam h="h-[16px]" /></div>
                            <div className="relative overflow-hidden rounded-b-[200px] border-b-[4px] border-x-[4px] border-sh-gold">
                                <img src="/redesign/ev-aitch.webp" alt="Aitch venue" className="w-full h-[400px] object-cover" />
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sh-black/85 to-transparent" />
                                <h3 className={`${M.label} absolute inset-x-0 top-7 text-center`}><a
                                    href="https://my.matterport.com/show/?m=Rs9KDtdhnm6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:text-sh-gold transition-colors"
                                >
                                    Aitch
                                </a></h3>
                            </div>
                        </Reveal>

                        {/* Figma Frame 1428 — the whole why-host column is LEFT-aligned (header, intro, benefits, CTA)
              and sits at x=42 (wider side margins than the rest of the page, which is ~36) */}
                        <Reveal className="mt-[120px] px-[42px] flex flex-col items-start gap-8 text-left">
                            <h2 className={M.label}>Why host your event at Silent H?</h2>
                            <p className={M.whyBody}>{whyIntro}</p>
                        </Reveal>

                        <div className="mt-8 px-[42px] flex flex-col gap-[60px]">
                            {/* why-host VIDEO = the venue tour (Figma "SilentH venue", vid e906e0…) — a DIFFERENT
                clip from the gold-arch hero; web copy = /newvid-small.mp4. Aspect 316×264. */}
                            <video autoPlay muted loop playsInline poster="/redesign/ev-whyhost.webp" className="w-full aspect-[316/264] object-cover rounded-[4px]">
                                <source src="/newvid-small.mp4" type="video/mp4" />
                            </video>
                            <div className="w-full flex flex-col">
                                {benefits.map((b, i) => (
                                    <div key={b}>
                                        {i > 0 && <Rule className="my-[18px]" />}
                                        <p className={`${M.benefit} text-left`}>{b}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Figma Frame 1641 — CTA text + button LEFT-aligned (x=0); text→button gap 40.
              CTA = Monoglyphic Extralight (Mobile/H3). Button = Figma SecondaryButton 164×48 (h-[48px]). */}
                        <Reveal className="mt-8 mb-[120px] px-[42px] flex flex-col items-start gap-10 text-left">
                            <p className={M.cta}>{"Let us transform your event into an unforgettable culinary experience."}</p>
                            <Button variant="ghost" className="!font-normal h-[48px] rounded-[4px] font-bold" as="a" href={PLAN_URL} target="_blank" rel="noopener noreferrer">Start Planning</Button>
                        </Reveal>
                    </div>
                )}
            
        <RelatedGuides
          className="mt-[100px] md:mt-[7.5vw]"
          links={[
            { to: "/blogs/private-dining-toronto", label: "Private dining in Toronto" },
            { to: "/nye26", label: "New Year's Eve at Silent H" },
          ]}
        />

        {/* FAQ — events (AEO) */}
        <section className="mx-auto w-full max-w-[321px] md:max-w-[73.9vw] mt-[100px] md:mt-[7.5vw] mb-[120px] md:mb-[6.25vw] flex flex-col items-center gap-8 text-center">
          <h2 className="font-display font-bold uppercase tracking-[0.07em] text-sh-cream text-[28px] md:text-[round(3.125vw,1px)]">Events & Private Dining FAQ</h2>
          {EVENTS_FAQ.map((f) => (
            <div key={f.q} className="flex flex-col items-center gap-3 max-w-[680px]">
              <h3 className="font-display tracking-[0.07em] text-sh-cream text-[20px] md:text-[round(1.71875vw,1px)]">{f.q}</h3>
              <p className="font-body text-sh-grey-300 text-[16px] md:text-[round(1.5vw,1px)] leading-[1.4] tracking-[0.10em]">{f.a}</p>
            </div>
          ))}
        </section>

      </main>
        </>
    );
}
