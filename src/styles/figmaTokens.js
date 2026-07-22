// ─────────────────────────────────────────────────────────────────────────────
// Figma design tokens — single source of truth for the desktop type scale.
//
// WHY THIS FILE EXISTS
//   The desktop layouts (Home / Footer / Navbar) repeat the same handful of Figma
//   text styles dozens of times. Before, each use hand-wrote the font + size +
//   letter-spacing, which drifted (e.g. 1.72vw vs 1.71875vw for the same 22px,
//   1.09vw vs 1.1vw for the same 14px). These constants centralise them so a style
//   is defined ONCE and referenced everywhere.
//
// HOW THE SCALE WORKS
//   The desktop design is full-bleed at the 1280px Figma frame, so 1 design px =
//   1/12.8 vw. Sizes are wrapped in round(…,1px) so the pixel fonts (NeueBit /
//   Monoglyphic) land on whole pixels and stay crisp. Letter-spacing is an `em`
//   (a % of font size — exactly how Figma stores it).
//
//   px → vw : 60→4.6875 · 40→3.125 · 28→2.1875 · 22→1.71875 · 16→1.25 · 14→1.09375
//
// WHAT A TOKEN CONTAINS
//   ONLY the invariant Figma metrics: font-family + size + letter-spacing.
//   Colour, leading, alignment, case (uppercase) and width stay at the call site,
//   because those legitimately vary per placement. So a heading reads e.g.
//     className={`${T.h1} uppercase text-sh-cream text-center leading-[1]`}
//
// NOTE FOR EDITORS: these strings must stay LITERAL (no template interpolation) —
//   Tailwind only generates a class if it can see the full string in source.
// ─────────────────────────────────────────────────────────────────────────────

/** Desktop text styles (font-family + size + tracking). Maps 1:1 to Figma styles. */
export const T = {
  hero:     "font-display text-[round(calc(var(--dw)*4.6875/100),1px)] tracking-[0.1em]",  // Desktop/Hero — Monoglyphic 60
  h1:       "font-display text-[round(calc(var(--dw)*3.125/100),1px)] tracking-[0.1em]",   // Desktop/H1   — Monoglyphic 40 (caller adds uppercase)
  h2:       "font-display text-[round(calc(var(--dw)*2.1875/100),1px)] tracking-[0.02em]", // Desktop/H2   — Monoglyphic 28
  h3:       "font-display text-[round(calc(var(--dw)*1.71875/100),1px)] tracking-[0.15em]",// Desktop/H3   — Monoglyphic 22
  subtitle: "font-body text-[round(calc(var(--dw)*1.71875/100),1px)] tracking-[0.2em]",    // Desktop/Subtitle — NeueBit 22, ls 20%
  body:     "font-body text-[round(calc(var(--dw)*1.71875/100),1px)] tracking-[0.1em]",    // Desktop/Body — NeueBit 22, ls 10%
  caption:  "font-body text-[round(calc(var(--dw)*1.25/100),1px)] tracking-[0.2em]",       // Caption 1 — NeueBit 16, ls 20% (caller adds uppercase)
  button:   "font-body text-[round(calc(var(--dw)*1.25/100),1px)] tracking-[0.1em]",       // Button   — NeueBit 16, ls 10% (caller adds uppercase)
  caption2: "font-body text-[round(calc(var(--dw)*1.09375/100),1px)] tracking-[0.2em]",    // Caption 2 — NeueBit 14, ls 20%
};

/**
 * Mobile text styles — extracted from the Figma MOBILE frame (Home 6107:1011, 393px wide),
 * NOT scaled from desktop. Resolved via the linked text style (the node's own fontName/size
 * is a stale cache; see memory silenth-style-override-resolution). Sizes are absolute px
 * (the mobile design defines them in px), letter-spacing is em (% of size, as Figma stores).
 *   Mobile/H2       4014:1700  Monoglyphic Bold 24  ls 5%   lh 1.2   (PD heading, quote L1)
 *   Mobile/Subtitle 4014:1698  NeueBit    Bold 26  ls 20%  lh 1.0   (quote L2, blog author)
 *   Mobile/Body     4014:1697  NeueBit    Bold 18  ls 10%  lh 1.2   (PD body, chef line)
 * Colour / leading / case / alignment / width stay at the call site (they vary per placement).
 */
export const M = {
  h2:       "font-display font-bold text-[24px] tracking-[0.05em]", // Mobile/H2 (Monoglyphic Bold)
  subtitle: "font-body text-[26px] tracking-[0.2em]",               // Mobile/Subtitle (NeueBit — Bold style falls back to Regular)
  body:     "font-body text-[18px] tracking-[0.1em]",               // Mobile/Body (NeueBit — Bold style falls back to Regular; matches desktop T.body)
};

/** Shared hover transition for colour swaps (matches Figma's SPRING_PRESET_THREE dissolve). */
export const EASE = "transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Outlined "Secondary" button base — cream border + 16px uppercase label. On hover the
 * label AND the outline fade cream→pink together (matches the ghost <Button> variant, so
 * every outline button across the site behaves identically). Fill stays transparent.
 * Width/height are added per use (e.g. "w-[calc(var(--dw)*16.875/100)] h-[calc(var(--dw)*3.75/100)]").
 */
export const BTN_OUTLINE =
  `inline-flex items-center justify-center rounded-[4px] border border-sh-cream ` +
  `font-body uppercase text-sh-cream text-[round(calc(var(--dw)*1.25/100),1px)] tracking-[calc(var(--dw)*0.13/100)] ` +
  `${EASE} hover:text-sh-pink hover:border-sh-pink`;
