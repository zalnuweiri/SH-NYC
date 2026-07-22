// src/components/BlogSection.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Reveal from "../lib/motion/Reveal";
import { T } from "../styles/figmaTokens";
import { supabase } from "../lib/supabaseClient";

const BLOG_IMAGE_BUCKET = "blog-images";

const BLOG_CAROUSEL_THRESHOLD = 5;
const DESKTOP_VISIBLE_POSTS = 4;
const MOBILE_VISIBLE_POSTS = 2;

const DESKTOP_TITLE_CLAMP_STYLE = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const MOBILE_TITLE_CLAMP_STYLE = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const FALLBACK_POSTS = [
    {
        id: "fallback-1",
        img: "/redesign/fig-blog-1.png",
        title: "The best for you to try at home",
        category: "Ingredients",
        href: "https://www.instagram.com/silenth.to/",
        author: "Silent H team",
        dateLabel: "5 days ago",
    },
    {
        id: "fallback-2",
        img: "/redesign/fig-blog-2.png",
        title: "It’s drinks o’clock in Mexico",
        category: "Drinks",
        href: "https://www.instagram.com/silenth.to/",
        author: "Silent H team",
        dateLabel: "5 days ago",
    },
    {
        id: "fallback-3",
        img: "/redesign/fig-blog-3.png",
        title: "Culture and food in one dish",
        category: "Culture",
        href: "https://www.instagram.com/silenth.to/",
        author: "Silent H team",
        dateLabel: "5 days ago",
    },
    {
        id: "fallback-4",
        img: "/redesign/fig-blog-4.png",
        title: "The best for you to try at home",
        category: "Ingredients",
        href: "https://www.instagram.com/silenth.to/",
        author: "Silent H team",
        dateLabel: "5 days ago",
    },
];

function isExternalHref(href) {
    return /^https?:\/\//i.test(href);
}

function isFullImageUrl(value) {
    return /^https?:\/\//i.test(value);
}

function resolveImageUrl(value) {
    if (!value) return "/placeholder.jpg";

    const cleanValue = String(value).trim();

    if (isFullImageUrl(cleanValue)) {
        return cleanValue;
    }

    const cleanPath = cleanValue.replace(/^\/+/, "");

    const { data } = supabase.storage
        .from(BLOG_IMAGE_BUCKET)
        .getPublicUrl(cleanPath);

    return data?.publicUrl || "/placeholder.jpg";
}

function formatRelativeDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const formatter = new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
    });

    if (Math.abs(diffDays) < 1) return "today";
    if (Math.abs(diffDays) < 30) return formatter.format(diffDays, "day");

    const diffMonths = Math.round(diffDays / 30);
    if (Math.abs(diffMonths) < 12) return formatter.format(diffMonths, "month");

    const diffYears = Math.round(diffMonths / 12);
    return formatter.format(diffYears, "year");
}

function getPostHref(post) {
    if (post.slug) return `/blogs/${post.slug}`;

    return "/blogs";
}

function normalizePost(post) {
    return {
        id: post.id,
        img: resolveImageUrl(post.image_url),
        title: post.title || "Untitled story",
        category: post.category || "Story",
        href: getPostHref(post),
        author: post.author_name || "Silent H team",
        dateLabel:
            post.date_label ||
            formatRelativeDate(post.published_at || post.created_at),
    };
}

function SmartLink({ href, className, children }) {
    if (isExternalHref(href)) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link to={href} className={className}>
            {children}
        </Link>
    );
}

function DesktopBlogCard({ card, index }) {
    return (
        <Reveal
            key={card.id ?? `${card.title}-${index}`}
            delay={index * 0.08}
            className="min-w-0 flex flex-col gap-[1.56vw]"
        >
            <SmartLink
                href={card.href}
                className="group block overflow-hidden rounded-[4px] h-[14.06vw]"
            >
                <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </SmartLink>

            <div className="flex flex-col items-start">
                <div className="h-[6.35vw] overflow-hidden cursor-pointer">
                    <h3
                        title={card.title}
                        className={`${T.h3} text-sh-cream leading-[1.2] hover:text-sh-pink`}
                        style={DESKTOP_TITLE_CLAMP_STYLE}
                    >
                        {card.title}
                    </h3>
                </div>
            </div>
        </Reveal>
    );
}

