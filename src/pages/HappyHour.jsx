import SEO from "../components/SEO.jsx";
import { breadcrumb, faqPage } from "../lib/seoSchema.js";
import Button from "../components/Button";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import { useOTWidget } from "../components/OTwidget";
import ResponsiveImg from "../components/ResponsiveImg";
import RelatedGuides from "../components/RelatedGuides";
import { happyHourIntro, happyHourItems, tuesdays } from "../data/happyHourData";

/* Figma desktop frame 8647:271 (1280×3372) / mobile 8823:305.
   Titles = Monoglyphic Bold 40 UPPER gold; schedule = Monoglyphic Reg gold; item names =
   Monoglyphic Reg 22 cream; descriptions = NeueBit Bold 18 cream; notes = NeueBit 16 UPPER cream.
   HH price columns (Margaritas $10 / Individual Bites $4) = cream; Tuesdays All day/$20 = gold.
   Heroes: 946×200 (crop center 25%) and 940×228, r8, centered ~166px margins. */

// ── desktop type classes (vw) ── body text = NeueBit *Regular* (user's Figma lacks NeueBit Bold,
//    so the "NeueBit Bold" body style renders Regular there — match what they see). Only titles bold.
const D = {
  title:    "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(calc(var(--dw)*3.125/100),1px)]",
  schedule: "font-display leading-[1.2] tracking-[0.07em] text-[round(calc(var(--dw)*2.1875/100),1px)]",
  price:    "font-display leading-[1.2] tracking-[0.07em] text-[round(calc(var(--dw)*1.71875/100),1px)]",
  name:     "font-display leading-[1.2] tracking-[0.07em] text-[round(calc(var(--dw)*1.71875/100),1px)] text-sh-cream",
  desc:     "font-body font-normal leading-[1.2] tracking-[0.10em] text-[round(calc(var(--dw)*1.40625/100),1px)] text-sh-cream",
  note:     "font-body font-normal uppercase leading-[1.2] tracking-[0.20em] text-[round(calc(var(--dw)*1.25/100),1px)] text-sh-cream",
};
// ── mobile type classes (px) — Mobile/H1 title 40, prices 28, names/schedule 22 ──
const M = {
  title:    "font-display font-bold uppercase leading-none tracking-[0.10em] text-[40px]",
  schedule: "font-display leading-[1.2] tracking-[0.15em] text-[22px]",
  price:    "font-display leading-[1.2] tracking-[0.02em] text-[28px]",
  name:     "font-display leading-[1.2] tracking-[0.15em] text-[22px] text-sh-cream",
  desc:     "font-body font-normal leading-[1.2] tracking-[0.10em] text-[18px] text-sh-cream",
  note:     "font-body font-normal uppercase leading-[1.2] tracking-[0.20em] text-[16px] text-sh-cream",
};

const HH_FAQ = [
  { q: "When is happy hour at Silent H?", a: "Every day from 5 to 7pm at Silent H in NYC, with $10 house margaritas and $4 Mexican bites." },
  { q: "What is on the happy hour menu?", a: "Rotating house margaritas at $10 and Mexican bites at $4, alongside the full cocktail list." },
  { q: "Does Silent H have happy hour on weekends?", a: "Yes. Happy hour runs every day, including weekends, from 5 to 7pm." },
  { q: "What are Tuesdays at Silent H?", a: "All day Tuesday we serve a $20 rib-eye cachetada, on top of the daily 5 to 7 happy hour." },
];

