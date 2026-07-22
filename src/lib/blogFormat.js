// src/lib/blogFormat.js
//
// THE SINGLE SOURCE OF TRUTH for how a blog post's plain-text `body_text`
// becomes a document. Extracted from BlogContent.jsx so that everything which
// needs to understand the rules imports the SAME code:
//
//   1. src/pages/BlogContent.jsx      — renders the article in the browser
//   2. functions/blogs/[slug].js      — renders it at the edge for crawlers
//   3. silenth-admin (separate repo)  — previews it while authoring
//
// (3) still keeps its own copy because it is a different repository; its
// scripts/verify-mirror.mjs diffs itself against THIS file, so drift is caught.
// Do not fork these rules again — change them here.
//
// WHY THE RULES LOOK LIKE THIS: `body_text` in Supabase is plain text, not
// Markdown or HTML. Structure is inferred from punctuation and word count, so a
// trailing full stop is the difference between a heading and a paragraph.

/** Body text is split into blocks on blank lines. */
export function splitBodyText(bodyText) {
  return String(bodyText || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/**
 * Classify a plain-text block as a heading or paragraph.
 * Convention (kept consistent across all posts): section headings are
 * short lines with no sentence-ending punctuation; FAQ questions end
 * with a question mark; everything else is a paragraph.
 */
export function classifyBlock(text) {
  const value = String(text || "").trim();
  const wordCount = value.split(/\s+/).length;

  if (/[.!:]$/.test(value)) return "p";
  if (/\?$/.test(value) && wordCount <= 14) return "h3";
  if (wordCount > 0 && wordCount <= 12) return "h2";
  return "p";
}

/**
 * Pull FAQ question/answer pairs from the "Frequently Asked Questions"
 * section so we can emit FAQPage structured data per post.
 */
export function extractFaq(paragraphs) {
  const startIndex = paragraphs.findIndex((paragraph) =>
    /^frequently asked questions$/i.test(String(paragraph).trim())
  );
  if (startIndex === -1) return [];

  const items = [];
  for (let i = startIndex + 1; i < paragraphs.length; i += 1) {
    const question = String(paragraphs[i]).trim();
    if (/\?$/.test(question) && i + 1 < paragraphs.length) {
      items.push({ question, answer: String(paragraphs[i + 1]).trim() });
      i += 1;
    }
  }
  return items;
}

/** Unique meta description per post, derived from its own opening paragraph. */
export function buildDescription(paragraphs) {
  const first = String(paragraphs[0] || "").replace(/\s+/g, " ").trim();
  if (!first) {
    return "Modern Mexican restaurant and agave bar in NYC's Meatpacking District.";
  }
  if (first.length <= 160) return first;
  const cut = first.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
}

/** Inline auto-links: first occurrence of each phrase becomes a link. */
export const INTERNAL_LINKS = [
  { re: /Aitch/, to: "/aitch" },
  { re: /happy hour/i, to: "/happy-hour" },
  { re: /events team|events calendar|events/i, to: "/events" },
  { re: /book a table|reservations?|reserve a table/i, to: "/reservations" },
  { re: /dinner menu|food menu|full menu|our menu|the menu/i, to: "/menu" },
  { re: /our story|the story/i, to: "/story" },
  { re: /Silent H/, to: "/" },
];

export function buildLinkPlan(paragraphs) {
  const plan = {};
  const used = new Set();
  paragraphs.forEach((para, idx) => {
    if (classifyBlock(para) !== "p") return;
    INTERNAL_LINKS.forEach((entry, ei) => {
      if (used.has(ei)) return;
      const match = para.match(entry.re);
      if (match && typeof match.index === "number") {
        used.add(ei);
        (plan[idx] = plan[idx] || []).push({
          start: match.index,
          end: match.index + match[0].length,
          to: entry.to,
        });
      }
    });
    if (plan[idx]) plan[idx].sort((a, b) => a.start - b.start);
  });
  return plan;
}

/**
 * Resolve a stored image value to a public URL WITHOUT the supabase-js client.
 * Rows store a bare filename ("blog-mezcal.webp"); the browser normally resolves
 * it via storage.getPublicUrl(). The edge function has no client, so it needs
 * this dependency-free equivalent — the public-object URL shape is stable.
 */
export function resolveImageUrl(value, supabaseUrl, bucket = "blog-images") {
  if (!value) return "";
  const clean = String(value).trim();
  if (/^https?:\/\//i.test(clean)) return clean;
  const path = clean.replace(/^\/+/, "").replace(/^.*\/blog-images\//, "");
  return `${String(supabaseUrl).replace(/\/+$/, "")}/storage/v1/object/public/${bucket}/${path}`;
}
