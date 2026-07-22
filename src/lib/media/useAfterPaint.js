import { useEffect, useState } from "react";

/**
 * Returns false until the page has finished loading AND the main thread has gone
 * idle — then true, forever.
 *
 * WHY: the Spline dust is a ~2MB JS chunk (plus a ~1.9MB physics chunk) and a
 * continuous WebGL render loop. Mounting it during first paint makes it compete
 * with the hero image for bandwidth and the main thread for parse/execute time,
 * which is the single biggest remaining cost in the PageSpeed audit. The dust is
 * decorative and below the type — nothing about it needs to exist until the page
 * is otherwise done.
 *
 * `load` (not DOMContentLoaded) so images/fonts have already landed;
 * requestIdleCallback so we also wait for the main thread to be quiet. The 3s
 * timeout stops the dust from never appearing on a permanently busy thread, and
 * the setTimeout fallback covers Safari, which shipped rIC only recently.
 */
export default function useAfterPaint({ timeout = 3000 } = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId;
    let timerId;

    const go = () => {
      if (cancelled) return;
      setReady(true);
    };

    const whenIdle = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(go, { timeout });
      } else {
        timerId = window.setTimeout(go, 800);
      }
    };

    if (document.readyState === "complete") {
      whenIdle();
    } else {
      window.addEventListener("load", whenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, [timeout]);

  return ready;
}
