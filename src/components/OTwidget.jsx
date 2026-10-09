import { useEffect, useRef, useState } from "react";
import ReservationNotice from "./ReservationNotice";

import { OTContext } from "../lib/reservationsContext.js";

// Keep the shared CTA API while NYC reservations are not available.
export function OTProvider({ children }) {
  const [showWidget, setShowWidget] = useState(false);
  const dialog = useRef(null);
  const openReservationWidget = () => setShowWidget(true);

  useEffect(() => {
    if (!showWidget) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowWidget(false);
      if (event.key !== "Tab") return;
      const controls = [...dialog.current.querySelectorAll('button, a[href]')];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [showWidget]);

  return (
    <OTContext.Provider value={{ setShowWidget, openReservationWidget }}>
      {children}
      {showWidget && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-5" onClick={() => setShowWidget(false)}>
          <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="reservation-title" tabIndex={-1} className="relative bg-[#F9F6F1] text-[#151515] rounded-xl shadow-2xl p-8 pt-12 w-full max-w-[520px] max-h-[90dvh] overflow-y-auto focus:outline-none" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Close reservations notice" className="absolute top-3 right-4 text-3xl hover:text-sh-pink" onClick={() => setShowWidget(false)}>×</button>
            <ReservationNotice />
          </div>
        </div>
      )}
    </OTContext.Provider>
  );
}

