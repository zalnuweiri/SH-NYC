import { useSyncExternalStore } from "react";

// Matches Tailwind's `md` breakpoint (768px). Lets a page render ONLY the block that matches
// the viewport instead of mounting both and hiding one with CSS. Critical for the Events page:
// it has autoplay <video> elements in BOTH the desktop and mobile blocks, and a hidden
// (display:none) block still decodes its videos — so all four decode at once and, together with
// the Spline dust WebGL, overrun the GPU on some machines (page loads then goes black). Gating to
// one block keeps only two videos live, matching every other page.
const QUERY = "(min-width: 768px)";

export default function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(QUERY);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches, // client snapshot (correct from first paint)
    () => true,                              // SSR/no-window default: desktop
  );
}
