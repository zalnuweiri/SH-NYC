import { nycBlogPosts } from "../data/nycBlogPosts.js";
export const TITLES = Object.fromEntries(nycBlogPosts.map((post) => [post.slug, post.title]));
export const RELATED = Object.fromEntries(nycBlogPosts.map((post) => [post.slug, nycBlogPosts.filter((other) => other.slug !== post.slug).slice(0, 3).map((other) => other.slug)]));
export function relatedFor(slug) {
  return (RELATED[slug] || []).map((related) => ({ slug: related, title: TITLES[related] }));
}
