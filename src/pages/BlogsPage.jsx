// src/pages/BlogsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";

const BLOG_IMAGE_BUCKET = "blog-images";

const FALLBACK_POSTS = [
    {
        id: "fallback-1",
        img: "/redesign/fig-blog-1.png",
        alt: "Date night at Silent H",
        title: "Date Night Restaurants in Toronto that Let You Worry About the Connection and Not the Experience",
        href: "/blogs",
    },
    {
        id: "fallback-2",
        img: "/redesign/fig-blog-2.png",
        alt: "Happy hour drinks and food",
        title: "Happy Hour in Downtown Toronto: Where to Go After Work",
        href: "/blogs",
    },
    {
        id: "fallback-3",
        img: "/redesign/fig-blog-3.png",
        alt: "Silent H restaurant interior",
        title: "Why Silent H Is the Best Mexican Restaurant in Toronto",
        href: "/blogs",
    },
    {
        id: "fallback-4",
        img: "/redesign/fig-blog-4.png",
        alt: "Private dining room at Silent H",
        title: "Private Dining in Toronto: Where to Host Your Next Event",
        href: "/blogs",
    },
];

function isFullUrl(value) {
    return /^https?:\/\//i.test(value);
}

function isExternalHref(href) {
    return /^https?:\/\//i.test(href);
}

function resolveImageUrl(value) {
    if (!value) return "/placeholder.jpg";

    const cleanValue = String(value).trim();

    // Full correct Supabase/public URL.
    if (isFullUrl(cleanValue) && !cleanValue.includes("YOUR_PROJECT_ID")) {
        return cleanValue;
    }

    // Filename or storage path, e.g. "fig-blog-1.jpg" or "folder/fig-blog-1.jpg".
    const cleanPath = cleanValue
        .replace(/^\/+/, "")
        .replace(/^.*\/blog-images\//, "");

    const { data } = supabase.storage
        .from(BLOG_IMAGE_BUCKET)
        .getPublicUrl(cleanPath);

    return data?.publicUrl || "/placeholder.jpg";
}

function getPostHref(post) {
    if (post.href) return post.href;
    if (post.slug) return `/blogs/${post.slug}`;

    return "/blogs";
}

function normalizePost(post) {
    return {
        id: post.id,
        img: resolveImageUrl(post.image_url),
        alt: post.alt_text || post.title || "Silent H blog post",
        title: post.title || "Untitled story",
        href: getPostHref(post),
    };
}

function CardWrapper({ href, children }) {
    if (isExternalHref(href)) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return <Link to={href}>{children}</Link>;
}

function BlogCard({ img, alt, title, href }) {
    return (
        <CardWrapper href={href}>
            <div className="flex flex-col gap-8 cursor-pointer group">
                <div className="relative overflow-hidden rounded-[4px] aspect-square">
                    <img
                        src={img}
                        alt={alt}
                        loading="lazy"
                        width="600"
                        height="600"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <p
                    className="leading-[1.2] text-[#0b0b0b] text-[22px] tracking-[3.3px]"
                    style={{
                        fontFamily: "'Monoglyphic', sans-serif",
                        fontStyle: "normal",
                    }}
                >
                    {title}
                </p>
            </div>
        </CardWrapper>
    );
}

export default function BlogsPage() {
    const [blogPosts, setBlogPosts] = useState(FALLBACK_POSTS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        async function loadBlogPosts() {
            const { data, error } = await supabase
                .from("blog_posts")
                .select(
                    "id,title,image_url,href,slug,published_at,created_at,sort_order,status"
                )
                .eq("status", "published")
                .order("sort_order", { ascending: true })
                .order("published_at", { ascending: false });

            if (ignore) return;

            if (error) {
                console.error("[BlogsPage] Failed to load blog posts:", error);
                setBlogPosts(FALLBACK_POSTS);
                setIsLoading(false);
                return;
            }

            const nextPosts = (data ?? []).map(normalizePost);

            setBlogPosts(nextPosts.length ? nextPosts : FALLBACK_POSTS);
            setIsLoading(false);
        }

        loadBlogPosts();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
        <SEO
            title="Silent H Blog | Mexican Food & Cocktails in NYC"
            description="The Silent H blog: guides to Mexican food, tacos, tequila and mezcal, cocktails, happy hour and dining out in NYC."
            url="https://www.silenthnyc.com/blogs"
            jsonLd={breadcrumb("Blog", "https://www.silenthnyc.com/blogs")}
        />

        <div className="pt-20 bg-[#ece1d4] min-h-screen w-full">


            <header className="w-full flex flex-col items-center gap-8 pt-[100px] pb-16 px-6 text-center">
                <h1
                    className="text-[#0b0b0b] text-[clamp(28px,3.5vw,40px)] tracking-[4px] uppercase leading-none"
                    style={{
                        fontFamily: "'Monoglyphic', sans-serif",
                        fontWeight: 700,
                    }}
                >
                    A blog full of experiences
                </h1>

                <p
                    className="text-[#0b0b0b] text-[clamp(16px,1.8vw,22px)] tracking-[2.2px] leading-[1.2] max-w-2xl"
                    style={{
                        fontFamily: "'NeueBit', sans-serif",
                        fontWeight: 400,
                    }}
                >
                    A closer look at the flavours, culture, and experiences behind Silent H.
                </p>
            </header>

            <main className="max-w-[1140px] mx-auto px-6 pb-24">
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 transition-opacity duration-300 ${
                        isLoading ? "opacity-80" : "opacity-100"
                    }`}
                >
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id ?? post.title} {...post} />
                    ))}
                </div>
            </main>

        </div>
        </>
    );
}
