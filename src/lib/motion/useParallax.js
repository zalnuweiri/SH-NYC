import { useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { PARALLAX_SPRING } from "./springs";

/**
 * useParallax(ref, { distance=80, axis='y', smooth=true, offset=['start end','end start'] })
 *  → returns a MotionValue to spread into style (e.g. style={{ y }} or style={{ x }})
 *  distance: px of travel across the full scroll range (sign sets direction).
 *  Reduced-motion → returns a constant 0 (no movement).
 */
export default function useParallax(ref, {
  distance = 80, axis = "y", smooth = true,
  offset = ["start end", "end start"],
} = {}) {
  // axis param is consumed by callers (they pick which style prop to spread).
  void axis;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const raw = useTransform(scrollYProgress, [0, 1],
    reduce ? [0, 0] : [distance, -distance], { clamp: false });
  const sprung = useSpring(raw, PARALLAX_SPRING);
  const base = smooth && !reduce ? sprung : raw;
  // Snap the parallax translate to whole DEVICE pixels. A fractional transform
  // puts descendant text on a sub-pixel boundary, which makes the rectilinear
  // pixel font (NeueBit) alias into horizontal strips. Rounding to the device
  // grid keeps it crisp without visibly changing the parallax motion.
  return useTransform(base, (v) => {
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    return Math.round(v * dpr) / dpr;
  });
}
