/**
 * The company logo, in one place.
 *
 * It renders in five spots at slightly different heights. Before this it was a
 * single 400px PNG imported through the bundler, which meant every page shipped
 * about 21 KB to display a mark roughly 124 CSS px wide. It is flat artwork, so
 * WebP is far smaller than PNG at the same quality, and the srcset lets a phone
 * take the 200 or 300px file instead of the 400px one.
 *
 * Files come from public/ so they keep stable names. Bump LOGO_VERSION in
 * scripts/generate-image-variants.mjs when the artwork changes.
 */
const LOGO_FALLBACK = '/logo/logo-v1-400.png';
const LOGO_SRCSET_PNG =
  '/logo/logo-v1-200.png 200w, /logo/logo-v1-300.png 300w, /logo/logo-v1-400.png 400w';
const LOGO_SRCSET_WEBP =
  '/logo/logo-v1-200.webp 200w, /logo/logo-v1-300.webp 300w, /logo/logo-v1-400.webp 400w';

// Widest place it renders is the desktop navbar at 60px tall, about 124px wide.
const LOGO_SIZES = '128px';

interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  alt?: string;
}

export default function BrandLogo({
  className,
  width = 128,
  height = 62,
  loading,
  alt = 'Fresh Impressions Painting',
}: BrandLogoProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={LOGO_SRCSET_WEBP} sizes={LOGO_SIZES} />
      <img
        src={LOGO_FALLBACK}
        srcSet={LOGO_SRCSET_PNG}
        sizes={LOGO_SIZES}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
}
