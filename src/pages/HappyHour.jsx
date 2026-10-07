import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import ResponsiveImg from "../components/ResponsiveImg";
import { happyHourIntro } from "../data/happyHourData.js";

export default function HappyHour() {
  return (
    <>
      <SEO
        title="Happy Hour Coming Soon | Silent H NYC"
        description="Happy hour is coming soon to Silent H NYC. Details will be announced here."
        url="https://www.silenthnyc.com/happy-hour"
        jsonLd={breadcrumb("Happy Hour", "https://www.silenthnyc.com/happy-hour")}
      />
      <main className="relative z-10 font-body text-sh-cream">
        <div className="hidden md:block pt-[calc(var(--dw)*12/100)] pb-[calc(var(--dw)*6.25/100)] 2xl:mt-20">
          <Parallax speed={-0.08} className="mx-auto w-[calc(var(--dw)*73.9/100)]">
            <ResponsiveImg src="/redesign/hh-hero1.webp" alt="Food and cocktails at Silent H"
              loading="eager" sizes="73.9vw"
              className="w-full h-[calc(var(--dw)*15.625/100)] object-cover object-[center_25%] rounded-[8px]" />
          </Parallax>
          <Reveal className="mt-[calc(var(--dw)*7.5/100)] flex flex-col items-center text-center">
            <h1 className="font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(calc(var(--dw)*3.125/100),1px)] text-sh-gold">{happyHourIntro.title}</h1>
          </Reveal>
        </div>
        <div className="md:hidden pt-[80px] pb-20 px-[36px]">
          <Reveal className="flex flex-col items-center text-center">
            <h1 className="font-display font-bold uppercase leading-none tracking-[0.10em] text-[40px] text-sh-gold">{happyHourIntro.title}</h1>
          </Reveal>
          <Parallax speed={-0.05} className="mt-9 w-full">
            <ResponsiveImg src="/redesign/hh-hero1.webp" alt="Food and cocktails at Silent H"
              loading="eager" sizes="calc(100vw - 72px)"
              className="w-full h-[480px] object-cover object-[center_25%] rounded-t-[200px] rounded-b-none" />
          </Parallax>
        </div>
      </main>
    </>
  );
}
