// src/lib/relatedPosts.js
//
// Topical related-post map for the blog, in ONE place. Imported by BOTH:
//   • functions/blogs/[slug].js  — the edge/SSR "Related reading" list a non-JS
//     crawler sees (injected into #root, discarded by React on mount)
//   • src/pages/BlogContent.jsx  — the React "Related reading" list that PERSISTS
//     in the rendered DOM (what Google's JS-rendering pass and real users see)
//
// Sharing one map is the point of Basil's internal-linking spec (Task 3): the
// crawler HTML and the hydrated DOM must link to the same posts. Editing the map
// here updates both layers at once — no verbatim copy to keep in sync.

export const RELATED = {
  "date-night-restaurants-toronto": ["best-mexican-restaurant-toronto", "what-is-a-speakeasy", "mezcal-cocktails-to-try"],
  "happy-hour-downtown-toronto": ["taco-tuesday-toronto", "the-ultimate-margarita-guide", "best-mexican-restaurant-toronto"],
  "best-mexican-restaurant-toronto": ["date-night-restaurants-toronto", "taco-tuesday-toronto", "happy-hour-downtown-toronto"],
  "private-dining-toronto": ["date-night-restaurants-toronto", "best-mexican-restaurant-toronto", "happy-hour-downtown-toronto"],
  "mezcal-vs-tequila": ["mezcal-cocktails-to-try", "the-ultimate-margarita-guide", "what-is-a-speakeasy"],
  "the-ultimate-margarita-guide": ["mezcal-vs-tequila", "mezcal-cocktails-to-try", "happy-hour-downtown-toronto"],
  "what-is-a-speakeasy": ["mezcal-vs-tequila", "mezcal-cocktails-to-try", "date-night-restaurants-toronto"],
  "taco-tuesday-toronto": ["happy-hour-downtown-toronto", "best-mexican-restaurant-toronto", "the-ultimate-margarita-guide"],
  "mezcal-cocktails-to-try": ["mezcal-vs-tequila", "the-ultimate-margarita-guide", "what-is-a-speakeasy"],
};

export const TITLES = {
  "date-night-restaurants-toronto": "Date Night Restaurants in Toronto",
  "happy-hour-downtown-toronto": "Happy Hour in Downtown Toronto",
  "best-mexican-restaurant-toronto": "Best Mexican Restaurant in Toronto",
  "private-dining-toronto": "Private Dining in Toronto",
  "mezcal-vs-tequila": "Mezcal vs Tequila",
  "the-ultimate-margarita-guide": "The Ultimate Margarita Guide",
  "what-is-a-speakeasy": "What Is a Speakeasy?",
  "taco-tuesday-toronto": "Taco Tuesday in Toronto",
  "mezcal-cocktails-to-try": "Mezcal Cocktails to Try",
};

/** Related posts for a slug as [{ slug, title }] — the shape both renderers want.
 *  Unknown slug → []. */
export function relatedFor(slug) {
  return (RELATED[slug] || []).map((s) => ({ slug: s, title: TITLES[s] || s }));
}
