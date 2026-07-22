// components/DustGate.jsx — decides DustBackground (WebGL) vs static PNG fallback,
// and bounds the dust to the figma's coverage: on the homepage the dust is a 90°-rotated
// video spanning design y0–2948 (top ~60%), fading out past the De Monterrey mountain.
import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocation } from "react-router-dom";
import useDustEnabled from "../lib/media/useDustEnabled";
import usePrefersReducedMotion from "../lib/media/usePrefersReducedMotion";
import useAfterPaint from "../lib/media/useAfterPaint";
import MobileSparks from "./MobileSparks";

const DustBackground = lazy(() => import("./DustBackground"));

export default function DustGate({ enabled }) {
  const allow = useDustEnabled(); // device / reduced-motion gate (§5.4)
  const reduce = usePrefersReducedMotion();
  // Hold the ~2MB Spline chunk back until the page has loaded and the thread is
  // idle, so it never competes with the hero for LCP. Only gates the WebGL path
  // — the PNG fallback and the CSS sparks are cheap and still mount immediately.
  const afterPaint = useAfterPaint();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  // Homepage: keep dust at FULL opacity through the hero, the De Monterrey sky AND behind the
  // blog, then fade to black as you scroll DOWN through the blog into the footer (parallax fade
  // the figma reference has). Other dust routes stay full.
  const fade = useTransform(scrollY, [0, 3500, 4100], [1, 1, 0]);
  const opacity = pathname === "/" ? fade : 1;

  if (!enabled) return null; // wrong route → nothing
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ opacity }}>
      {!allow ? (
        reduce ? (
          // reduced-motion: cheap static PNG, no animation
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/redesign/dust-fallback.png')" }}
          />
        ) : (
          // mobile / low-core / low-mem (no WebGL): animated CSS sparks instead of Spline
          <MobileSparks />
        )
      ) : afterPaint ? (
        <Suspense fallback={null}>
          <DustBackground />
        </Suspense>
      ) : null}
    </motion.div>
  );
}
