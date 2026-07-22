// Turquoise vertical "Enter Aitch" tab at the hero's right edge (Figma node 8511:230, y520).
// Figma scrollBehavior = SCROLLS (default) → it is a HERO element that scrolls away, NOT a
// persistent fixed tab. So: absolute (scrolls with the page), positioned in the hero band.
export default function EnterAitchTab() {
    return (
        <a
            href="/aitch/"
            aria-label="Enter Aitch"
            className="hidden md:block absolute right-[calc(var(--dw)*2/100)] top-[40vh] -translate-y-1/2 z-40 transition-transform duration-300 hover:-translate-x-1 drop-shadow-lg"
        >
            <img
                src="/redesign/enter-aitch-tab.png"
                alt="Enter Aitch"
                className="h-[calc(var(--dw)*12.5/100)] w-auto select-none"
                draggable="false"
            />
        </a>
    );
}
