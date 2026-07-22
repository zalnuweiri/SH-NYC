import { Link } from "react-router-dom";

/**
 * "Related guides" — a small internal-linking block for the dark money pages
 * (Menu, Happy Hour, Events, Story). It renders the SAME blog targets that the
 * edge prerender already injects via src/lib/routeContent.js, but as real
 * <Link>s inside the React tree so they PERSIST in the rendered DOM (Google
 * weights rendered-DOM links most, and they double as real navigation for
 * visitors). Additive — it does not touch the prerender links.
 *
 * Basil internal-linking spec, Task 1. Keep it to 1–3 descriptive links; never
 * "read more" / "click here", never a link dump.
 *
 * `links`: [{ to, label }]. Styled cream-on-dark with a gold heading to match
 * the FAQ blocks already on these pages.
 */
export default function RelatedGuides({ links, className = "" }) {
  if (!links || links.length === 0) return null;

  return (
    <section
      aria-label="Related guides"
      className={`mx-auto w-full max-w-[680px] px-[36px] md:px-0 flex flex-col items-center gap-5 text-center ${className}`}
    >
      <h2 className="font-display font-bold uppercase tracking-[0.07em] text-sh-gold text-[24px] md:text-[calc(var(--dw)*1.75/100)]">
        Related guides
      </h2>

      <ul className="flex flex-col items-center gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="font-body text-sh-cream text-[18px] md:text-[calc(var(--dw)*1.25/100)] tracking-[0.08em] underline underline-offset-4 decoration-sh-gold/50 hover:text-sh-gold transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
