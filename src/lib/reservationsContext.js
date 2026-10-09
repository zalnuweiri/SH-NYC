import { createContext, useContext } from "react";
export const OTContext = createContext();
export function useOTWidget() { return useContext(OTContext); }
