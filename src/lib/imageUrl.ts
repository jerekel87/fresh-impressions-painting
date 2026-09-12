/**
 * Supabase Storage image helpers.
 *
 * Images uploaded through the admin are served from Storage at their original
 * upload size, which on the About page meant three photos totalling roughly
 * 900 KB on a phone. Routing them through Supabase's render endpoint lets us
 * ask for a width that matches how the image is actually displayed.
 *
 * resize=contain is required. Without it Supabase defaults to resize=cover,
 * which on a width-only request distorts/crops the file (a portrait image
 * keeps its full original height while the width is forced down). contain
 * scales proportionally and never crops.
 *
 * Non-Storage URLs (Pexels and other external links) pass through unchanged.
 */

const STORAGE_PATH = '/storage/v1/object/public/';
const RENDER_PATH = '/storage/v1/render/image/public/';

export function supabaseImgUrl(url: string, width = 600, quality = 78): string {
  if (!url || !url.includes(STORAGE_PATH)) return url;
  const base = url.replace(STORAGE_PATH, RENDER_PATH);
  return `${base}?width=${width}&quality=${quality}&resize=contain`;
}

/**
 * Builds a srcset so phones download a phone-sized file instead of the
 * desktop one. Returns an empty string for non-Storage URLs, which callers
 * should spread so no srcset attribute is emitted at all.
 */
export function supabaseImgSrcSet(url: string, widths: number[], quality = 78): string {
  if (!url || !url.includes(STORAGE_PATH)) return '';
  return widths.map((w) => `${supabaseImgUrl(url, w, quality)} ${w}w`).join(', ');
}
