// scripts/list-menu-images.mjs
//
// Prints PAGE_JOBS.menu entries (scripts/build-page-images.mjs's format) for
// every image `src/data/MenuData.js` actually references — derived from the
// live data, not hand-typed, so a commented-out carousel entry is correctly
// invisible and never appears here.
//
// Run this after adding a dish/drink with a new photo, then paste any NEW
// entries into build-page-images.mjs's PAGE_JOBS.menu array.
//
//   node scripts/list-menu-images.mjs
//
// Widths: the shared [240, 480, 768, 1080, 1600] ladder covers every real
// display context across MenuCarousel.jsx and menu/MenuParts.jsx — see the
// comment above PAGE_JOBS.menu's dish-photo section for the breakdown. If a
// new photo needs a genuinely different size (e.g. a full-bleed hero), size
// it by hand instead of using this script's output verbatim.

import { menuData } from "../src/data/MenuData.js";
import fs from "node:fs";
import path from "node:path";

// NO "already small enough, skip it" exceptions here — that carve-out is
// what caused a real bug: menu-ensenada.webp was judged already-fine and
// left out of PAGE_JOBS, but its render path (menu/MenuParts.jsx →
// <ResponsiveImg>) has no awareness of that judgment call and unconditionally
// builds "{base}-{width}.{ext}" URLs. Every one 404'd, so "Ensenada Dreams"
// — the first drink on the page — rendered as a broken-image icon. The
// invariant has to be absolute: every image reachable through
// <ResponsiveImg> gets a PAGE_JOBS entry, regardless of native size. Small
// sources just produce fewer tiers (withoutEnlargement caps them), which
// costs nothing.

// Reads scripts/build-page-images.mjs's ACTUAL PAGE_JOBS.menu `input` paths,
// so this only ever reports images that genuinely aren't configured yet —
// not a hardcoded snapshot that goes stale the moment someone adds an entry.
function configuredInputs() {
  const scriptPath = new URL("./build-page-images.mjs", import.meta.url);
  const src = fs.readFileSync(scriptPath, "utf8");
  const inputs = [...src.matchAll(/input:\s*"public([^"]+)"/g)].map((m) => m[1]);
  return new Set(inputs);
}

const WIDTHS = "[240, 480, 768, 1080, 1600]";

function collect() {
  const skip = configuredInputs();
  const seen = new Set();
  const visit = (items) => {
    for (const item of items ?? []) {
      if (item.image && !skip.has(item.image)) seen.add(item.image);
    }
  };
  for (const section of menuData.food ?? []) visit(section.items);
  for (const section of menuData.drinks ?? []) visit(section.items);
  visit(menuData.carousel);
  return [...seen].sort();
}

const paths = collect();
console.log(`// ${paths.length} referenced images not yet in PAGE_JOBS.menu\n`);

for (const imgPath of paths) {
  const label = path.basename(imgPath, path.extname(imgPath));
  console.log(`        {
            name: "${label}",
            input: "public${imgPath}",
            widths: ${WIDTHS},
            avifQuality: 55,
            webpQuality: 76,
        },`);
}

if (paths.length === 0) {
  console.log("Nothing new — every referenced image already has a PAGE_JOBS.menu entry.");
}