export default function HappyHour() {
  const { openReservationWidget } = useOTWidget();

  return (
    <>
      <SEO
        title="Happy Hour in NYC | $10 Margaritas Daily | Silent H"
        description="Best happy hour in NYC: every day 5-7pm at Silent H. $10 house margaritas and $4 Mexican bites, plus Tuesdays all day $20 rib-eye cachetada."
        url="https://www.silenthnyc.com/happy-hour"
        jsonLd={[breadcrumb("Happy Hour", "https://www.silenthnyc.com/happy-hour"), faqPage(HH_FAQ.map((f) => ({ question: f.q, answer: f.a })))]}
      />
      <main className="relative z-10 font-body text-sh-cream">

        {/* ════════════ DESKTOP ════════════ */}
        <div className="hidden md:block pt-[calc(var(--dw)*12/100)] pb-[calc(var(--dw)*6.25/100)] 2xl:mt-20">
          {/* Hero 1 — 946×200, crop centred ~25% */}
          <Parallax speed={-0.08} className="mx-auto w-[calc(var(--dw)*73.9/100)]">
            <ResponsiveImg src="/redesign/hh-hero1.webp" alt="Happy Hour at Silent H"
              loading="eager" sizes="73.9vw"
              className="w-full h-[calc(var(--dw)*15.625/100)] object-cover object-[center_25%] rounded-[8px]" />
          </Parallax>

          {/* HAPPY HOUR header (gold) */}
          <Reveal className="mt-[calc(var(--dw)*7.5/100)] flex flex-col items-center gap-[calc(var(--dw)*1.875/100)] text-center">
            <p className={`${D.title} text-sh-gold`}>{happyHourIntro.title}</p>
            <p className={`${D.schedule} text-sh-gold`}>{happyHourIntro.schedule}</p>
          </Reveal>

          {/* Price columns — cream, fixed 167px columns (labels close, prices 198px apart) */}
          <Reveal className="mt-[calc(var(--dw)*2.5/100)] flex justify-center gap-[calc(var(--dw)*2.5/100)]">
            {happyHourIntro.prices.map((p) => (
              <div key={p.label} className="w-[calc(var(--dw)*13.05/100)] flex flex-col items-center gap-[calc(var(--dw)*1.25/100)]">
                <p className={`${D.price} text-sh-cream whitespace-nowrap`}>{p.label}</p>
                <p className={`${D.price} text-sh-cream`}>{p.price}</p>
              </div>
            ))}
          </Reveal>

          {/* HH item list — centred, gap 40 / within 20 */}
          <div className="mt-[calc(var(--dw)*5/100)] mx-auto w-[calc(var(--dw)*73.9/100)] flex flex-col items-center gap-[calc(var(--dw)*3.125/100)] text-center">
            {happyHourItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05} className="flex flex-col items-center gap-[calc(var(--dw)*1.5625/100)]">
                <h3 className={D.name}>{item.name}</h3>
                {item.description && <p className={`${D.desc} max-w-[calc(var(--dw)*52/100)]`}>{item.description}</p>}
                {item.note && <p className={D.note}>{item.note}</p>}
              </Reveal>
            ))}
          </div>

          <div className="mt-[calc(var(--dw)*3.75/100)] flex justify-center">
            <Button variant="gold" onClick={openReservationWidget}>Reserve a table</Button>
          </div>

          {/* Hero 2 — 940×228 */}
          <Parallax speed={-0.08} className="mt-[calc(var(--dw)*6.25/100)] mx-auto w-[calc(var(--dw)*73.4/100)]">
            <ResponsiveImg src="/redesign/hh-hero2.webp" alt="Tuesdays at Silent H"
              sizes="73.4vw"
              className="w-full h-[calc(var(--dw)*17.8/100)] object-cover rounded-[8px]" />
          </Parallax>

          {/* TUESDAYS header (gold) */}
          <Reveal className="mt-[calc(var(--dw)*6.25/100)] flex flex-col items-center gap-[calc(var(--dw)*1.875/100)] text-center">
            <h2 className={`${D.title} text-sh-gold`}>{tuesdays.title}</h2>
            <div className="flex flex-col items-center gap-[calc(var(--dw)*1.25/100)]">
              <p className={`${D.price} text-sh-gold`}>{tuesdays.schedule}</p>
              <p className={`${D.price} text-sh-gold`}>{tuesdays.price}</p>
            </div>
          </Reveal>

          {/* Tuesdays items — centred, "+" separators */}
          <div className="mt-[calc(var(--dw)*3.125/100)] mx-auto w-[calc(var(--dw)*49.3/100)] flex flex-col items-center gap-[calc(var(--dw)*3.125/100)] text-center">
            {tuesdays.items.map((item, i) => (
              <div key={item.id} className="contents">
                {i > 0 && <span className={`${D.name} leading-none`}>+</span>}
                <Reveal delay={i * 0.05} className="flex flex-col items-center gap-[calc(var(--dw)*1.5625/100)]">
                  <h3 className={D.name}>{item.name}</h3>
                  <p className={`${D.desc} max-w-[calc(var(--dw)*49/100)]`}>{item.description}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-[calc(var(--dw)*3.75/100)] flex justify-center">
            <Button variant="gold" onClick={openReservationWidget}>Book your experience</Button>
          </div>
        </div>

        {/* ════════════ MOBILE ════════════ (margins 36, content 321; heroes 321×480 portrait) */}
        <div className="md:hidden pt-[80px] pb-20 px-[36px]">
          {/* HAPPY HOUR title sits ABOVE hero 1 */}
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <h1 className={`${M.title} text-sh-gold`}>{happyHourIntro.title}</h1>
            <p className={`${M.schedule} text-sh-gold`}>{happyHourIntro.schedule}</p>
          </Reveal>

          <Parallax speed={-0.05} className="mt-9 w-full">
            <ResponsiveImg src="/redesign/hh-hero1.webp" alt="Happy Hour at Silent H"
              loading="eager" sizes="calc(100vw - 72px)"
              className="w-full h-[480px] object-cover object-[center_25%] rounded-t-[200px] rounded-b-none" />
          </Parallax>

          {/* Price blocks — stacked (1 column), label over price */}
          <Reveal className="mt-10 flex flex-col items-center gap-8">
            {happyHourIntro.prices.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-3">
                <p className={`${M.name} text-sh-cream`}>{p.label}</p>
                <p className={`${M.price} text-sh-cream`}>{p.price}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-10 flex flex-col items-center gap-10 text-center">
            {happyHourItems.map((item) => (
              <Reveal key={item.id} className="flex flex-col items-center gap-5">
                <h3 className={M.name}>{item.name}</h3>
                {item.description && <p className={M.desc}>{item.description}</p>}
                {item.note && <p className={M.note}>{item.note}</p>}
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="gold" onClick={openReservationWidget}>Reserve a table</Button>
          </div>

          {/* TUESDAYS title sits ABOVE hero 2 */}
          <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
            <h2 className={`${M.title} text-sh-gold`}>{tuesdays.title}</h2>
            <div className="flex flex-col items-center gap-3">
              <p className={`${M.name} text-sh-gold`}>{tuesdays.schedule}</p>
              <p className={`${M.price} text-sh-gold`}>{tuesdays.price}</p>
            </div>
          </Reveal>

          <Parallax speed={-0.05} className="mt-9 w-full">
            <ResponsiveImg src="/redesign/hh-hero2.webp" alt="Tuesdays at Silent H"
              sizes="calc(100vw - 72px)"
              className="w-full h-[480px] object-cover object-[61%_center] rounded-t-[200px] rounded-b-none" />
          </Parallax>

          <div className="mt-10 flex flex-col items-center gap-5 text-center">
            {tuesdays.items.map((item, i) => (
              <div key={item.id} className="contents">
                {i > 0 && <span className={`${M.name} leading-none`}>+</span>}
                <Reveal className="flex flex-col items-center gap-5">
                  <h3 className={M.name}>{item.name}</h3>
                  <p className={M.desc}>{item.description}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="gold" onClick={openReservationWidget}>Book your experience</Button>
          </div>
        </div>
      
                {/* FAQ — happy hour (AEO) */}
                <section className="mt-16 md:mt-[calc(var(--dw)*6.25/100)] px-[36px] md:px-0 mx-auto w-full md:w-[calc(var(--dw)*62/100)] flex flex-col items-center gap-8 text-center pb-16">
                  <h2 className="font-display font-bold uppercase tracking-[0.07em] text-sh-gold text-[32px] md:text-[calc(var(--dw)*2.5/100)]">Happy Hour FAQ</h2>
                  {HH_FAQ.map((f) => (
                    <div key={f.q} className="flex flex-col items-center gap-3 max-w-[680px]">
                      <h3 className="font-display tracking-[0.10em] text-sh-cream text-[20px] md:text-[calc(var(--dw)*1.5/100)]">{f.q}</h3>
                      <p className="font-body font-normal tracking-[0.08em] leading-[1.35] text-sh-cream text-[16px] md:text-[calc(var(--dw)*1.15/100)]">{f.a}</p>
                    </div>
                  ))}
                </section>

        <RelatedGuides
          className="mt-4 md:mt-0 pb-16 md:pb-[calc(var(--dw)*6.25/100)]"
          links={[
            { to: "/blogs/happy-hour-downtown-toronto", label: "The best happy hours in downtown Toronto" },
          ]}
        />

</main>
    </>
  );
}
