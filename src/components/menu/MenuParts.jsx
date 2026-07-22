/**
 * Menu building blocks — pixel-faithful to Figma frames:
 *   Desktop Food  8153:1360 · Desktop Drinks 8153:1886
 *   Mobile  Food  4272:3238 · Mobile  Bar    8794:1105
 *
 * Verified type system (design px @1280 desktop / @393 mobile):
 *   DESKTOP                                   MOBILE
 *   header  Monoglyphic Bold 40 UPPER ls.07   Monoglyphic Bold 24 UPPER ls.05
 *   name    Mondwest   Bold 28  ls.07         Mondwest Bold 20 (hero 24) ls.07/.10
 *   desc    NeueBit    Bold 18  ls.10         NeueBit  Bold 18 ls.10
 *   label   NeueBit    Bold 16  UPPER ls.20   NeueBit  Bold 16 UPPER ls.20
 *   price   Monoglyphic Reg 22  ls.07         NeueBit  Bold 20 ls.20
 *   ozlabel NeueBit    Bold 16  UPPER ls.20   NeueBit  Bold 14 UPPER ls.20
 * All text #ece1d4 (sh-cream); dividers desktop #0b0b0b (sh-ink) / mobile #ece1d4; gold only on active tab.
 */
import { useLayoutEffect, useRef } from "react";
import { Camera } from "lucide-react";
import ResponsiveImg from "../ResponsiveImg";

/* ── DESKTOP type classes (vw-scaled, round() keeps pixel-fonts crisp) ── */
export const D = {
  header:      "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(calc(var(--dw)*3.125/100),1px)] text-sh-cream",
  headerGhost: "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(calc(var(--dw)*3.125/100),1px)] text-sh-ink",
  name:        "font-mondwest font-bold leading-[1.2] tracking-[0.07em] text-[round(calc(var(--dw)*2.1875/100),1px)] text-sh-cream",
  desc:        "font-body font-bold leading-[1.2] tracking-[0.10em] text-[round(calc(var(--dw)*1.40625/100),1px)] text-sh-cream",
  label:       "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[round(calc(var(--dw)*1.25/100),1px)] text-sh-cream",
  labelGhost:  "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[round(calc(var(--dw)*1.25/100),1px)] text-sh-ink",
  price:       "font-display font-normal leading-none tracking-[0.07em] text-[round(calc(var(--dw)*1.71875/100),1px)] text-sh-cream",
};

/* ── MOBILE type classes (fixed px) ── */
export const M = {
  header: "font-display font-bold uppercase leading-[1.2] tracking-[0.05em] text-[24px] text-sh-cream",
  name:   "font-mondwest font-bold leading-[1.2] tracking-[0.07em] text-[20px] text-sh-cream",
  nameHero: "font-mondwest font-bold leading-[1.2] tracking-[0.10em] text-[24px] text-sh-cream",
  desc:   "font-body font-bold leading-[1.2] tracking-[0.10em] text-[18px] text-sh-cream",
  label:  "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[16px] text-sh-cream",
  price:  "font-body font-bold leading-none tracking-[0.20em] text-[20px] text-sh-cream",
  ozlabel:"font-body font-bold uppercase leading-none tracking-[0.20em] text-[14px] text-sh-cream",
};

/* Per-item camera toggle (Figma "PhotoOnOff" 24×24). Cream when the item's
   inline image is shown, grey when it is hidden. */
export function PhotoToggle({ shown, onToggle, size = "w-[calc(var(--dw)*1.875/100)] h-[calc(var(--dw)*1.875/100)] min-w-[18px] min-h-[18px]" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide picture" : "Show picture"}
      aria-pressed={shown}
      className={`shrink-0 transition-colors hover:text-sh-pink ${shown ? "text-sh-cream" : "text-sh-grey-500"}`}
    >
      <Camera className={size} strokeWidth={2} />
    </button>
  );
}

/* ===================== DESKTOP ===================== */

/* One desktop list row (standard or regional cocktail). featured → 269² thumb on the left + 560 text right.
   Regional with a left photo (featured) puts the MAP ABOVE the name (Figma); list regionals = name above map. */
