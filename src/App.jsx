import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import Story from "./pages/Story";
import HappyHour from "./pages/HappyHour";
import FormTest from "./pages/FormTest";
import ExternalRedirect from "./pages/ExternalRedirect";
import NotFound from "./pages/NotFound";

// Blog routes are lazy because they are the only thing that imports
// supabaseClient, and createClient drags in auth-js + realtime-js + phoenix +
// functions-js — ~162 KB gzip, none of which the public site uses (no login, no
// subscriptions, no edge invokes). Imported eagerly, all of it landed in the
// entry chunk and was downloaded by every visitor, including someone who only
// ever sees the homepage. Home's own BlogSection is already lazy + LazyMounted,
// so nothing here is needed until a blog route is actually visited.
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogContent = lazy(() => import("./pages/BlogContent"));

const Fifa26 = lazy(() => import("./pages/Fifa26")); // out-of-scope page, lazy

// Seasonal NYE landing page. Unlinked from the site chrome (SEO/direct-URL only),
// so it is lazy — no reason to ship it in the bundle every visitor downloads.
const NYE26 = lazy(() => import("./pages/NYE26"));

export default function App() {
  return (
    <Routes>
      {/* one layout route → persistent shell (Navbar + Footer + Dust + scroll mgmt) */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="events" element={<Events />} />
        <Route path="story" element={<Story />} />
        <Route path="happy-hour" element={<HappyHour />} /> {/* NEW */}
        <Route
          path="reservations"
          element={<ExternalRedirect to="https://www.opentable.ca/r/silent-h-toronto" />}
        />
        <Route path="form" element={<FormTest />} />
          <Route
            path="blogs"
            element={
              <Suspense fallback={null}>
                <BlogsPage />
              </Suspense>
            }
          />
          <Route
            path="blogs/:slug"
            element={
              <Suspense fallback={null}>
                <BlogContent />
              </Suspense>
            }
          />
        {/* NYE landing. Inside the Layout shell on purpose: the Figma frame's nav
            pill, footer and particles are exactly what Layout already renders. */}
        <Route
          path="nye26"
          element={
            <Suspense fallback={null}>
              <NYE26 />
            </Suspense>
          }
        />

        {/* Catch-all: any URL that matches nothing above renders a branded 404
            inside the shell (Navbar/Footer/Dust). functions/_middleware.js gives
            these paths a real 404 HTTP status; this is what the page shows.
            NOTE: if you add a route above, add it to KNOWN_EXACT_ROUTES in
            src/lib/routeSeo.js too, or the edge will 404 it. */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* /aitch is a SEPARATE prebuilt app (public/aitch/), not a React route. A
          direct URL load is served by Cloudflare, but an in-app <Link to="/aitch">
          (footer, FAQ, blog related-links, inline "Aitch" auto-links) used to be
          handled client-side by React Router — which matched nothing and rendered
          the "*" NotFound (a false 404). This route intercepts those client-side
          navigations and hard-redirects to the real app via a full page load.
          The splat also covers /aitch/faq, /aitch/booking, etc. */}
      <Route path="aitch/*" element={<ExternalRedirect to="/aitch/" />} />

      {/* Out of scope: Fifa26 keeps its own standalone chrome (own Navbar/Footer),
          so it is routed OUTSIDE the dark Layout shell to avoid double chrome. */}
      <Route
        path="fifa26"
        element={
          <Suspense fallback={null}>
            <Fifa26 />
          </Suspense>
        }
      />
    </Routes>
  );
}
