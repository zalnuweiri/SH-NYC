import { motion, useReducedMotion } from "motion/react";

/**
 * <Reveal as="div" y={24} delay={0} amount={0.3} once className="">children</Reveal>
 *  fade + slide-up on enter. Reduced-motion → opacity only, no slide.
 */
export default function Reveal({
  as = "div", y = 24, delay = 0, amount = 0.3, once = true, className = "", children, ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
