/**
 * Generates the image variants that `optimize-images.mjs` deliberately skips
 * (hero and logo art, which it leaves at full quality) plus the social share
 * image.
 *
 * Run manually after replacing any of the source images:
 *   node scripts/generate-image-variants.mjs
 *
 * Outputs are committed to the repo. This is NOT part of the build, because
 * the build's prebuild step rewrites `src/assets` in place and we want these
 * derived files to stay exactly as generated here.
 */
import { stat, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const ASSETS = 'src/assets';
const PUBLIC = 'public';

// Hero is the largest-contentful-paint image on the home page. Phones only
// ever show it at ~400 CSS px wide, so shipping the 2848px original wasted
// most of its bytes.
const HERO_SRC = join(ASSETS, 'hero-bg-image.jpg');
const HERO_WIDTHS = [800, 1280, 1920];

// The hero variants are written to public/ rather than imported through the
// bundler. An imported image only gets its URL once the JS has loaded and
// React has rendered, which measured ~1.4s on a throttled phone before the
// browser even began fetching the largest-contentful-paint image. Serving it
// from a stable public path lets index.html preload it from the first byte of
// HTML. Bump HERO_VERSION when the source photo changes, since public/ files
// are not content-hashed.
const HERO_VERSION = 'v1';
const HERO_PUBLIC_DIR = join(PUBLIC, 'hero');

// The About photo on the home page is shipped at 1000x1251 but shown at about
// 380x507 on a phone. Same public/ treatment as the hero so it can carry a
// srcset without the bundler renaming it every build.
const ABOUT_SRC = join(ASSETS, 'about-us.jpg');
const ABOUT_WIDTHS = [400, 800, 1000]; // 1000 is the source's own width
const ABOUT_VERSION = 'v1';
const ABOUT_PUBLIC_DIR = join(PUBLIC, 'about');

// Navbar shows the logo at ~83x40 CSS px, footer at ~99x48. 400px covers 3x
// pixel density with room to spare; the source is 800px.
const LOGO_SRC = join(ASSETS, 'freshimpressionspainting-web-logo.png');
const LOGO_WIDTH = 400;

// Open Graph / Twitter share card. The tags already declare 1200x630.
const OG_OUT = join(PUBLIC, 'og-image.jpg');

const kb = (b) => Math.round(b / 1024) + ' KB';

async function size(p) {
  try {
    return (await stat(p)).size;
  } catch {
    return 0;
  }
}

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('[variants] sharp is required. Run: npm i -D sharp');
    process.exitCode = 1;
    return;
  }

  console.log('\n[variants] generating derived images\n');

  const heroBefore = await size(HERO_SRC);
  await mkdir(HERO_PUBLIC_DIR, { recursive: true });
  for (const w of HERO_WIDTHS) {
    const out = join(HERO_PUBLIC_DIR, `hero-${HERO_VERSION}-${w}.jpg`);
    await sharp(HERO_SRC)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true, progressive: true })
      .toFile(out);
    console.log(`  hero  ${String(w).padStart(4)}w  ${kb(heroBefore).padStart(8)} -> ${kb(await size(out)).padStart(8)}  ${out}`);
  }

  const aboutBefore = await size(ABOUT_SRC);
  await mkdir(ABOUT_PUBLIC_DIR, { recursive: true });
  for (const w of ABOUT_WIDTHS) {
    const out = join(ABOUT_PUBLIC_DIR, `about-${ABOUT_VERSION}-${w}.jpg`);
    await sharp(ABOUT_SRC)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true, progressive: true })
      .toFile(out);
    console.log(`  about ${String(w).padStart(4)}w  ${kb(aboutBefore).padStart(8)} -> ${kb(await size(out)).padStart(8)}  ${out}`);
  }

  const logoOut = LOGO_SRC.replace(/\.png$/i, `-${LOGO_WIDTH}.png`);
  const logoBefore = await size(LOGO_SRC);
  await sharp(LOGO_SRC)
    .resize({ width: LOGO_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toFile(logoOut);
  console.log(`  logo  ${String(LOGO_WIDTH).padStart(4)}w  ${kb(logoBefore).padStart(8)} -> ${kb(await size(logoOut)).padStart(8)}  ${logoOut}`);

  await sharp(HERO_SRC)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(OG_OUT);
  console.log(`  og    1200x630           -> ${kb(await size(OG_OUT)).padStart(8)}  ${OG_OUT}`);

  console.log('\n[variants] done\n');
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
