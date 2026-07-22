// layout/ScrollManager.jsx — resets scroll to top on route change.
// Merges the old ScrollToTop.jsx; the old location.state.scrollTo happy-hour
// deep-link branch is dropped (Happy Hour is now its own page).
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenisRef } from "../lib/smoothScroll/lenisContext";

export default function ScrollManager() {
  const { pathname } = useLocation();
  const lenisRef = useLenisRef();

  useEffect(() => {
    // G-13: when Lenis owns the scroll, native window.scrollTo can be ignored or
    // fight Lenis's RAF. Reset through Lenis when present, else fall back to native.
    const lenis = lenisRef?.current?.lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}
