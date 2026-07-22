import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { useOTWidget } from "./OTwidget";
import { T, EASE } from "../styles/figmaTokens";

// Figma home nav — Frame 1589 @(408,40) 464×67, bg #00000066 (= bg-black/40) +
// backdrop-blur, rounded-full. Inner Frame 1426 @(428,50) 424×48, gap12:
//   MENU(50) · HAPPY HOUR(98) · [pink Silent-H logo 38×48] · RESERVE(75) · PLAN AN EVENT(115)
// Labels are NeueBit uppercase cream; "Reserve" opens the OT widget (link, not button).
// 1px @1280 design = 0.078125vw → exact desktop pill scales with the full-bleed canvas.
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { openReservationWidget } = useOTWidget();
    const location = useLocation();

    const handleLogoClick = (e) => {
        setIsOpen(false);
        if (location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    };

    // NeueBit Bold, uppercase, button type token (16/16 ls1.6 → ~0.16em). On the
    // full-bleed canvas the pill text is sized in vw so it tracks the design exactly.
    // Nav links = Desktop/Button style (NeueBit 16, ls 10%, UPPER) + spring colour fade.
    const linkBase = `${T.button} uppercase whitespace-nowrap px-[1vw] ${EASE}`;

    // Mobile menu-overlay links (Reserve has no `to` — it opens the OT widget).
    const MOBILE_LINKS = [
        { to: "/menu", label: "Menu" },
        { to: "/happy-hour", label: "Happy Hour" },
        { label: "Reserve" },
        { to: "/events", label: "Plan an Event" },
    ];
    const pill = ({ isActive }) =>
        `${linkBase} ${isActive ? "text-sh-gold" : "text-sh-cream hover:text-sh-gold"}`;

    // Active page link: pink + flanking pink sparkles (Figma "✦ MENU ✦").
    const NavItem = ({ to, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${linkBase} inline-flex items-center gap-[0.45vw] ${isActive ? "text-sh-pink" : "text-sh-cream hover:text-sh-gold"}`
            }
        >
            {({ isActive }) => (
                <>
                    {/* circles always reserve space; only visible when active — so clicking doesn't reflow the row */}
                    <span className={`w-[0.47vw] h-[0.47vw] shrink-0 rounded-full bg-current transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                    {children}
                    <span className={`w-[0.47vw] h-[0.47vw] shrink-0 rounded-full bg-current transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                </>
            )}
        </NavLink>
    );

    const Logo = ({ className }) => (
        <NavLink to="/" onClick={handleLogoClick} aria-label="Silent H home" className="shrink-0">
            <img src="/redesign/nav-logo.svg" alt="Silent H" className={className} loading="eager" decoding="async" />
        </NavLink>
    );

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
            {/* Desktop centered pill — @(408,40), so top = 40px = 3.125vw.
                Pill 464×67 with inner 424-wide item row, gap 12px = 0.94vw, h 67px = 5.23vw. */}
            <nav className="font-bold pointer-events-auto hidden md:flex items-center justify-center gap-[0.94vw] rounded-full bg-black/40 backdrop-blur-[10px] mt-[3.125vw] h-[5.23vw] px-[1.56vw] shadow-xl shadow-black/30">
                {/* MENU (50w) */}
                <NavItem to="/menu">Menu</NavItem>
                {/* HAPPY HOUR (98w) */}
                <NavItem to="/happy-hour">Happy Hour</NavItem>
                {/* pink Silent-H logo 38×48 = 2.97vw × 3.75vw */}
                <Logo className="h-[3.75vw] w-auto" />
                {/* RESERVE (75w) — opens OT widget */}
                <button
                    onClick={openReservationWidget}
                    className={`${linkBase} text-sh-cream hover:text-sh-gold cursor-pointer`}
                >
                    Reserve
                </button>
                {/* PLAN AN EVENT (115w) */}
                <NavItem to="/events">Plan an Event</NavItem>
            </nav>

            {/* Mobile bar — full-width GLASS strip (Figma Frame 1589: 393×64, black/60 +
                backdrop-blur 10). Pink Silent-H mark left, white hamburger right; no pill. */}
            <nav className="pointer-events-auto md:hidden absolute top-0 inset-x-0 flex items-center justify-between w-full h-16 px-[28px] bg-black/60 backdrop-blur-[10px]">
                <Logo className="h-[41px] w-auto" />
                <button
                    className="text-sh-cream"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                >
                    <MenuIcon size={24} />
                </button>
            </nav>

            {/* Mobile menu overlay — Figma "Mobile - Menu" (6070:1124, 393×853). Full #0b0b0b
                screen ABOVE the glass bar (z-60 so the blur strip can't show the page through).
                Positions match the design's vertical rhythm (logo 11.7% top · links 35.5% ·
                contact us ~89%): logo top-centre, close-X top-right, 4 links split by RED rules,
                social icons + "contact us" near the bottom. */}
            {isOpen && (
                <div className="pointer-events-auto md:hidden fixed inset-0 z-[60] h-[100dvh] bg-sh-ink flex flex-col items-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-5 right-5 text-sh-cream"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>

                    {/* Big pink Silent-H mark (design top y100 ≈ 11.7%) */}
                    <Logo className="h-[93px] w-auto mt-[11.7vh]" />

                    {/* Nav links — NeueBit 16 UPPER, 228 wide, divided by 1px RED rules; 88px pitch
                        (link 32 + 28 gap + rule + 28 gap). Design links block starts ~35.5% down. */}
                    <nav className="mt-[13vh] w-[228px] flex flex-col">
                        {MOBILE_LINKS.map((l, i) => (
                            <div key={l.label} className="contents">
                                {/* DOTTED red rule (Figma dashPattern [1,8], round caps): 1px dots ~9px apart */}
                                {i > 0 && (
                                    <span
                                        className="my-7 h-px w-full"
                                        style={{
                                            backgroundImage: "radial-gradient(circle, #eb4660 1.15px, transparent 1.5px)",
                                            backgroundSize: "9px 100%",
                                            backgroundRepeat: "repeat-x",
                                        }}
                                    />
                                )}
                                {l.to ? (
                                    <NavLink
                                        to={l.to}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `h-8 flex items-center justify-center font-body uppercase text-[16px] tracking-[0.1em] transition-colors ${isActive ? "text-sh-pink" : "text-sh-cream hover:text-sh-pink"}`
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                ) : (
                                    <button
                                        onClick={openReservationWidget}
                                        className="h-8 flex items-center justify-center font-body uppercase text-[16px] tracking-[0.1em] text-sh-cream hover:text-sh-pink transition-colors"
                                    >
                                        {l.label}
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Bottom: social icons + "contact us" (design contact ~89% → ~11% from bottom) */}
                    <div className="mt-auto mb-[12vh] flex flex-col items-center gap-4">
                        <div className="flex gap-7 text-sh-cream text-[22px]">
                            <a href="https://www.instagram.com/silenth.to/?hl=en" aria-label="Instagram" className="hover:text-sh-pink transition-colors"><FaInstagram /></a>
                            <a href="https://www.facebook.com/silenth.to/" aria-label="Facebook" className="hover:text-sh-pink transition-colors"><LuFacebook /></a>
                            <a href="https://www.tiktok.com/@silenth.to?lang=en" aria-label="TikTok" className="hover:text-sh-pink transition-colors"><FaTiktok /></a>
                        </div>
                        <a href="mailto:info@silenth.ca" className="font-body uppercase text-sh-cream text-[16px] tracking-[0.2em] hover:text-sh-pink transition-colors">contact us</a>
                    </div>
                </div>
            )}
        </header>
    );
}
