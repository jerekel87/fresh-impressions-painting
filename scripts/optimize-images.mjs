import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const ASSETS_DIR = 'src/assets';
const MAX_WIDTH = 1200;
const HERO_MAX_WIDTH = 1920;
const QUALITY = 75;

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[optimize-images] sharp not available, skipping image optimization.');
    console.log('[optimize-images] Install sharp with: npm install --save-dev sharp');
    return;
  }

  const files = await readdir(ASSETS_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  let optimized = 0;
  let skipped = 0;

  for (const file of imageFiles) {
    const filePath = join(ASSETS_DIR, file);
    const fileStat = await stat(filePath);

    if (fileStat.size === 0) {
      skipped++;
      continue;
    }

    const isHero = file.toLowerCase().includes('hero');
    const maxW = isHero ? HERO_MAX_WIDTH : MAX_WIDTH;

    try {
      const img = sharp(filePath);
      const meta = await img.metadata();

      if (!meta.width || meta.width <= maxW) {
        skipped++;
        continue;
      }

      await img
        .resize({ width: maxW, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(filePath + '.tmp');

      const { rename } = await import('node:fs/promises');
      await rename(filePath + '.tmp', filePath);
      optimized++;
      console.log(`  [optimized] ${file}: ${meta.width}px -> ${maxW}px`);
    } catch (err) {
      console.log(`  [skip] ${file}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`[optimize-images] Done. Optimized: ${optimized}, Skipped: ${skipped}`);
}

run().catch(console.error);
