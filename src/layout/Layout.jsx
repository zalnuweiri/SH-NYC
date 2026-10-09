import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";
import EnterAitchTab from "../components/EnterAitchTab";
import ScrollManager from "./ScrollManager";
import SmoothScroll from "../lib/smoothScroll/SmoothScroll";

// SEO Part 1: each page points its canonical at itself (not the homepage) and
// sets its own <title> around a real search term, so Google indexes them as
// separate pages.
//
// The canonical + title also have to be correct BEFORE JavaScript runs, or a
// crawler's first pass sees index.html's hardcoded homepage canonical on every
// route. functions/_middleware.js does that at the edge, reading the same
// src/lib/routeSeo.js table imported here — so the pre-JS HTML and the hydrated
// DOM cannot disagree.



export default function Layout() {
  const { pathname } = useLocation();



  return (
      <SmoothScroll>
        <ScrollManager />
        <Navbar />
        {/* Enter-Aitch side tab only on the home page (not menu/events/story/etc.) */}
        {/*{pathname === "/" && <EnterAitchTab />} */}
        {/* ErrorBoundary keyed by route: a page-level throw shows a fallback panel
            (with nav + footer intact) instead of blanking the whole app; the key
            resets it when navigating to another route. */}
        <ErrorBoundary key={pathname}>
          <Outlet />        {/* page changes here; Navbar/Footer do NOT remount */}
        </ErrorBoundary>
        <Footer />
      </SmoothScroll>
  );
}
