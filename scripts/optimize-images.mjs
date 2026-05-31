import { readdir, stat, rename, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const ASSETS_DIR = 'src/assets';
const QUALITY_JPEG = 72;
const QUALITY_WEBP = 75;

const SIZE_RULES = [
  { pattern: /hero/i, maxWidth: 1600 },
  { pattern: /logo/i, maxWidth: 400 },
  { pattern: /about/i, maxWidth: 800 },
  { pattern: /interior-painting|screenshot/i, maxWidth: 600 },
  { pattern: /.*/, maxWidth: 800 },
];

function getMaxWidth(filename) {
  for (const rule of SIZE_RULES) {
    if (rule.pattern.test(filename)) return rule.maxWidth;
  }
  return 800;
}

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

    const maxW = getMaxWidth(file);

    try {
      const img = sharp(filePath);
      const meta = await img.metadata();

      if (!meta.width || meta.width <= maxW) {
        skipped++;
        continue;
      }

      const ext = file.toLowerCase().endsWith('.png') ? 'png' : 'jpeg';
      let pipeline = img.resize({ width: maxW, withoutEnlargement: true });

      if (ext === 'jpeg') {
        pipeline = pipeline.jpeg({ quality: QUALITY_JPEG, mozjpeg: true });
      } else {
        pipeline = pipeline.png({ quality: QUALITY_JPEG, compressionLevel: 9 });
      }

      await pipeline.toFile(filePath + '.tmp');
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
