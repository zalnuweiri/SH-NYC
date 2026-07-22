// components/DustBackground.jsx — default export so it can be React.lazy'd.
import { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";

export default function DustBackground() {
  const appRef = useRef(null);

  const onLoad = (app) => {
    appRef.current = app;
    // G-02: belt-and-suspenders transparency. setBackgroundColor(color:string) is
    // confirmed on @splinetool/runtime's Application (runtime.d.ts L241), but is not
    // in the react-spline README method list, so guard it. rgba(0,0,0,0) is more
    // reliable than the "transparent" keyword across runtime versions.
    // TODO: the Spline scene itself should ALSO be re-exported with an alpha/
    // transparent background in the Spline editor so transparency never relies on
    // this single runtime call.

  };

  // Pause rendering when the tab is hidden (battery/CPU) if the runtime exposes it.
  useEffect(() => {
    const onVis = () => {
      const app = appRef.current;
      if (!app) return;
      try {
        if (document.hidden) app.stop?.();
        else app.play?.();
      } catch { /* no-op */ }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none"
      // G-25: avoid `contain: strict` (size containment can zero the WebGL host).
      // Use layout+paint containment only; `fixed inset-0` already sizes it.
      style={{ contain: "layout paint" }}
    >
      <Spline
        scene="/scenes/dust.splinecode"
        onLoad={onLoad}
        // Falling dust is a continuous animation — renderOnDemand would freeze it
        // on the first frame, so render every frame while mounted.
        renderOnDemand={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
