import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";

export default function Events() {
  return (
    <>
      <SEO
        title="Plan an Event Coming Soon | Silent H NYC"
        description="Event planning at Silent H NYC is coming soon. Details will be announced here."
        url="https://www.silenthnyc.com/events"
        jsonLd={breadcrumb("Plan an Event", "https://www.silenthnyc.com/events")}
      />
      <main className="relative z-10 min-h-[55vh] px-6 pt-36 pb-20 md:pt-48 md:pb-28 flex items-center justify-center text-center">
        <h1 className="font-display font-bold uppercase text-sh-cream text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[0.06em]">
          Plan an Event<br />
          <span className="text-sh-gold">Coming Soon</span>
        </h1>
      </main>
    </>
  );
}
