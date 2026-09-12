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
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const ASSETS = 'src/assets';
const PUBLIC = 'public';

// Hero is the largest-contentful-paint image on the home page. Phones only
// ever show it at ~400 CSS px wide, so shipping the 2848px original wasted
// most of its bytes.
const HERO_SRC = join(ASSETS, 'hero-bg-image.jpg');
const HERO_WIDTHS = [800, 1280, 1920];

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
  for (const w of HERO_WIDTHS) {
    const out = HERO_SRC.replace(/\.jpg$/i, `-${w}.jpg`);
    await sharp(HERO_SRC)
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true, progressive: true })
      .toFile(out);
    console.log(`  hero  ${String(w).padStart(4)}w  ${kb(heroBefore).padStart(8)} -> ${kb(await size(out)).padStart(8)}  ${out}`);
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
