import { useMemo } from "react";

// Lightweight CSS spark/ember layer for mobile (the Spline WebGL dust is gated off on small
// screens for battery/perf). GPU-composited transform/opacity only — no WebGL, no canvas.
// Motion = a slow wind-blown DRIFT with a leaf-like flutter (not a twinkle): each particle is
// carried a long way across the screen, swaying, fading in/out only at the ends. Reduced-motion
// users get the static PNG (handled by DustGate). Positions are seeded (stable across re-renders).
export default function MobileSparks({ count = 40 }) {
  const sparks = useMemo(() => {
    const rnd = (i, n) => {
      const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
      return x - Math.floor(x); // 0..1
    };
    return Array.from({ length: count }, (_, i) => {
      const size = +(1.4 + Math.pow(rnd(i, 4), 2.2) * 5).toFixed(2); // skew small, a few big
      return {
        left: +(rnd(i, 1) * 100).toFixed(2),
        top: +(rnd(i, 7) * 100).toFixed(2),
        size,
        dur: +(4.5 + rnd(i, 3) * 5).toFixed(2),            // s — faster = stronger, more passionate wind
        delay: +(-(rnd(i, 2) * 12)).toFixed(2),            // negative → already mid-flight
        // strong cohesive wind blowing DOWN and to the LEFT (matches the reference direction),
        // carried a long way so it reads as a gust, not aimless floating
        tx: +(-(260 + rnd(i, 5) * 240)).toFixed(0),        // px left
        ty: +(90 + rnd(i, 11) * 210).toFixed(0),           // px down
        sway: +(18 + rnd(i, 9) * 28).toFixed(0),           // px — leaf-flutter cross-sway
        peak: +(0.5 + rnd(i, 8) * 0.45).toFixed(2),
        color: rnd(i, 6) > 0.4 ? "#eb4660" : "#ff6b80",
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="sh-spark"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${(s.size * 2.2).toFixed(1)}px ${(s.size * 0.5).toFixed(1)}px ${s.color}`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            "--tx": `${s.tx}px`,
            "--ty": `${s.ty}px`,
            "--sway": `${s.sway}px`,
            "--peak": s.peak,
          }}
        />
      ))}
    </div>
  );
}
