/**
 * Inlines the built stylesheet into index.html.
 *
 * PageSpeed's network dependency tree showed the stylesheet as the longest
 * pole in the critical path: the HTML resolved at ~500 ms, the JS at ~810 ms,
 * and the stylesheet at ~1,143 ms. Nothing can paint until it arrives, so that
 * round trip sets the floor for First Contentful Paint.
 *
 * The build emits a single stylesheet and no lazy chunk declares a CSS
 * dependency, so moving it into a <style> tag removes the request entirely.
 * The file is left on disk so any cached HTML still referencing it keeps
 * working.
 *
 * Runs as part of `npm run build`, after vite build.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const HTML = join(DIST, 'index.html');

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

async function run() {
  let html;
  try {
    html = await readFile(HTML, 'utf8');
  } catch {
    console.error('[inline-css] dist/index.html not found; run vite build first');
    process.exitCode = 1;
    return;
  }

  // Vite emits: <link rel="stylesheet" crossorigin href="/assets/index-HASH.css">
  const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/;
  const match = html.match(linkRe);

  if (!match) {
    console.log('[inline-css] no stylesheet link found in index.html, nothing to do');
    return;
  }

  const href = match[1];
  const cssPath = join(DIST, href.replace(/^\//, ''));

  let css;
  try {
    css = await readFile(cssPath, 'utf8');
  } catch {
    console.error(`[inline-css] could not read ${cssPath}; leaving the link in place`);
    process.exitCode = 1;
    return;
  }

  // Nothing in the CSS should be able to terminate the style element early.
  if (/<\/style/i.test(css)) {
    console.error('[inline-css] stylesheet contains "</style"; leaving the link in place');
    process.exitCode = 1;
    return;
  }

  const before = (await stat(HTML)).size;
  await writeFile(HTML, html.replace(linkRe, `<style>${css}</style>`), 'utf8');
  const after = (await stat(HTML)).size;

  console.log(
    `[inline-css] inlined ${href} (${kb(css.length)}), removed one render-blocking request. ` +
      `index.html ${kb(before)} -> ${kb(after)}`
  );
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
