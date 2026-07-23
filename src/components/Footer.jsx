import { FaTiktok, FaInstagram, FaYoutube} from "react-icons/fa";
import { LuFacebook, LuYoutube} from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import MailingForm from "./MailingForm.jsx";
import { useOTWidget } from "../components/OTwidget.jsx";
import { T } from "../styles/figmaTokens";

// Pink "Join our mailing" button with the Figma SecondaryButton press animation:
// on click the pink fill INSTANTLY drops to transparent and the label snaps to red
// (#eb4660), then both slowly settle back (pink fill + black label) over ~1.2s with a
// spring-like ease (Figma's SPRING_PRESET_THREE dissolve, ~1.25s). `sizing` carries the
// per-breakpoint width/height/font classes.
function MailingButton({ sizing, onOpen, children }) {
    const [pressed, setPressed] = useState(false);
    const handle = () => {
        setPressed(true); // snap (transition:none) → transparent bg + red text
        // let the snap paint, then release → slow fade back to pink bg + black text
        requestAnimationFrame(() => requestAnimationFrame(() => setPressed(false)));
        onOpen?.();
    };
    return (
        <button
            onClick={handle}
            className={`inline-flex items-center justify-center rounded-[4px] font-body uppercase tracking-[0.2em] ${sizing} ${
                pressed
                    ? "bg-transparent text-sh-pink [transition:none]"
                    : "bg-sh-pink text-sh-ink [transition:background-color_1.2s_cubic-bezier(0.16,1,0.3,1),color_1.2s_cubic-bezier(0.16,1,0.3,1)]"
            }`}
        >
            {children}
        </button>
    );
}

// "Recommended on Tripadvisor" badge with a graceful failure path.
// DETECTION: the <img>'s onError fires whenever the file can't load — a 404, a network drop, or
// (most common here) an ad-/privacy blocker cancelling any request with a "tripadvisor"-ish name.
// On failure we swap to a styled text fallback. Because the img carries an EXPLICIT height and the
// fallback matches it, the badge area is the same size whether the image loads, is loading, or
// fails — so a blocked image can never collapse the box, shorten the page, or change the scroll.
function RecommendedBadge({ imgClassName, fallbackClassName }) {
    const [failed, setFailed] = useState(false);
    if (failed) return <span className={fallbackClassName}>Tripadvisor</span>;
    return (
        <img
            src="/redesign/rec-badge-1.png"
            alt="Tripadvisor"
            onError={() => setFailed(true)}
            className={imgClassName}
        />
    );
}

