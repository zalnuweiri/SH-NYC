import { useRef } from "react";
import { motion } from "motion/react";
import useParallax from "./useParallax";

/**
 * <Parallax speed={0.3} axis="y" as="div" className="" offset={...}>children</Parallax>
 *  speed: fraction of viewport-ish travel; mapped to distance = speed * 200 (px).
 *         positive = element drifts up as you scroll (foreground); negative = down (background).
 */
export default function Parallax({
  speed = 0.3, axis = "y", as = "div", className = "", offset, children, ...rest
}) {
  const ref = useRef(null);
  const mv = useParallax(ref, { distance: speed * 200, axis, offset });
  const MotionTag = motion[as] ?? motion.div;
  const style = axis === "x" ? { x: mv } : { y: mv };
  return (
    <MotionTag ref={ref} style={style} className={className} {...rest}>
      {children}
    </MotionTag>
  );
}
