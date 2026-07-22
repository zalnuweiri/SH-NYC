import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import Reveal from "../lib/motion/Reveal";
import { menuData } from "../data/MenuData";
import { T, BTN_OUTLINE } from "../styles/figmaTokens";
import ResponsiveImg from "./ResponsiveImg";

const MAX_ITEMS = 15;
const DESKTOP_ITEMS_PER_PAGE = 3;
const MOBILE_ITEMS_PER_PAGE = 2;

const DESKTOP_CARD_STYLES = [
    {
        w: "21.02vw",
        h: "28.91vw",
        pos: "object-[50%_50%]",
    },
    {
        w: "28.59vw",
        h: "28.98vw",
        pos: "object-[50%_40%]",
    },
    {
        w: "21.02vw",
        h: "28.98vw",
        pos: "object-[50%_50%]",
    },
];

function getImage(item) {
    return item.image || item.src || "/placeholder.jpg";
}

function getName(item) {
    return item.name || item.title || "Product name";
}

export default function MenuCarousel() {
    const menuItems = menuData.carousel.slice(0, MAX_ITEMS);

    const [desktopPage, setDesktopPage] = useState(0);
    const [mobilePage, setMobilePage] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const mobileCarouselRef = useRef(null);

    if (!menuItems.length) return null;

    const desktopTotalPages = Math.ceil(
        menuItems.length / DESKTOP_ITEMS_PER_PAGE
    );

    const mobileTotalPages = Math.ceil(
        menuItems.length / MOBILE_ITEMS_PER_PAGE
    );

    const desktopStartIndex = desktopPage * DESKTOP_ITEMS_PER_PAGE;

    const currentDesktopItems = menuItems.slice(
        desktopStartIndex,
        desktopStartIndex + DESKTOP_ITEMS_PER_PAGE
    );

    const nextDesktopPage = () => {
        setDesktopPage((prev) => (prev + 1) % desktopTotalPages);
    };

    const prevDesktopPage = () => {
        setDesktopPage(
            (prev) => (prev - 1 + desktopTotalPages) % desktopTotalPages
        );
    };

    const scrollMobileToPage = (pageIndex) => {
        setMobilePage(pageIndex);

        const carousel = mobileCarouselRef.current;
        if (!carousel) return;

        const card = carousel.querySelector("[data-menu-card]");
        if (!card) return;

        const styles = window.getComputedStyle(carousel);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        const cardWidth = card.offsetWidth;

        carousel.scrollTo({
            left: pageIndex * (cardWidth + gap) * MOBILE_ITEMS_PER_PAGE,
            behavior: "smooth",
        });
    };

    const handleMobileScroll = () => {
        const carousel = mobileCarouselRef.current;
        if (!carousel) return;

        const card = carousel.querySelector("[data-menu-card]");
        if (!card) return;

        const styles = window.getComputedStyle(carousel);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        const cardWidth = card.offsetWidth;

        const rawPage =
            carousel.scrollLeft /
            ((cardWidth + gap) * MOBILE_ITEMS_PER_PAGE);

        const nextPage = Math.min(
            mobileTotalPages - 1,
            Math.max(0, Math.round(rawPage))
        );

        setMobilePage(nextPage);
    };

    return (
        <section className="relative w-full">
            {/* Desktop exact composition */}
            <div className="hidden md:flex w-[73.91vw] mx-auto flex-col items-center gap-[2.5vw]">
                <Reveal className="flex flex-col items-center gap-[2.1vw] w-full">
                    <h2 className={`${T.h1} uppercase text-sh-cream text-center leading-[1.2] font-bold`}>
                        Menú excepcional
                    </h2>

                    <p className={`${T.body} text-sh-cream text-center leading-[1.2]`}>
                        From expertly crafted artisanal cocktails to dishes that celebrate authentic Mexican soul.
                    </p>
                </Reveal>

                <div className="flex flex-col items-start gap-[2.19vw] w-full">
                    <div className="flex flex-row items-start justify-center gap-[1.64vw] w-full">
                        {currentDesktopItems.map((item, idx) => {
                            const cardStyle = DESKTOP_CARD_STYLES[idx];

                            const isLeftmost = idx === 0;
                            const isRightmost = idx === currentDesktopItems.length - 1;

                            const handleCardClick = () => {
                                if (isLeftmost) {
                                    prevDesktopPage();
                                    return;
                                }

                                if (isRightmost) {
                                    nextDesktopPage();
                                }
                            };

                            const isClickableEdge = isLeftmost || isRightmost;

                            return (
                                <Reveal
                                    key={`${item.id ?? getName(item)}-${desktopStartIndex + idx}`}
                                    delay={idx * 0.08}
                                    className="flex flex-col gap-[1.56vw]"
                                    style={{ width: cardStyle.w }}
                                >
                                    <button
                                        type="button"
                                        onClick={handleCardClick}
                                        className={`flex flex-col gap-[1.56vw] text-left ${
                                            isClickableEdge ? "cursor-pointer" : "cursor-default"
                                        }`}
                                        aria-label={
                                            isLeftmost
                                                ? "Show previous menu items"
                                                : isRightmost
                                                    ? "Show next menu items"
                                                    : getName(item)
                                        }
                                    >
                                        <div
                                            className="overflow-hidden rounded-[4px]"
                                            style={{ height: cardStyle.h }}
                                        >
                                            {/* cardStyle.w is TRUE vw (not capped to var(--dw)), so sizes
                                                matches it exactly rather than approximating. */}
                                            <ResponsiveImg
                                                src={getImage(item)}
                                                alt={getName(item)}
                                                sizes={cardStyle.w}
                                                className={`w-full h-full object-cover ${cardStyle.pos} transition-transform duration-500 ${
                                                    isClickableEdge ? "hover:scale-105" : ""
                                                }`}
                                            />
                                        </div>

                                        <p className={`${T.caption} uppercase text-sh-cream`}>
                                            {getName(item)}
                                        </p>
                                    </button>
                                </Reveal>
                            );
                        })}
                    </div>

                    <div className="flex flex-row items-center gap-[0.625vw]">
                        {Array.from({ length: desktopTotalPages }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Go to menu page ${i + 1}`}
                                onClick={() => setDesktopPage(i)}
                                className={`block w-[0.625vw] h-[0.625vw] rounded-full transition-colors ${
                                    i === desktopPage ? "bg-sh-pink" : "bg-[#9a9a9a]"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <Link
                    to="/menu"
                    className={`${BTN_OUTLINE} w-[14.375vw] h-[3.75vw] font-bold`}
                >
                    Explore the Menu
                </Link>
            </div>

            {/* Mobile */}
            <div className="md:hidden w-full max-w-[321px] mx-auto py-12 flex flex-col items-start text-left">
                <h2 className="font-display font-bold uppercase text-sh-cream leading-[1.2] text-[24px] tracking-[0.05em]">
                    Menú excepcional
                </h2>

                <p className="mt-8 font-body text-sh-cream leading-[1.2] text-[18px] tracking-[0.125em]">
                    From expertly crafted artisanal cocktails to dishes that celebrate authentic
                    <br />
                    Mexican soul.
                </p>

                <div
                    ref={mobileCarouselRef}
                    onScroll={handleMobileScroll}
                    className="mt-8 w-full flex gap-5 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {menuItems.map((item, idx) => {
                        const cardStyle = DESKTOP_CARD_STYLES[idx % DESKTOP_CARD_STYLES.length];

                        return (
                            <div
                                key={item.id ?? `${getName(item)}-${idx}`}
                                data-menu-card
                                className="snap-start shrink-0 w-[calc(50%-0.625rem)] flex flex-col gap-2"
                            >
                                <div className="overflow-hidden rounded-[4px] aspect-square">
                                    {/* Card is calc(50% - 0.625rem) of a max-w-321px container ⇒ ~150px. */}
                                    <ResponsiveImg
                                        src={getImage(item)}
                                        alt={getName(item)}
                                        sizes="150px"
                                        className={`w-full h-full object-cover ${cardStyle.pos} cursor-zoom-in`}
                                        onClick={() => setSelectedImage(item)}
                                    />
                                </div>

                                <p className="font-body uppercase text-sh-cream text-[16px] leading-[1.2] tracking-[0.2em] text-left">
                                    {getName(item)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5 flex flex-row items-center gap-2">
                    {Array.from({ length: mobileTotalPages }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to menu page ${i + 1}`}
                            onClick={() => scrollMobileToPage(i)}
                            className={`block w-2 h-2 rounded-full transition-colors ${
                                i === mobilePage ? "bg-sh-pink" : "bg-[#9a9a9a]"
                            }`}
                        />
                    ))}
                </div>

                <Link
                    to="/menu"
                    className="mt-8 inline-flex items-center justify-center rounded-[4px] border border-sh-cream font-body uppercase text-sh-cream w-[127px] h-[48px] text-[16px] tracking-[0.1em] hover:bg-sh-cream hover:text-sh-black transition-colors"
                >
                    View Menu
                </Link>
            </div>

            {selectedImage &&
                typeof document !== "undefined" &&
                createPortal(
                    <div
                        className="fixed inset-0 bg-black/80 flex items-start justify-center z-[9999] pt-[3.5%]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            type="button"
                            aria-label="Close image preview"
                            className="absolute top-5 right-6 text-white text-3xl z-[10000]"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>

                        <div
                            className="relative flex items-center justify-center bg-black/90 p-4 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ResponsiveImg
                                src={getImage(selectedImage)}
                                alt={getName(selectedImage)}
                                sizes="90vw"
                                loading="eager"
                                className="max-w-[90vw] max-h-[85vh] object-contain rounded-md"
                            />
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
}