function MobileBlogCard({ card }) {
    return (
        <SmartLink
            href={card.href}
            className="group flex flex-col gap-3 text-left"
        >
            <div className="overflow-hidden rounded-[4px] aspect-[3/2]">
                <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <h3
                title={card.title}
                className="font-display text-sh-cream text-[18px] leading-[1.2] tracking-[0.05em] min-h-[3.6em]"
                style={MOBILE_TITLE_CLAMP_STYLE}
            >
                {card.title}
            </h3>
        </SmartLink>
    );
}

export default function BlogSection() {
    const [posts, setPosts] = useState(FALLBACK_POSTS);
    const [isLoading, setIsLoading] = useState(true);
    const [desktopStartIndex, setDesktopStartIndex] = useState(0);
    const [mobilePage, setMobilePage] = useState(0);

    const mobileCarouselRef = useRef(null);

    const shouldUseCarousel = posts.length >= BLOG_CAROUSEL_THRESHOLD;

    const maxDesktopStartIndex = shouldUseCarousel
        ? Math.max(posts.length - DESKTOP_VISIBLE_POSTS, 0)
        : 0;

    const desktopVisiblePosts = shouldUseCarousel
        ? posts.slice(
            desktopStartIndex,
            desktopStartIndex + DESKTOP_VISIBLE_POSTS
        )
        : posts.slice(0, DESKTOP_VISIBLE_POSTS);

    const desktopDotCount = maxDesktopStartIndex + 1;

    const mobileTotalPages = Math.ceil(posts.length / MOBILE_VISIBLE_POSTS);

    useEffect(() => {
        let ignore = false;

        async function loadBlogPosts() {
            const { data, error } = await supabase
                .from("blog_posts")
                .select(
                    "id,title,category,image_url,href,slug,author_name,date_label,published_at,created_at,sort_order,status"
                )
                .eq("status", "published")
                .order("sort_order", { ascending: true })
                .order("published_at", { ascending: false });

            if (ignore) return;

            if (error) {
                console.error("[BlogSection] Failed to load blog posts:", error);
                setPosts(FALLBACK_POSTS);
                setIsLoading(false);
                return;
            }

            const nextPosts = (data ?? []).map(normalizePost);

            if (!nextPosts.length) {
                console.warn(
                    "[BlogSection] Supabase returned 0 published posts. Rendering FALLBACK_POSTS."
                );
                setPosts(FALLBACK_POSTS);
            } else {
                console.info(
                    `[BlogSection] Loaded ${nextPosts.length} published posts from Supabase.`
                );
                setPosts(nextPosts);
            }

            setIsLoading(false);
        }

        loadBlogPosts();

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        setDesktopStartIndex((prev) =>
            Math.min(prev, Math.max(posts.length - DESKTOP_VISIBLE_POSTS, 0))
        );

        setMobilePage(0);

        if (mobileCarouselRef.current) {
            mobileCarouselRef.current.scrollTo({
                left: 0,
                behavior: "auto",
            });
        }
    }, [posts.length]);

    const scrollMobileToPage = (pageIndex) => {
        setMobilePage(pageIndex);

        const carousel = mobileCarouselRef.current;
        if (!carousel) return;

        const card = carousel.querySelector("[data-blog-card]");
        if (!card) return;

        const styles = window.getComputedStyle(carousel);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        const cardWidth = card.offsetWidth;

        carousel.scrollTo({
            left: pageIndex * (cardWidth + gap) * MOBILE_VISIBLE_POSTS,
            behavior: "smooth",
        });
    };

    const handleMobileScroll = () => {
        const carousel = mobileCarouselRef.current;
        if (!carousel) return;

        const card = carousel.querySelector("[data-blog-card]");
        if (!card) return;

        const styles = window.getComputedStyle(carousel);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        const cardWidth = card.offsetWidth;

        const rawPage =
            carousel.scrollLeft /
            ((cardWidth + gap) * MOBILE_VISIBLE_POSTS);

        const nextPage = Math.min(
            mobileTotalPages - 1,
            Math.max(0, Math.round(rawPage))
        );

        setMobilePage(nextPage);
    };

    return (
        <section className="relative w-full">
            {/* Desktop */}
            <div className="hidden md:flex w-[89.06vw] mx-auto flex-col items-center gap-[2.5vw]">
                <Reveal className="flex flex-col items-center gap-[2.5vw] w-full">
                    <h2 className={`${T.h1} uppercase text-sh-cream text-center leading-[1] font-bold`}>
                        A blog full of experiences
                    </h2>

                    <p className={`${T.body} text-sh-cream text-center leading-[1.2]`}>
                        A closer look at the flavours, culture, and experiences behind Silent H.
                    </p>
                </Reveal>

                <div className="flex w-full flex-col items-start gap-[1.2vw]">
                    <div
                        className={`grid grid-cols-4 items-start gap-[1.56vw] w-full transition-opacity duration-300 ${
                            isLoading ? "opacity-80" : "opacity-100"
                        }`}
                    >
                        {desktopVisiblePosts.map((card, i) => (
                            <DesktopBlogCard
                                key={card.id ?? `${card.title}-${desktopStartIndex + i}`}
                                card={card}
                                index={i}
                            />
                        ))}
                    </div>

                    {shouldUseCarousel && (
                        <div className="flex flex-row items-center gap-[0.625vw]">
                            {Array.from({ length: desktopDotCount }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Go to blog position ${i + 1}`}
                                    onClick={() => setDesktopStartIndex(i)}
                                    className={`block w-[0.625vw] h-[0.625vw] rounded-full transition-colors ${
                                        i === desktopStartIndex ? "bg-sh-pink" : "bg-[#9a9a9a]"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Link
                    to="/blogs"
                    className={`self-start ${T.button} uppercase text-sh-pink transition-opacity hover:opacity-80`}
                >
                    View all stories
                </Link>
            </div>

            {/* Mobile */}
            <div className="md:hidden w-full max-w-[321px] mx-auto py-12 flex flex-col items-center gap-6">
                <h2 className="font-display font-bold uppercase text-sh-cream text-center leading-[1.05] text-[32px] tracking-[0.05em]">
                    A blog full of experiences
                </h2>

                <p className="font-body text-sh-cream text-center text-[18px] leading-[1.3] tracking-[0.1em]">
                    A closer look at the flavours, culture, and experiences behind Silent H.
                </p>

                {shouldUseCarousel ? (
                    <div className="w-full">
                        <div
                            ref={mobileCarouselRef}
                            onScroll={handleMobileScroll}
                            className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {posts.map((card, i) => (
                                <div
                                    key={card.id ?? `${card.title}-${i}`}
                                    data-blog-card
                                    className="snap-start shrink-0 w-[calc(50%-0.625rem)]"
                                >
                                    <MobileBlogCard card={card} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-row items-center gap-2">
                            {Array.from({ length: mobileTotalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Go to blog page ${i + 1}`}
                                    onClick={() => scrollMobileToPage(i)}
                                    className={`block w-2 h-2 rounded-full transition-colors ${
                                        i === mobilePage ? "bg-sh-pink" : "bg-[#9a9a9a]"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-8 transition-opacity duration-300 ${
                            isLoading ? "opacity-80" : "opacity-100"
                        }`}
                    >
                        {posts.map((card, i) => (
                            <MobileBlogCard
                                key={card.id ?? `${card.title}-${i}`}
                                card={card}
                            />
                        ))}
                    </div>
                )}

                <Link
                    to="/blogs"
                    className="self-start font-body uppercase text-sh-pink text-[16px] tracking-[0.1em]"
                >
                    View all stories
                </Link>
            </div>
        </section>
    );
}