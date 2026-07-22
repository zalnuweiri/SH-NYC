import { createContext, useContext } from "react";

// Exposes the live Lenis instance ref (or null when bypassed) so ScrollManager
// can reset scroll through Lenis instead of fighting it with window.scrollTo (G-13).
export const LenisContext = createContext(null);

export function useLenisRef() {
  return useContext(LenisContext);
}