// ── Silent H Footer — Group 25 @(0,4092) 1282×652, Figma ground-truth ──
// 1px @1280 = 0.078125vw. Figma "footer 1" is a FULL-WIDTH doorway image across the
// top (image "footer-social-*"), with the social block overlaid on it, then the info
// row below. Group 14:
//   • Frame 1651 (centered, overlaid on the doorway): "Let's get social" cream
//     centered + social icons row (gap32, 24×24).
//   • Frame 1653 (gap40): Quick-links column (NeueBit Bold 16px ls3.2 UPPER) |
//     address NeueBit Bold 16px | google-maps logo + "find us on google maps"
//     NeueBit Bold 18px.
//   • Frame 1654 (gap40): pink SecondaryButton 270×48 + Frame 1592 219×57 black r4
//     ("RECOMENDED ON" green #00eb5b NeueBit Bold 18px + Tripadvisor logo 150×23).
export default function Footer() {
    const [showForm, setShowForm] = useState(false);
    const { openReservationWidget } = useOTWidget();

    const QUICK_LINKS = [
        { to: "/menu", label: "menu" },
        { to: "/events", label: "events" },
        { to: "/story", label: "our story" },
        { to: "/faq", label: "FAQ" },
        { to: "/happy-hour", label: "happy hour" },
        { to: "/aitch/", label: "aitch" },
        { to: "/blogs", label: "blog" },
    ];

    return (
        <footer className="relative z-10 bg-sh-black text-sh-cream overflow-hidden">
            {/* ════════ DESKTOP — pixel-exact (vw) ════════ */}
            {/* h = Group25 content 50.94vw + 98px (7.66vw) empty below to match the home frame's
                bottom padding (4744→4842). Without it the whole page is short and everything reads
                proportionally too low vs the figma. */}
            <div className="hidden md:block relative w-full h-[77.6vw]">
                {/* Figma "footer 1": full-width doorway image across the top of the footer (h ≈ 45.78vw) */}
                <div className="absolute inset-x-0 top-0 w-full">
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={[
                                "/redesign/footer-social-768.avif 768w",
                                "/redesign/footer-social-960.avif 960w",
                                "/redesign/footer-social-1200.avif 1200w",
                            ].join(", ")}
                            sizes="100vw"
                        />
                        <source
                            type="image/webp"
                            srcSet={[
                                "/redesign/footer-social-768.webp 768w",
                                "/redesign/footer-social-960.webp 960w",
                                "/redesign/footer-social-1200.webp 1200w",
                            ].join(", ")}
                            sizes="100vw"
                        />
                        <img
                            src="/redesign/footer-social-1200.webp"
                            width="1279"
                            height="586"
                            alt="The entrance to Silent H — a carved stone doorway flanked by two reclining figures, with a neon sign reading You Are Exactly Where You Need To Be"
                            className="block w-full h-auto object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </div>
                {/* Darken the doorway's top for the overlaid heading + a stronger fade-in; seal the image bottom to black */}
                <div className="absolute inset-x-0 top-0 h-[24vw] bg-gradient-to-b from-black via-black/70 to-transparent" />
                <div className="absolute inset-x-0 top-[34vw] h-[11.78vw] bg-gradient-to-b from-transparent to-sh-black" />
                <div className="absolute inset-x-0 top-[45.78vw] bottom-0 bg-sh-black" />

                {/* Frame 1651 — "Let's get social" + icons, overlaid on the doorway's upper area */}
                <div className="absolute left-[28.13vw] top-[6.25vw] w-[43.75vw] z-10 flex flex-col items-center gap-[3.125vw]">
                    {/* Monoglyphic Bold 40px (Desktop/H1 style), UPPER, ls 7% → 3.125vw / 0.219vw */}
                    <p className={`${T.h1} uppercase text-sh-cream text-center leading-[1]`}>
                        Let&apos;s get social
                    </p>
                    {/* Frame 1395: social icons row, gap32 = 2.5vw, 24×24 = 1.875vw */}
                    <div className="flex flex-row items-center gap-[2.5vw] text-[round(1.875vw,1px)]">
                        <a href="https://www.tiktok.com/@silenth.to?lang=en" aria-label="TikTok"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><FaTiktok/></a>
                        <a href="https://www.instagram.com/silenth.to/?hl=en" aria-label="Instagram"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><FaInstagram/></a>
                        <a href="https://www.facebook.com/silenth.to/" aria-label="Facebook"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><LuFacebook/></a>
                        <a href=" https://www.youtube.com/@silenth.toronto" aria-label="Youtube"
                           className="hover:text-sh-pink transition-colors"><FaYoutube/></a>
                    </div>
                </div>

                {/* Frame 1653 — quick links / address / maps, now BELOW the full-width doorway */}
                <div className="absolute left-[5.47vw] top-[58.44vw] flex flex-row items-center gap-[3.125vw]">
                    {/* Frame 1597: Quick links column, gap20 = 1.56vw, width 229 = 17.89vw */}
                    <div className="w-[17.89vw] flex flex-col items-start gap-[1.56vw]">
                        {/* "Quick links" = Monoglyphic Regular 22px, MIXED case (figma renders
                            "Quick links", not uppercase), ls ~5% */}
                        <p className={`${T.h3} text-sh-cream leading-[1.2]`}>Quick links</p>
                        {/* Frame 1596: links, items at 20px pitch (8px cap-box + 12px gap).
                            leading-[0.5] makes each box hug the uppercase cap-height like Figma. */}
                        <div className="flex flex-col items-start gap-[0.94vw]">
                            {QUICK_LINKS.map((l) => (
                                <Link key={l.to} to={l.to} className={`${T.caption} uppercase text-sh-cream leading-[0.5] hover:text-sh-pink transition-colors font-bold`}>
                                    {l.label}
                                </Link>
                            ))}
                            <button onClick={openReservationWidget} className={`${T.caption} uppercase text-sh-cream leading-[0.5] hover:text-sh-pink transition-colors text-left font-bold`}>
                                reserve a table
                            </button>
                        </div>
                    </div>

                    {/* Address @(339,551) → NeueBit Bold 16px ls3.2 UPPER, 229 wide = 17.89vw */}
                    <p className={`w-[17.89vw] ${T.caption} uppercase text-sh-cream leading-[1.2] font-bold`}>
                        <a href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014" target="_blank" rel="noopener noreferrer" className="hover:text-sh-pink transition-colors">416 West 13th St</a>
                        {" | "}
                        <a href="tel:+14169003535" className="hover:text-sh-pink transition-colors">416 900 3535</a>
                        {" | "}
                        <a href="mailto:info@silenth.ca" className="hover:text-sh-pink transition-colors">info@silenth.ca</a>
                    </p>

                    {/* Frame 1652 @(608,548): google maps link. The embedded map sits BELOW it,
                        absolutely positioned so it doesn't shift the link in this items-center row. */}
                    <div className="relative">
                        <a
                            href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center gap-[1.56vw] hover:opacity-80 transition-opacity"
                        >
                            <img src="/redesign/fig-google-maps-logo-1-1.png" alt="" className="w-[1.875vw] h-[2.58vw] object-cover" />
                            {/* NeueBit Bold 16px UPPER → 1.25vw */}
                            <span className={`${T.button} uppercase text-sh-cream font-bold`}>find us on google maps</span>
                        </a>
                        {/* Embedded map (restored). pointer-events-none so it never grabs the scroll;
                            the wrapping link opens Google Maps. */}
                        <a
                            href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open Silent H on Google Maps"
                            className="absolute top-full left-0 mt-[1.25vw] block w-[17.89vw] h-[10vw] overflow-hidden rounded-[4px]"
                        >
                            <iframe
                                title="Silent H location"
                                src="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014&output=embed"
                                loading="lazy"
                                className="pointer-events-none h-full w-full border-0"
                            />
                        </a>
                    </div>
                </div>

                {/* Frame 1654 — mailing + recommended, aligned with the links row below the doorway */}
                <div className="absolute left-[73.44vw] top-[58.44vw] w-[21.09vw] flex flex-col items-center gap-[3.125vw]">
                    {/* Pink SecondaryButton 270×48 → full width × 3.75vw */}
                    <MailingButton sizing="w-full h-[3.75vw] text-[round(1.25vw,1px)] font-bold tracking-[1.6px]" onOpen={() => setShowForm(true)}>
                        Join our mailing community
                    </MailingButton>
                    {/* Frame 1592 219×57 black r4 → w 17.11vw, h 4.45vw, gap12 = 0.94vw */}
                    <div className="w-[17.11vw] h-[4.45vw] rounded-[4px] bg-sh-ink flex flex-col items-center justify-center gap-[0.94vw]">
                        {/* "RECOMENDED ON" green #00eb5b NeueBit Bold 22px → 1.72vw */}
                        <span className={`${T.subtitle} text-[#00eb5b] leading-[1]`}>RECOMMENDED ON</span>
                        {/* Tripadvisor logo 150×23 → 11.72vw × 1.8vw (explicit height reserves the space) */}
                        <RecommendedBadge
                            imgClassName="w-[11.72vw] h-[1.8vw] object-contain"
                            fallbackClassName="inline-flex items-center h-[1.8vw] font-body font-bold text-[#00eb5b] text-[round(1.56vw,1px)] leading-none tracking-[0.08em]"
                        />
                    </div>
                </div>
            </div>

            {/* ════════ MOBILE — Figma Group 29 (393×810), EXACT spacing ════════ */}
            {/* Was a flat column with a uniform gap-7 (28px) + loose line-heights → ~245px too tall
                (1055 vs 810). Now each section carries the .fig's own gap (20/20/60/40/20/40/40/40)
                via mt-*, and the quick-links list is tightened to the .fig 20px pitch (leading-[0.5]
                + 12px gap). pb-28 keeps the ~121px empty space below the footer (frame 5699 vs 5578). */}
            <div className="md:hidden w-full max-w-[321px] mx-auto pt-12 pb-56 flex flex-col items-center text-center">
                {/* Figma "footer 1" doorway — full column width, fades to black at the bottom */}
                <div className="relative w-full overflow-hidden rounded-[4px]">
                    <picture>
                        <source type="image/avif" srcSet={["/redesign/footer-social-480.avif 480w", "/redesign/footer-social-768.avif 768w"].join(", ")} sizes="321px" />
                        <source type="image/webp" srcSet={["/redesign/footer-social-480.webp 480w", "/redesign/footer-social-768.webp 768w"].join(", ")} sizes="321px" />
                        <img src="/redesign/footer-social-480.webp" width="480" height="220" alt="The entrance to Silent H — a carved stone doorway with a neon sign reading You Are Exactly Where You Need To Be" className="block w-full h-auto" loading="lazy" decoding="async" />
                    </picture>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sh-black to-transparent" />
                </div>

                {/* Frame 1507 — "Let's get social" BOLD, centered, wraps "LET'S GET" / "SOCIAL"
                    (explicit break); icons ordered TikTok / Instagram / Facebook per the .fig. */}
                <p className="mt-5 font-display font-bold uppercase text-sh-cream text-[28px] leading-[1.2] tracking-[0.05em]">Let&apos;s get<br />social</p>
                <div className="mt-5 flex justify-center gap-8 text-[24px] text-sh-cream">
                    <a href="https://www.tiktok.com/@silenth.to?lang=en" aria-label="TikTok"
                       className="hover:text-sh-pink transition-colors"><FaTiktok/></a>
                    <a href="https://www.instagram.com/silenth.to/?hl=en" aria-label="Instagram"
                       className="hover:text-sh-pink transition-colors"><FaInstagram/></a>
                    <a href="https://www.facebook.com/silenth.to/" aria-label="Facebook"
                       className="hover:text-sh-pink transition-colors"><LuFacebook/></a>
                    <a href=" https://www.youtube.com/@silenth.toronto" aria-label="Youtube"
                       className="hover:text-sh-pink transition-colors"><LuYoutube/></a>
                </div>

                {/* Frame 1653 — pink mailing button (60 below social) */}
                <MailingButton sizing="mt-[60px] w-full h-[48px] text-[16px] font-bold" onOpen={() => setShowForm(true)}>
                    Join our mailing community
                </MailingButton>

                {/* Quick links (40 below button) + 4 links at the .fig 20px pitch (20 below heading) */}
                <p className="mt-10 font-display text-sh-cream text-[18px] tracking-[0.05em]">Quick links</p>
                <div className="mt-5 flex flex-col items-center gap-3">
                    {QUICK_LINKS.map((l) => (
                        <Link key={l.to} to={l.to} className="font-body uppercase text-sh-cream text-[16px] leading-[0.5] tracking-[0.2em] hover:text-sh-pink transition-colors">{l.label}</Link>
                    ))}
                    <button onClick={openReservationWidget} className="font-body uppercase text-sh-cream text-[16px] leading-[0.5] tracking-[0.2em] hover:text-sh-pink transition-colors">reserve a table</button>
                </div>

                {/* Address (40 below) */}
                <p className="mt-10 font-body uppercase text-sh-cream text-[16px] tracking-[0.2em] leading-[1.2]">
                    416 West 13th St | 416 900 3535 | info@silenth.ca
                </p>

                {/* Find us on google maps (40 below) */}
                <a href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014" target="_blank" rel="noopener noreferrer" className="mt-10 flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img src="/redesign/fig-google-maps-logo-1-1.png" alt="" className="w-6 h-8 object-cover" />
                    <span className="font-body uppercase text-sh-cream text-[16px] tracking-[0.1em]">find us on google maps</span>
                </a>

                {/* Embedded map directly under the link. pointer-events-none so touch-scroll passes
                    straight through; the wrapping link opens Google Maps. */}
                <a href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014" target="_blank" rel="noopener noreferrer"
                   aria-label="Open Silent H on Google Maps" className="mt-6 block w-[260px] h-[150px] overflow-hidden rounded-[4px]">
                    <iframe
                        title="Silent H location"
                        src="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014&output=embed"
                        loading="lazy"
                        className="pointer-events-none h-full w-full border-0"
                    />
                </a>

                {/* RECOMENDED ON box (40 below) */}
                <div className="mt-10 w-[219px] rounded-[4px] bg-sh-ink flex flex-col items-center justify-center gap-2 py-4">
                    <span className="font-body text-[#00eb5b] text-[22px] leading-[1] tracking-[0.2em]">RECOMENDED ON</span>
                    <RecommendedBadge
                        imgClassName="w-[150px] h-[23px] object-contain"
                        fallbackClassName="inline-flex items-center h-[23px] font-body font-bold text-[#00eb5b] text-[20px] leading-none tracking-[0.08em]"
                    />
                </div>
            </div>

            {showForm && <MailingForm onClose={() => setShowForm(false)} />}
        </footer>
    );
}
