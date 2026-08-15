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
            <div className="hidden md:flex w-full flex-col items-center bg-sh-black">
                {/* ── Social section ( .social-section): heading + icons, then the
                    neon image CENTERED below at ~760px — not full-width, not overlaid. ── */}
                <div className="w-[min(1120px,100%)] mx-auto flex flex-col items-center px-6 pt-[82px] pb-[36px]">
                    <p className="font-display font-bold uppercase text-sh-cream text-center text-[clamp(34px,3.5vw,50px)] leading-none tracking-[0.035em] whitespace-nowrap">
                        Let&apos;s get social
                    </p>
                    <div className="mt-[22px] flex flex-row items-center gap-[30px] text-[28px]">
                        <a href="https://www.tiktok.com/@silenth.to?lang=en" aria-label="TikTok"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><FaTiktok/></a>
                        <a href="https://www.instagram.com/silenth.to/?hl=en" aria-label="Instagram"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><FaInstagram/></a>
                        <a href="https://www.facebook.com/silenth.to/" aria-label="Facebook"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><LuFacebook/></a>
                        <a href="https://www.youtube.com/@silenth.toronto" aria-label="Youtube"
                           className="text-sh-cream hover:text-sh-pink transition-colors"><FaYoutube/></a>
                    </div>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={[
                                "/redesign/footer-social-768.avif 768w",
                                "/redesign/footer-social-960.avif 960w",
                                "/redesign/footer-social-1200.avif 1200w",
                            ].join(", ")}
                            sizes="760px"
                        />
                        <source
                            type="image/webp"
                            srcSet={[
                                "/redesign/footer-social-768.webp 768w",
                                "/redesign/footer-social-960.webp 960w",
                                "/redesign/footer-social-1200.webp 1200w",
                            ].join(", ")}
                            sizes="760px"
                        />
                        <img
                            src="/redesign/footer-social-1200.webp"
                            width="1875"
                            height="839"
                            alt="Neon sign at Silent H reading You Are Exactly Where You Need To Be"
                            className="mt-[52px] block w-[min(760px,calc(100%-48px))] h-auto object-contain translate-x-[3%] opacity-[0.82]"
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </div>

                {/* ── Footer info row ( .site-footer): quick links | address | maps | mailing ── */}
                <div className="w-[min(1140px,100%)] mx-auto px-6 pt-[34px] pb-[80px] flex flex-row items-start justify-between gap-[44px]">
                    {/* Quick links */}
                    <div className="flex flex-col items-start gap-[10px]">
                        <p className="font-body text-sh-cream text-[24px] leading-[1.2] mb-[6px]">Quick links</p>
                        <div className="flex flex-col items-start gap-[5px]">
                            {QUICK_LINKS.map((l) => (
                                <Link key={l.to} to={l.to} className="font-body font-bold uppercase text-sh-cream text-[12px] tracking-[0.18em] leading-[1.5] hover:text-sh-pink transition-colors">
                                    {l.label}
                                </Link>
                            ))}
                            <button onClick={openReservationWidget} className="font-body font-bold uppercase text-sh-cream text-[12px] tracking-[0.18em] leading-[1.5] hover:text-sh-pink transition-colors text-left">
                                reserve a table
                            </button>
                        </div>
                    </div>

                    {/* Address */}
                    <p className="max-w-[220px] font-body font-bold uppercase text-sh-cream text-[12px] tracking-[0.18em] leading-[1.5] pt-[50px]">
                        <a href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014" target="_blank" rel="noopener noreferrer" className="hover:text-sh-pink transition-colors">416 West 13th St</a>
                        {" | "}
                        <a href="tel:+14169003535" className="hover:text-sh-pink transition-colors">416 900 3535</a>
                        {" | "}
                        <a href="mailto:info@silenth.ca" className="hover:text-sh-pink transition-colors">info@silenth.ca</a>
                    </p>

                    {/* Maps link + embed */}
                    <div className="flex flex-col items-start gap-[16px] pt-[50px]">
                        <a
                            href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center gap-[10px] hover:opacity-80 transition-opacity"
                        >
                            <img src="/redesign/fig-google-maps-logo-1-1.png" alt="" className="w-[24px] h-[33px] object-cover" />
                            <span className="font-body font-bold uppercase text-sh-cream text-[12px] tracking-[0.18em]">find us on google maps</span>
                        </a>
                        <a
                            href="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open Silent H on Google Maps"
                            className="block w-[229px] h-[128px] overflow-hidden rounded-[4px]"
                        >
                            <iframe
                                title="Silent H location"
                                src="https://www.google.com/maps?q=416+W+13th+St,+New+York,+NY+10014&output=embed"
                                loading="lazy"
                                className="pointer-events-none h-full w-full border-0"
                            />
                        </a>
                    </div>

                    {/* Mailing + recommended */}
                    <div className="w-[240px] flex flex-col items-center gap-[28px] pt-[40px]">
                        <MailingButton sizing="w-full h-[52px] text-[12px] font-bold tracking-[1.6px]" onOpen={() => setShowForm(true)}>
                            Join our mailing community
                        </MailingButton>
                        <div className="w-[219px] rounded-[4px] bg-sh-ink flex flex-col items-center justify-center gap-[10px] py-[12px]">
                            <span className="font-body text-[#00eb5b] text-[22px] leading-[1] tracking-[0.12em]">RECOMMENDED ON</span>
                            <RecommendedBadge
                                imgClassName="w-[150px] h-[23px] object-contain"
                                fallbackClassName="inline-flex items-center h-[23px] font-body font-bold text-[#00eb5b] text-[20px] leading-none tracking-[0.08em]"
                            />
                        </div>
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
                        <img src="/redesign/footer-social-480.webp" width="480" height="215" alt="Neon sign at Silent H reading You Are Exactly Where You Need To Be" className="block w-full h-auto opacity-[0.82]" loading="lazy" decoding="async" />
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
