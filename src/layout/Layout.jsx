import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DustGate from "../components/DustGate";
import EnterAitchTab from "../components/EnterAitchTab";
import ScrollManager from "./ScrollManager";
import SmoothScroll from "../lib/smoothScroll/SmoothScroll";

// Routes that get the falling-dust overlay (NOT /menu).
const DUST_ROUTES = new Set(["/", "/events", "/story", "/happy-hour", "/nye26"]);

// SEO Part 1: each page points its canonical at itself (not the homepage) and
// sets its own <title> around a real search term, so Google indexes them as
// separate pages.
//
// The canonical + title also have to be correct BEFORE JavaScript runs, or a
// crawler's first pass sees index.html's hardcoded homepage canonical on every
// route. functions/_middleware.js does that at the edge, reading the same
// src/lib/routeSeo.js table imported here — so the pre-JS HTML and the hydrated
// DOM cannot disagree.
import { canonicalFor, seoFor } from "../lib/routeSeo.js";


function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}


export default function Layout() {
  const { pathname } = useLocation();
  const dustEnabled = DUST_ROUTES.has(pathname);

  useEffect(() => {
    setCanonical(canonicalFor(pathname));
    const seo = seoFor(pathname);
    if (seo?.title) document.title = seo.title;
  }, [pathname]);

  return (
      <SmoothScroll>
        <ScrollManager />
        {/* z-0 fixed dust behind everything; page content is z-10 via each page's <main> */}
        <DustGate enabled={dustEnabled} />
        <Navbar />
        {/* Enter-Aitch side tab only on the home page (not menu/events/story/etc.) */}
        {/*{pathname === "/" && <EnterAitchTab />} */}
        <Outlet />        {/* page changes here; Navbar/Footer/Dust do NOT remount */}
        <Footer />
      </SmoothScroll>
  );
}
