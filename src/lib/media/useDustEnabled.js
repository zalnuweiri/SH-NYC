import { useSyncExternalStore } from "react";

// G-24: core-count is a blunt signal (capable laptops report 4, Safari clamps).
// Use `< 4` rather than `<= 4`, and treat deviceMemory as a soft extra signal.
// The real Spline particle dust runs on MOBILE too (it's the site's actual framework — the CSS
// spark approximation didn't match the figma). Genuinely weak devices still fall back via the
// core/mem gates, and reduced-motion bypasses it entirely.
function compute() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores  = navigator.hardwareConcurrency ?? 8;
  const mem    = navigator.deviceMemory ?? 8;
  const lowCore = cores < 4;
  const lowMem  = mem < 4;
  return !reduce && !lowCore && !lowMem;
}

// Subscribe to reduced-motion changes; recompute on change.
export default function useDustEnabled() {
  return useSyncExternalStore(
    (cb) => {
      const a = window.matchMedia("(prefers-reduced-motion: reduce)");
      a.addEventListener("change", cb);
      return () => { a.removeEventListener("change", cb); };
    },
    compute,
    () => false,   // SSR snapshot (avoids hydration mismatch; no dust on first paint)
  );
}
