import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

// Catch-all "*" page (wired in src/App.jsx). Two jobs:
//   • Humans who hit a dead/typo'd URL get a branded page with a way back in,
//     instead of the blank <Outlet/> the app used to render for unknown routes.
//   • functions/_middleware.js re-issues unmatched routes with a 404 STATUS and
//     serves the shell as the body, so this component is what paints on that 404.
// index={false} keeps it out of the index as a belt to the 404 status itself.

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/happy-hour", label: "Happy Hour" },
  { to: "/events", label: "Private Events" },
  { to: "/story", label: "Our Story" },
  { to: "/blogs", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found | Silent H"
        description="The page you're looking for doesn't exist. Explore the Silent H menu, happy hour, events and more in NYC."
        index={false}
      />
      <main className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center gap-8 px-6 py-32 text-center font-body text-sh-cream">
        <p className="font-display font-bold uppercase tracking-[0.2em] text-sh-gold text-[20px]">
          404
        </p>

        <h1 className="font-display font-bold uppercase leading-none tracking-[0.05em] text-[40px] md:text-[64px]">
          Page not found
        </h1>

        <p className="max-w-[520px] text-[18px] tracking-[0.08em] text-sh-cream/80">
          The page you're looking for doesn't exist or may have moved. Try one of these instead.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-display uppercase tracking-[0.1em] text-[16px]">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="underline underline-offset-4 decoration-sh-gold/50 hover:text-sh-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
