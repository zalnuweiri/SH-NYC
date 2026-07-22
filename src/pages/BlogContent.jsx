// src/pages/BlogContent.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import SEO from "../components/SEO.jsx";
import { breadcrumb, blogPosting, faqPage } from "../lib/seoSchema.js";
// The text rules live in ONE place now — shared with functions/blogs/[slug].js,
// the edge renderer, so the crawler's HTML and the browser's DOM cannot diverge.
import {
  splitBodyText,
  classifyBlock,
  extractFaq,
  buildDescription,
  buildLinkPlan,
} from "../lib/blogFormat.js";
// Same related-post map the edge renderer (functions/blogs/[slug].js) uses, so
// the "Related reading" links here match the crawler's HTML exactly (Task 3).
import { relatedFor } from "../lib/relatedPosts.js";

const BLOG_IMAGE_BUCKET = "blog-images";

// Curated links shown at the foot of every article for internal linking.
const RELATED_LINKS = [
  { to: "/menu", label: "The menu" },
  { to: "/happy-hour", label: "Happy hour, every day 5 to 7" },
  { to: "/aitch", label: "Aitch, our agave lounge" },
  { to: "/events", label: "Private events and bookings" },
  { to: "/story", label: "Our story" },
  { to: "/reservations", label: "Book a table" },
];

