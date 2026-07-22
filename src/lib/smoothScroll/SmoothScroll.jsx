import { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { frame, cancelFrame, useReducedMotion } from "motion/react";
import { LenisContext } from "./lenisContext";

export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduce) return;                       // no smoothing for reduced-motion users
    function update(data) {
      lenisRef.current?.lenis?.raf(data.timestamp);
      // dev-only: expose the lenis instance so the screenshot harness can scroll precisely
      // (lenis.scrollTo). Stripped from production builds.
      if (import.meta.env.DEV) window.__lenis = lenisRef.current?.lenis;
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  // Keep Lenis's scroll `limit` (max scroll distance) synced to the REAL document height.
  // Lenis measures the page once, early — but lazy images, embedded iframes (the footer map),
  // late fonts and route changes all grow the page afterwards. That leaves a stale, too-short
  // limit, and Lenis then clamps you (and snaps native touch-scroll back) before the true bottom.
  // So we recompute on every document-size change, plus on load / fonts-ready, plus a short poll
  // to catch anything async. rAF-debounced so a burst of mutations only triggers one resize.
  useEffect(() => {
    if (reduce) return;
    let rafId = 0;
    let lastH = -1;
    // only call Lenis.resize() when the document height ACTUALLY changed → cheap enough to run on
    // every scroll frame, which is the case that bites: images below the fold lazy-load as you
    // scroll, growing the page, and Lenis would otherwise keep clamping you to its older, shorter limit.
    const measure = () => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastH) {
        lastH = h;
        lenisRef.current?.lenis?.resize();
      }
    };
    const recalc = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    const ro = new ResizeObserver(recalc);
    ro.observe(document.documentElement);
    ro.observe(document.body);

    window.addEventListener("load", recalc);
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, { passive: true });
    document.fonts?.ready.then(recalc).catch(() => {});

    // Settle poll: media/iframes can finish at unpredictable times in the first few seconds.
    const poll = setInterval(recalc, 500);
    const stop = setTimeout(() => clearInterval(poll), 8000);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("load", recalc);
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc);
      clearInterval(poll);
      clearTimeout(stop);
    };
  }, [reduce]);

  // Reduced-motion: bypass Lenis entirely. Context value's ref stays null →
  // ScrollManager falls back to native window.scrollTo.
  if (reduce) {
    return (
      <LenisContext.Provider value={lenisRef}>
        {children}
      </LenisContext.Provider>
    );
  }

  return (
    <LenisContext.Provider value={lenisRef}>
      <ReactLenis
        root
        ref={lenisRef}
        options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false }}
      >
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
