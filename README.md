# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## NYC content and reservations

Silent H is presented as opening soon at 420 West 13th Street, New York, NY 10014. Aitch is next door at 418 West 13th Street. Online reservations are a coming-soon notice; no Toronto OpenTable or table-service provider is loaded.

The current shared food and bar menu is stored in `src/data/MenuData.js`. NYC pricing metadata uses USD. Opening hours are presented as planned; unconfirmed event capacity, patio availability and the holiday gift-card promotion are not advertised as settled facts. The New Year's Eve page is a menu preview, without a scheduled-event rich result.

NYC articles live in `src/data/nycBlogPosts.js`, shared by React, Cloudflare Pages Functions and the sitemap. The shared Toronto Supabase feed is no longer used by NYC blog pages. Add or edit NYC articles here, or connect a separately scoped NYC CMS in all three consumers together.

The separate Aitch app is supplied as compiled assets rather than editable React source. `scripts/build-aitch-nyc.mjs` applies checked, bounded changes to preserved base assets in `archive/`, including its lazy-slider import cycle, and writes matching entry points for `/aitch/`, `/aitch/faq` and `/aitch/booking`. The script fails if the source bundle changes unexpectedly. Do not edit generated bundles directly.

Run `npm run verify:nyc` for regression checks, then `npm run build` for the deployment package. The original website styling and imagery are retained.

Validation for this change: NYC regression checks, focused ESLint checks, production code compilation, and browser checks of the main pages, reservation notice and Aitch. The local verification build used `copyPublicDir: false` with original assets served separately because bulk reads of the cloned asset directory stalled on this computer. The normal production command still copies the public assets.