function BackArrow() {
  return (
    <svg className="shrink-0 size-[24px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M15 18L9 12L15 6"
        stroke="#EB4660"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function isFullImageUrl(value) {
  return /^https?:\/\//i.test(value);
}

function resolveImageUrl(value) {
  if (!value) return "/placeholder.jpg";

  const cleanValue = String(value).trim();

  if (isFullImageUrl(cleanValue)) return cleanValue;

  const cleanPath = cleanValue.replace(/^\/+/, "");

  const { data } = supabase.storage
    .from(BLOG_IMAGE_BUCKET)
    .getPublicUrl(cleanPath);

  return data?.publicUrl || "/placeholder.jpg";
}

function renderParagraph(text, ranges) {
  if (!ranges || ranges.length === 0) return text;
  const nodes = [];
  let cursor = 0;
  ranges.forEach((range, i) => {
    if (range.start < cursor) return;
    if (range.start > cursor) nodes.push(text.slice(cursor, range.start));
    nodes.push(
      <Link
        key={"lnk-" + i}
        to={range.to}
        className="text-[#eb4660] underline underline-offset-2"
      >
        {text.slice(range.start, range.end)}
      </Link>
    );
    cursor = range.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export default function BlogContent() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadArticle() {
      setIsLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          slug,
          status,
          author_name,
          published_at,
          updated_at,
          blog_post_content (
            title,
            image_url,
            body_text
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (ignore) return;

      if (error) {
        console.error("[BlogContent] Failed to load article:", error);
        setErrorMessage("We couldn't load this article.");
        setArticle(null);
        setIsLoading(false);
        return;
      }

      if (!data || !data.blog_post_content) {
        setErrorMessage("Article not found.");
        setArticle(null);
        setIsLoading(false);
        return;
      }

      setArticle({
        id: data.id,
        slug: data.slug,
        title: data.blog_post_content.title || data.title,
        imageUrl: resolveImageUrl(data.blog_post_content.image_url),
        bodyText: data.blog_post_content.body_text,
        authorName: data.author_name,
        publishedAt: data.published_at,
        updatedAt: data.updated_at,
      });

      setIsLoading(false);
    }

    loadArticle();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const paragraphs = useMemo(
    () => splitBodyText(article?.bodyText),
    [article?.bodyText]
  );

  const linkPlan = useMemo(() => buildLinkPlan(paragraphs), [paragraphs]);

  const canonicalUrl = article?.slug
    ? `https://www.silenthnyc.com/blogs/${article.slug}`
    : `https://www.silenthnyc.com/blogs/${slug}`;

  const seoTitle = article?.title
    ? (article.title.length <= 48 ? `${article.title} | Silent H` : article.title)
    : "Silent H Blog";

  const seoDescription = useMemo(() => {
    if (!article) return "Read the latest stories from Silent H NYC.";
    return buildDescription(paragraphs);
  }, [article, paragraphs]);

  const jsonLd = useMemo(() => {
    const nodes = [breadcrumb(article?.title || "Blog", canonicalUrl)];

    if (article) {
      nodes.push(
        blogPosting({
          title: article.title,
          description: seoDescription,
          url: canonicalUrl,
          image: article.imageUrl,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: article.authorName,
        })
      );

      const faq = faqPage(extractFaq(paragraphs));
      if (faq) nodes.push(faq);
    }

    return nodes;
  }, [article, canonicalUrl, seoDescription, paragraphs]);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={canonicalUrl}
        jsonLd={jsonLd}
      />
      <div className="bg-[#ece1d4] min-h-screen w-full text-[#0b0b0b]">

        <main className="w-full px-6 pt-[100px] pb-32">
          <div className="mx-auto w-full max-w-[946px]">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-3 mb-10 group"
            >
              <BackArrow/>

              <span
                className="text-[#eb4660] text-[16px] tracking-[1.6px] uppercase leading-none"
                style={{
                  fontFamily: "'NeueBit', sans-serif",
                  fontWeight: 700,
                }}
              >
                Back to articles
              </span>
            </Link>

            {isLoading && (
              <p
                className="text-[22px] tracking-[2.2px] leading-[1.2]"
                style={{
                  fontFamily: "'NeueBit', sans-serif",
                  fontWeight: 400,
                }}
              >
                Loading article...
              </p>
            )}

            {!isLoading && errorMessage && (
              <div>
                <h1
                  className="text-[28px] tracking-[0.56px] leading-[1.2]"
                  style={{
                    fontFamily: "'Monoglyphic', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {errorMessage}
                </h1>

                <Link
                  to="/blogs"
                  className="mt-8 inline-flex text-[#eb4660] text-[16px] tracking-[1.6px] uppercase"
                  style={{
                    fontFamily: "'NeueBit', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Return to articles
                </Link>
              </div>
            )}

            {!isLoading && article && (
              <>
                <div className="flex flex-col gap-8 mb-10 w-full">
                  <p
                    className="text-[22px] tracking-[2.2px] leading-[1.2] uppercase"
                    style={{
                      fontFamily: "'NeueBit', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    A blog full of experiences
                  </p>

                  <h1
                    className="text-[28px] tracking-[0.56px] leading-[1.2]"
                    style={{
                      fontFamily: "'Monoglyphic', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {article.title}
                  </h1>
                </div>

                <div className="w-full mb-12 rounded-[4px] overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-[clamp(280px,46.875vw,600px)] object-cover"
                  />
                </div>

                <article
                  className="w-full text-[22px] tracking-[2.2px] leading-[1.2] flex flex-col gap-[1em]"
                  style={{
                    fontFamily: "'NeueBit', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {paragraphs.map((paragraph, index) => {
                    const blockType = classifyBlock(paragraph);
                    const key = `${paragraph.slice(0, 24)}-${index}`;

                    if (blockType === "h2") {
                      return (
                        <h2
                          key={key}
                          className="text-[26px] tracking-[0.52px] leading-[1.2] mt-6"
                          style={{
                            fontFamily: "'Monoglyphic', sans-serif",
                            fontWeight: 400,
                        }}
                        >
                         {paragraph}
                      </h2>
                    );
                    }

                    if (blockType === "h3") {
                      return (
                        <h3
                          key={key}
                          className="text-[22px] tracking-[2.2px] leading-[1.2] mt-2"
                          style={{
                            fontFamily: "'NeueBit', sans-serif",
                            fontWeight: 700,
                        }}
                        >
                         {paragraph}
                      </h3>
                    );
                    }

                    return (
                      <p key={key}>
                        {renderParagraph(paragraph, linkPlan[index])}
                      </p>
                    );
                  })}
                </article>

                {/* Related reading — mirrors the edge renderer's relatedHtml()
                    (functions/blogs/[slug].js) using the shared relatedPosts map,
                    so these post-to-post links persist in the rendered DOM, not
                    just the crawler's pre-JS HTML (Basil spec, Task 3). */}
                {relatedFor(article.slug).length > 0 && (
                  <section
                    className="mt-14 flex flex-col gap-4"
                    aria-label="Related reading"
                  >
                    <h2
                      className="text-[24px] tracking-[0.48px] leading-[1.2]"
                      style={{
                        fontFamily: "'Monoglyphic', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Related reading
                    </h2>

                    <ul className="flex flex-col gap-3">
                      {relatedFor(article.slug).map((related) => (
                        <li key={related.slug}>
                          <Link
                            to={`/blogs/${related.slug}`}
                            className="text-[#eb4660] text-[20px] tracking-[2px] leading-[1.2] underline underline-offset-2 w-fit"
                            style={{
                              fontFamily: "'NeueBit', sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            {related.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <nav
                  className="mt-14 pt-8 border-t border-[#0b0b0b]/20 flex flex-col gap-4"
                  aria-label="Explore Silent H"
                >
                  <p
                    className="text-[16px] tracking-[1.6px] uppercase leading-none text-[#0b0b0b]/70"
                    style={{
                      fontFamily: "'NeueBit', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Explore Silent H
                  </p>

                  <div className="flex flex-col gap-3">
                    {RELATED_LINKS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="text-[#eb4660] text-[20px] tracking-[2px] leading-[1.2] underline underline-offset-2 w-fit"
                        style={{
                          fontFamily: "'NeueBit', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </>
            )}
          </div>
        </main>

      </div>
    </>
  );
}
