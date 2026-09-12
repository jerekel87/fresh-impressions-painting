import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Hero images are excluded — they need full quality for the large display area
      exclude: /hero/i,
      // JPEG/JPG: mozjpeg progressive, quality 72 — good balance of size vs. quality
      jpg: {
        quality: 72,
        progressive: true,
        mozjpeg: true,
      },
      jpeg: {
        quality: 72,
        progressive: true,
        mozjpeg: true,
      },
      // PNG: max compression level, adaptive filtering
      png: {
        quality: 75,
        compressionLevel: 9,
        adaptiveFiltering: true,
      },
      // WebP fallback if Vite encounters any — keep sharp
      webp: {
        lossless: false,
        quality: 75,
        effort: 6,
      },
      cache: false,
      logStats: true,
    }),
  ],
  // Forge starts the dev server with PORT set and passes port flags after a
  // literal "--" (which Vite 5 ignores), so honor PORT from the environment.
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
    host: "localhost",
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    target: 'es2020',
    // One stylesheet for the whole app. With code splitting on, Rollup also
    // listed it as a dependency of the lazy route chunks, so the postbuild
    // inliner could not actually remove the request. Tailwind produces a
    // single global sheet anyway, so there is nothing to split.
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
});
