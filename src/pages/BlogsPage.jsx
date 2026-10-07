// src/pages/BlogsPage.jsx
import { Link } from "react-router-dom";

import { nycBlogPosts } from "../data/nycBlogPosts.js";
import SEO from "../components/SEO.jsx";
import { breadcrumb } from "../lib/seoSchema.js";

const FALLBACK_POSTS = nycBlogPosts.map((post) => ({ id: post.id, title: post.title, img: post.image_url, alt: post.title, href: post.href }));

function isExternalHref(href) { return /^https?:\/\//i.test(href); }

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
    const blogPosts = FALLBACK_POSTS;
    const isLoading = false;

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
                    Explore Mexican food, agave cocktails and plans for dining out in NYC.
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
