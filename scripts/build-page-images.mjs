import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

/**
 * Add one page entry at a time as we review each page.
 *
 * Widths are based on actual rendered size, including high-density screens.
 * The script never enlarges an image beyond its original width.
 */
const PAGE_JOBS = {
    menu: [
        {
            name: "Electric Daisy",
            input: "public/redesign/menu-electricdaisy.webp",
            widths: [320, 480, 640, 768, 960],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Margarita Tree",
            input: "public/redesign/menu-margaritatree.webp",
            widths: [320, 480, 640, 768, 960],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Electric Daisy detail",
            input: "public/edaisysmall.png",
            widths: [80, 128, 160],
            avifQuality: 60,
            webpQuality: 82,
        },
        {
            // "Ensenada Dreams", the first Cocteles Regionales item — unlike
            // Electric Daisy / Margarita Tree above, this one is NOT a
            // hardcoded <img>; it flows through the generic RowDesktop /
            // RowMobile → <ResponsiveImg> path (menu/MenuParts.jsx), same as
            // every dish photo below. That component unconditionally builds
            // "{base}-{width}.{ext}" URLs — it has no way to know an image
            // was judged "already small enough, skip it". This file was
            // originally left out of PAGE_JOBS on exactly that judgment,
            // which meant every generated URL 404'd and the drink rendered
            // as a broken-image icon. Do not remove this entry for that
            // reason again — every image reachable through ResponsiveImg
            // needs a job here, full stop, regardless of its native size.
            name: "menu-ensenada",
            input: "public/redesign/menu-ensenada.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },

        // ── Dish + drink photos (public/menu, public/dmenu, public root) ──
        // These are camera originals dropped straight into /public and
        // referenced at full resolution — some 6000px+ / 7MB for a 150px
        // carousel thumbnail. That's what was showing up in the PageSpeed
        // audit as "Improve image delivery: 26.6MB of savings" on mobile.
        //
        // One shared width ladder covers every real place a dish photo
        // renders, across src/components/MenuCarousel.jsx and
        // src/components/menu/MenuParts.jsx:
        //   240  mobile carousel thumb (~150px @2x) / RowMobile small
        //        regional thumb (112px @2x)
        //   480  desktop /menu row thumb (269px @2x) / mobile carousel
        //        card @2x / RowMobile hero (321px @1.5x)
        //   768  RowMobile hero @2x / desktop carousel card on typical
        //        screens
        //   1080 desktop carousel card on large monitors @2x
        //   1600 the click-to-zoom lightbox (max-w-90vw) — the one place
        //        that actually wants a large image
        //
        // This list was generated from src/data/MenuData.js's live `.image`
        // fields (see scripts/list-menu-images.mjs), not hand-typed, so it
        // matches exactly what's rendered — several images referenced only
        // inside MenuData.js's commented-out "re-add below" carousel block
        // are correctly absent here. If you add a dish with a photo, add its
        // entry here the same way (or re-run the lister to get the line).
        {
            name: "coatepec",
            input: "public/coatepec.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "dd",
            input: "public/dd.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "chaithainew",
            input: "public/dmenu/chaithainew.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "edreamsnew",
            input: "public/dmenu/edreamsnew.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "fizz-crop",
            input: "public/dmenu/fizz-crop.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "grndplma",
            input: "public/dmenu/grndplma.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "lilpcnts",
            input: "public/dmenu/lilpcnts.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "lilps2",
            input: "public/dmenu/lilps2.jpg",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "mangoocolado2",
            input: "public/dmenu/mangoocolado2.jpg",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "margs",
            input: "public/dmenu/margs.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "margtree (dmenu)",
            input: "public/dmenu/margtree.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "mexeast2",
            input: "public/dmenu/mexeast2.jpg",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "pabpech",
            input: "public/dmenu/pabpech.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "plmapcnt",
            input: "public/dmenu/plmapcnt.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "slntsprtzcrop",
            input: "public/dmenu/slntsprtzcrop.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "violeta",
            input: "public/dmenu/violeta.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "drinkH",
            input: "public/drinkH.png",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "jj",
            input: "public/jj.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "margtree (root)",
            input: "public/margtree.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "44oz",
            input: "public/menu/44oz.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "AAACARNE",
            input: "public/menu/AAACARNE.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Betabales",
            input: "public/menu/Betabales.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Bunu",
            input: "public/menu/Bunu.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "BUNUELOScrsl",
            input: "public/menu/BUNUELOScrsl.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "CACHETADA",
            input: "public/menu/CACHETADA.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Carneseca",
            input: "public/menu/Carneseca.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "DeliciasMango",
            input: "public/menu/DeliciasMango.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "ElectricDaisy",
            input: "public/menu/ElectricDaisy.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "ElFavoritoPapa",
            input: "public/menu/ElFavoritoPapa.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "EmpsBarb",
            input: "public/menu/EmpsBarb.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "ESPADA",
            input: "public/menu/ESPADA.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Esquite",
            input: "public/menu/Esquite.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Flautas",
            input: "public/menu/Flautas.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "FLAUTAS",
            input: "public/menu/FLAUTAS.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "GQ",
            input: "public/menu/GQ.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "GuacamoleQue",
            input: "public/menu/GuacamoleQue.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "PapasJugo",
            input: "public/menu/PapasJugo.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "PescadoNew",
            input: "public/menu/PescadoNew.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Pollo",
            input: "public/menu/Pollo.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "POLLOPASTOR",
            input: "public/menu/POLLOPASTOR.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "QFY",
            input: "public/menu/QFY.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "TACOLIV",
            input: "public/menu/TACOLIV.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "TacosChich",
            input: "public/menu/TacosChich.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "TostAtun",
            input: "public/menu/TostAtun.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "Vegetales",
            input: "public/menu/Vegetales.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "oaxaca",
            input: "public/oaxaca.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
        {
            name: "polanco",
            input: "public/polanco.webp",
            widths: [240, 480, 768, 1080, 1600],
            avifQuality: 55,
            webpQuality: 76,
        },
    ],

    // Happy Hour page (src/pages/HappyHour.jsx). Two banner heroes rendered via
    // <ResponsiveImg>. Both are 1200px-wide webp sources; the ladder tops out at
    // 1200 (withoutEnlargement). Desktop shows them ~73.9vw wide, mobile as a
    // full-width portrait crop (object-cover in a 480px-tall box) — so the win
    // here is mostly AVIF plus a smaller desktop tier, not a big mobile cut (the
    // tall mobile crop still samples most of the source width). The unused root
    // PNGs (public/HH1-1.png, public/HH2-1.png) are NOT these images and are not
    // referenced by anything rendered — intentionally left out.
    happyhour: [
        {
            name: "hh-hero1",
            input: "public/redesign/hh-hero1.webp",
            widths: [320, 480, 640, 768, 960, 1200],
            avifQuality: 58,
            webpQuality: 78,
        },
        {
            name: "hh-hero2",
            input: "public/redesign/hh-hero2.webp",
            widths: [320, 480, 640, 768, 960, 1200],
            avifQuality: 58,
            webpQuality: 78,
        },
    ],
};

function fileExists(filePath) {
    return fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;

    const kilobytes = bytes / 1024;

    if (kilobytes < 1024) {
        return `${kilobytes.toFixed(1)} KB`;
    }

    return `${(kilobytes / 1024).toFixed(2)} MB`;
}

function getOrientedDimensions(metadata) {
    const rotated = [5, 6, 7, 8].includes(metadata.orientation);

    return {
        width: rotated ? metadata.height : metadata.width,
        height: rotated ? metadata.width : metadata.height,
    };
}

function resolvePageKey(inputArgument) {
    const normalized = inputArgument.replaceAll("\\", "/");
    const filename = path.basename(normalized);
    const extension = path.extname(filename);

    return path.basename(filename, extension).toLowerCase();
}

function getPublicUrl(absolutePath) {
    const relativePath = path
        .relative(PUBLIC_DIR, absolutePath)
        .split(path.sep)
        .join("/");

    return `/${relativePath}`;
}

async function outputIsCurrent(inputPath, outputPath, force) {
    if (force) return false;

    try {
        const [inputStat, outputStat] = await Promise.all([
            fs.stat(inputPath),
            fs.stat(outputPath),
        ]);

        return outputStat.mtimeMs >= inputStat.mtimeMs;
    } catch {
        return false;
    }
}

async function buildFormat({
                               basePipeline,
                               inputPath,
                               outputPath,
                               format,
                               quality,
                               force,
                           }) {
    const current = await outputIsCurrent(inputPath, outputPath, force);

    if (current) {
        const stat = await fs.stat(outputPath);

        console.log(
            `  ↳ skipped ${path.basename(outputPath)} (${formatBytes(stat.size)})`,
        );

        return;
    }

    const pipeline = basePipeline.clone();

    if (format === "avif") {
        pipeline.avif({
            quality,
            effort: 6,
        });
    } else if (format === "webp") {
        pipeline.webp({
            quality,
            effort: 5,
        });
    } else {
        throw new Error(`Unsupported output format: ${format}`);
    }

    await pipeline.toFile(outputPath);

    const stat = await fs.stat(outputPath);

    console.log(
        `  ✓ created ${path.basename(outputPath)} (${formatBytes(stat.size)})`,
    );
}

async function processJob(job, force) {
    const inputPath = path.resolve(ROOT, job.input);

    if (!(await fileExists(inputPath))) {
        throw new Error(`Source image does not exist: ${job.input}`);
    }

    const metadata = await sharp(inputPath).metadata();
    const dimensions = getOrientedDimensions(metadata);

    if (!dimensions.width || !dimensions.height) {
        throw new Error(`Could not determine image dimensions: ${job.input}`);
    }

    const requestedWidths = [...new Set(job.widths)]
        .filter((width) => Number.isInteger(width) && width > 0)
        .sort((a, b) => a - b);

    const usableWidths = requestedWidths.filter(
        (width) => width <= dimensions.width,
    );

    /*
     * When the source is smaller than every requested size, generate one
     * version at the source width rather than enlarging it.
     */
    if (usableWidths.length === 0) {
        usableWidths.push(dimensions.width);
    }

    const extension = path.extname(inputPath);
    const outputStem = inputPath.slice(0, -extension.length);

    await fs.mkdir(path.dirname(inputPath), { recursive: true });

    const originalStat = await fs.stat(inputPath);

    console.log(`\n${job.name}`);
    console.log(
        `  source: ${job.input} — ${dimensions.width}×${dimensions.height}, ${formatBytes(originalStat.size)}`,
    );

    const generated = {
        avif: [],
        webp: [],
    };

    for (const width of usableWidths) {
        const avifPath = `${outputStem}-${width}.avif`;
        const webpPath = `${outputStem}-${width}.webp`;

        const basePipeline = sharp(inputPath)
            .rotate()
            .resize({
                width,
                fit: "inside",
                withoutEnlargement: true,
            });

        await Promise.all([
            buildFormat({
                basePipeline,
                inputPath,
                outputPath: avifPath,
                format: "avif",
                quality: job.avifQuality ?? 55,
                force,
            }),
            buildFormat({
                basePipeline,
                inputPath,
                outputPath: webpPath,
                format: "webp",
                quality: job.webpQuality ?? 76,
                force,
            }),
        ]);

        generated.avif.push(`${getPublicUrl(avifPath)} ${width}w`);
        generated.webp.push(`${getPublicUrl(webpPath)} ${width}w`);
    }

    console.log("\n  AVIF srcSet:");
    console.log(`  ${generated.avif.join(", ")}`);

    console.log("\n  WebP srcSet:");
    console.log(`  ${generated.webp.join(", ")}`);

    return generated;
}

// The manifest src/components/ResponsiveImg.jsx actually trusts at runtime.
//
// WHY THIS EXISTS: `withoutEnlargement` above means a source smaller than a
// requested width silently produces FEWER tiers than the job's `widths` list
// asks for (e.g. menu-ensenada.webp is 640px native, so its 768/1080/1600
// tiers never get written). ResponsiveImg has no way to see the filesystem —
// if it just assumed every job's full `widths` list was generated, it would
// pick a non-existent tier and 404 (this exact bug shipped once already: see
// the comment on the menu-ensenada job above). This manifest is the one
// place that records what was ACTUALLY written, so the component only ever
// requests real files.
//
// Computed via a metadata-only probe (no encoding) so it can cover every
// configured job on every run, not just the page passed on the CLI — running
// `images:build -- menu` must not leave a stale/missing entry for some other
// page's jobs.
async function computeManifest() {
    const manifest = {};

    for (const jobs of Object.values(PAGE_JOBS)) {
        for (const job of jobs) {
            const inputPath = path.resolve(ROOT, job.input);
            if (!(await fileExists(inputPath))) continue;

            const metadata = await sharp(inputPath).metadata();
            const dimensions = getOrientedDimensions(metadata);
            if (!dimensions.width) continue;

            const requestedWidths = [...new Set(job.widths)]
                .filter((w) => Number.isInteger(w) && w > 0)
                .sort((a, b) => a - b);
            let usableWidths = requestedWidths.filter((w) => w <= dimensions.width);
            if (usableWidths.length === 0) usableWidths.push(dimensions.width);

            const extension = path.extname(inputPath);
            const outputStem = inputPath.slice(0, -extension.length);
            manifest[getPublicUrl(outputStem)] = usableWidths;
        }
    }

    return manifest;
}

async function writeManifest() {
    const manifest = await computeManifest();
    const outPath = path.resolve(ROOT, "src/data/imageManifest.json");
    await fs.writeFile(outPath, JSON.stringify(manifest, null, 2) + "\n");
    console.log(
        `\nWrote src/data/imageManifest.json (${Object.keys(manifest).length} images).`,
    );
}

async function main() {
    const args = process.argv.slice(2);
    const force = args.includes("--force");
    const targetArgument = args.find((argument) => !argument.startsWith("--"));

    if (!targetArgument) {
        console.error(
            [
                "Missing page argument.",
                "",
                "Examples:",
                "  npm run images:build -- src/pages/Menu.jsx",
                "  npm run images:build -- menu",
                "  npm run images:build -- menu --force",
                "",
                `Configured pages: ${Object.keys(PAGE_JOBS).join(", ")}`,
            ].join("\n"),
        );

        process.exitCode = 1;
        return;
    }

    const pageKey = resolvePageKey(targetArgument);
    const jobs = PAGE_JOBS[pageKey];

    if (!jobs) {
        console.error(
            [
                `No responsive-image configuration exists for: ${targetArgument}`,
                `Resolved page key: ${pageKey}`,
                `Configured pages: ${Object.keys(PAGE_JOBS).join(", ")}`,
            ].join("\n"),
        );

        process.exitCode = 1;
        return;
    }

    console.log(`Building responsive images for: ${pageKey}`);
    console.log(`Mode: ${force ? "forced rebuild" : "skip current outputs"}`);

    for (const job of jobs) {
        await processJob(job, force);
    }

    console.log(`\nFinished responsive images for: ${pageKey}`);

    await writeManifest();
}

main().catch((error) => {
    console.error("\nResponsive image build failed:");
    console.error(error);
    process.exitCode = 1;
});