export function RowDesktop({ item, regional, showThumb, shown, onToggle }) {
  const nameEl = <h3 className={D.name}>{item.name}</h3>;
  const mapEl = regional && item.regionImage && (
    // asset is dark line-art on transparent → invert + dim to render the map as muted grey (as in Figma ~rgb120)
    <img
      key="map"
      src={`/${item.regionImage}`}
      alt={`${item.region || ""} region`}
      loading="lazy"
      className="w-[calc(var(--dw)*9.453/100)] h-[calc(var(--dw)*6.484/100)] object-contain object-left invert opacity-[0.44]"
    />
  );
  const mapFirst = regional && showThumb; // featured regional: map above name
  const text = (
    <div className="flex flex-col gap-[calc(var(--dw)*1.875/100)]">
      {mapFirst ? mapEl : nameEl}
      {mapFirst ? nameEl : mapEl}
      {regional && item.region && <span className={D.label}>{item.region}</span>}
      {item.description && <p className={D.desc}>{item.description}</p>}
      {item.subtext && <span className={D.label}>{item.subtext}</span>}
      {item.info && <span className={D.label}>{item.info}</span>}
      <div className="flex items-end justify-between">
        <span className={D.price}>{item.price}</span>
        <PhotoToggle shown={shown} onToggle={onToggle} />
      </div>
    </div>
  );

  if (showThumb && item.image) {
    return (
      <div className="flex items-start justify-between">
        {/* 21.016% of var(--dw) (capped at 1280) ⇒ flatlines at 269px above a
            1280px viewport, unlike MenuCarousel's raw-vw cards. */}
        <ResponsiveImg
          src={item.image}
          alt={item.name}
          sizes="(min-width: 1280px) 269px, 21vw"
          className="w-[calc(var(--dw)*21.016/100)] h-[calc(var(--dw)*21.016/100)] shrink-0 rounded-[4px] object-cover"
        />
        <div className="w-[calc(var(--dw)*43.75/100)]">{text}</div>
      </div>
    );
  }
  return <div className="w-full">{text}</div>;
}

/* Desktop wine / cafe grid cell: name, varietal, then 5oz/8oz/BTL price columns. */
export function WineCellDesktop({ item, showLabels }) {
  const cols = [
    [item.price, "5oz"],
    [item.price8oz, "8oz"],
    [item.btl, "BTL"],
  ].filter(([v]) => v != null);
  return (
    <div className="flex flex-col gap-[calc(var(--dw)*1.25/100)]">
      <h3 className={D.name}>{item.name}</h3>
      {item.description && <p className={D.desc}>{item.description}</p>}
      <div className="flex gap-[calc(var(--dw)*1.875/100)]">
        {cols.map(([v, lbl]) => (
          <div key={lbl} className="flex flex-col gap-[calc(var(--dw)*0.625/100)]">
            <span className={D.price}>{v}</span>
            {showLabels && <span className={D.label}>{lbl}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== MOBILE ===================== */

// Mobile uses the same per-item show/hide state as desktop, but a shown image is
// full-width. Hidden means no large image and no thumbnail.
export function RowMobile({ item, regional, hero, showThumb, onToggle }) {
  const src = item.image;
  const rowRef = useRef(null);
  const prevShown = useRef(showThumb);

  // iOS/Safari repaint fix. When the inline image is HIDDEN, React unmounts it and
  // the row's layout height collapses correctly (verified) — but Safari can fail
  // to reflow+repaint the region, leaving a ghost of the removed image and a black
  // gap until the next scroll recomposites it. Forcing a synchronous display
  // off→on on just this row flushes layout and repaints it, reclaiming the space
  // immediately. Runs before paint (useLayoutEffect) so no ghost is ever shown.
  // Mobile-only by construction: RowMobile renders solely inside the md:hidden
  // menu column, and offsetParent === null on desktop (that column is display:none)
  // makes this a no-op there.
  useLayoutEffect(() => {
    const el = rowRef.current;
    if (prevShown.current && !showThumb && el && el.offsetParent !== null) {
      el.style.display = "none";
      void el.offsetHeight; // flush layout with the image gone
      el.style.display = "";
    }
    prevShown.current = showThumb;
  }, [showThumb]);

  return (
    <div ref={rowRef} className="flex flex-col gap-4">
      {showThumb && src && (
        // Mobile-only tree, max-w-321px container ⇒ fixed 321px regardless of viewport.
        <ResponsiveImg
          src={src}
          alt={item.name}
          sizes="321px"
          className={`w-full object-cover ${regional ? "aspect-[321/362]" : "aspect-[321/410]"}`}
        />
      )}
      {regional ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-3 min-w-0">
            <h3 className={M.name}>{item.name}</h3>
            {item.region && <span className={M.label}>{item.region}</span>}
          </div>
        </div>
      ) : (
        <h3 className={hero ? M.nameHero : M.name}>{item.name}</h3>
      )}
      {item.description && <p className={M.desc}>{item.description}</p>}
      {item.subtext && <span className={M.label}>{item.subtext}</span>}
      {item.info && <span className={M.label}>{item.info}</span>}
      <div className="flex items-center justify-between">
        <span className={M.price}>{item.price}</span>
        {src && (
          <PhotoToggle
            shown={showThumb}
            onToggle={onToggle}
            size="w-6 h-6"
          />
        )}
      </div>
    </div>
  );
}

export function WineRowMobile({ item, showLabels }) {
  const cols = [
    [item.price, "5oz"],
    [item.price8oz, "8oz"],
    [item.btl, "BTL"],
  ].filter(([v]) => v != null);
  return (
    <div className="flex flex-col gap-4">
      <h3 className={M.name}>{item.name}</h3>
      {item.description && <p className={M.desc}>{item.description}</p>}
      <div className="flex gap-4">
        {cols.map(([v, lbl]) => (
          <div key={lbl} className="flex flex-col gap-2">
            <span className={M.price}>{v}</span>
            {showLabels && <span className={M.ozlabel}>{lbl}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
