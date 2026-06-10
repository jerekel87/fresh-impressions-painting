import { readdir, stat, rename } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ASSETS_DIR = 'src/assets';

// Max output dimensions — images wider/taller than these are downscaled
const MAX_WIDTHS = {
  hero: 1920,
  default: 1400,
};

// Target quality settings (lower = smaller file, still looks great on screen)
const JPEG_QUALITY = 72;   // mozjpeg — noticeably better compression than libjpeg at same quality
const PNG_QUALITY  = [0.6, 0.8]; // min/max for pngquant-style lossy PNG
const WEBP_QUALITY = 75;

// Skip logos and very small UI assets — lossless compression matters there
const SKIP_PATTERNS = [/logo/i, /favicon/i];

function shouldSkip(filename) {
  return SKIP_PATTERNS.some(p => p.test(filename));
}

function isHero(filename) {
  return /hero/i.test(filename);
}

function fmtKB(bytes) {
  return Math.round(bytes / 1024) + ' KB';
}

async function run() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[optimize-images] sharp not available — skipping. Install with: npm i -D sharp');
    return;
  }

  const files = await readdir(ASSETS_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  let totalBefore = 0;
  let totalAfter  = 0;
  let processed   = 0;
  let skipped     = 0;

  console.log(`\n[optimize-images] Processing ${imageFiles.length} source images…\n`);

  for (const file of imageFiles) {
    const filePath = join(ASSETS_DIR, file);
    const fileStat = await stat(filePath);

    if (fileStat.size === 0) {
      skipped++;
      continue;
    }

    if (shouldSkip(file)) {
      skipped++;
      continue;
    }

    const ext   = extname(file).toLowerCase();
    const maxW  = isHero(file) ? MAX_WIDTHS.hero : MAX_WIDTHS.default;
    const sizeBefore = fileStat.size;
    totalBefore += sizeBefore;

    try {
      const img  = sharp(filePath);
      const meta = await img.metadata();

      const resizeOpts = meta.width && meta.width > maxW
        ? { width: maxW, withoutEnlargement: true }
        : { withoutEnlargement: true };

      const tmpPath = filePath + '.tmp';

      if (ext === '.png') {
        await img
          .resize(resizeOpts)
          .png({ quality: Math.round(PNG_QUALITY[1] * 100), compressionLevel: 9, adaptiveFiltering: true })
          .toFile(tmpPath);
      } else {
        await img
          .resize(resizeOpts)
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
          .toFile(tmpPath);
      }

      const sizeAfter = (await stat(tmpPath)).size;

      // Only replace if we actually made it smaller
      if (sizeAfter < sizeBefore) {
        await rename(tmpPath, filePath);
        totalAfter += sizeAfter;
        const saved = Math.round((1 - sizeAfter / sizeBefore) * 100);
        console.log(`  ✓  ${file.padEnd(60)} ${fmtKB(sizeBefore).padStart(8)} → ${fmtKB(sizeAfter).padStart(8)}  (−${saved}%)`);
        processed++;
      } else {
        // Already well-compressed — keep original
        const { unlink } = await import('node:fs/promises');
        await unlink(tmpPath);
        totalAfter += sizeBefore;
        console.log(`  –  ${file.padEnd(60)} ${fmtKB(sizeBefore).padStart(8)}  (already optimal)`);
        skipped++;
      }
    } catch (err) {
      totalAfter += fileStat.size;
      console.log(`  !  ${file.padEnd(60)} ${err.message}`);
      skipped++;
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log(`  Total before : ${fmtKB(totalBefore)} (${(totalBefore / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`  Total after  : ${fmtKB(totalAfter)}  (${(totalAfter / 1024 / 1024).toFixed(1)} MB)`);
  if (totalBefore > 0) {
    const savedPct = Math.round((1 - totalAfter / totalBefore) * 100);
    const savedMB  = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
    console.log(`  Saved        : ${savedMB} MB  (${savedPct}%)`);
  }
  console.log(`  Compressed   : ${processed}   Skipped: ${skipped}`);
  console.log('─'.repeat(80) + '\n');
}

run().catch(console.error);
