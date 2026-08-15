import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { useOTWidget } from "./OTwidget";

// Desktop nav matches the .main-nav (globals.css): a fixed 620×74 centered
// pill, radius 999, bg rgba(0,0,0,.4) + backdrop-blur 10, top 42px, laid out as a 5-col
// grid 0.9fr / 1.25fr / 74px(brand) / 0.9fr / 1.3fr:
//   MENU · HAPPY HOUR · [Silent-H logo 38×56 in a 68px box] · RESERVE · PLAN AN EVENT
// Links: NeueBit(body) bold uppercase 15px, ls 0.13em, place-items-center, pad 0 7px,
// hover → pink. Dynamic controls kept (differ from the 's static Next site):
// router NavLinks for the real routes, "Reserve" opens the OT widget, logo → scroll-top,
// active link tinted pink (colour only — no sparkles, so the grid metrics stay exact).
// Mobile is our own full-width glass bar + hamburger/overlay (unchanged).
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

    // 's .main-nav > a: grid cell, place-items center, height 100%, pad 0 7px,
    // NeueBit(body) bold uppercase 15px, ls 0.13em, 180ms colour transition, hover → pink.
    const linkBase =
        "grid place-items-center h-full px-[7px] text-center whitespace-nowrap font-body font-bold uppercase text-[15px] tracking-[0.13em] transition-colors duration-[180ms]";

    // Mobile menu-overlay links (Reserve has no `to` — it opens the OT widget).
    const MOBILE_LINKS = [
        { to: "/menu", label: "Menu" },
        { to: "/happy-hour", label: "Happy Hour" },
        { label: "Reserve" },
        { to: "/events", label: "Plan an Event" },
    ];

    // Desktop pill link. Active page = pink (colour only, no sparkles → grid metrics stay exact).
    const NavItem = ({ to, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-sh-pink" : "text-sh-cream hover:text-sh-pink"}`
            }
        >
            {children}
        </NavLink>
    );

    const Logo = ({ className }) => (
        <NavLink to="/" onClick={handleLogoClick} aria-label="Silent H home" className="shrink-0">
            <img src="/redesign/nav-logo.svg" alt="Silent H" className={className} loading="eager" decoding="async" />
        </NavLink>
    );

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
            {/* Desktop centered pill — 's .main-nav: fixed 620×74 (shrinks to
                100vw-24 below ~644px), top 42px, 5-col grid, radius 999, bg black/40 +
                blur 10, two-layer shadow. */}
            <nav
                aria-label="Primary navigation"
                className="pointer-events-auto hidden md:grid items-center mt-[42px] h-[74px] w-[min(620px,calc(100vw-24px))] rounded-[999px] bg-black/40 backdrop-blur-[10px] [grid-template-columns:0.9fr_1.25fr_74px_0.9fr_1.3fr] [box-shadow:0_20px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.3)]"
            >
                <NavItem to="/menu">Menu</NavItem>
                <NavItem to="/happy-hour">Happy Hour</NavItem>
                {/* brand-mark — 68px grid cell, logo 38×56 object-contain ( .brand-mark) */}
                <NavLink
                    to="/"
                    onClick={handleLogoClick}
                    aria-label="Silent H home"
                    className="grid place-items-center justify-self-center w-[68px] h-[68px]"
                >
                    <img src="/redesign/nav-logo.svg" alt="Silent H" className="w-[38px] h-[56px] object-contain" loading="eager" decoding="async" />
                </NavLink>
                {/* RESERVE — opens OT widget (kept dynamic; the  uses a mailto link) */}
                <button
                    onClick={openReservationWidget}
                    className={`${linkBase} text-sh-cream hover:text-sh-pink cursor-pointer`}
                >
                    Reserve
                </button>
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
