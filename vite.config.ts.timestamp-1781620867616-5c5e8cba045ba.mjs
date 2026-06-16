// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { ViteImageOptimizer } from "file:///home/project/node_modules/vite-plugin-image-optimizer/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Hero images are excluded — they need full quality for the large display area
      exclude: /hero/i,
      // JPEG/JPG: mozjpeg progressive, quality 72 — good balance of size vs. quality
      jpg: {
        quality: 72,
        progressive: true,
        mozjpeg: true
      },
      jpeg: {
        quality: 72,
        progressive: true,
        mozjpeg: true
      },
      // PNG: max compression level, adaptive filtering
      png: {
        quality: 75,
        compressionLevel: 9,
        adaptiveFiltering: true
      },
      // WebP fallback if Vite encounters any — keep sharp
      webp: {
        lossless: false,
        quality: 75,
        effort: 6
      },
      cache: false,
      logStats: true
    })
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-supabase": ["@supabase/supabase-js"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgLy8gSGVybyBpbWFnZXMgYXJlIGV4Y2x1ZGVkIFx1MjAxNCB0aGV5IG5lZWQgZnVsbCBxdWFsaXR5IGZvciB0aGUgbGFyZ2UgZGlzcGxheSBhcmVhXG4gICAgICBleGNsdWRlOiAvaGVyby9pLFxuICAgICAgLy8gSlBFRy9KUEc6IG1vempwZWcgcHJvZ3Jlc3NpdmUsIHF1YWxpdHkgNzIgXHUyMDE0IGdvb2QgYmFsYW5jZSBvZiBzaXplIHZzLiBxdWFsaXR5XG4gICAgICBqcGc6IHtcbiAgICAgICAgcXVhbGl0eTogNzIsXG4gICAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxuICAgICAgICBtb3pqcGVnOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGpwZWc6IHtcbiAgICAgICAgcXVhbGl0eTogNzIsXG4gICAgICAgIHByb2dyZXNzaXZlOiB0cnVlLFxuICAgICAgICBtb3pqcGVnOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIC8vIFBORzogbWF4IGNvbXByZXNzaW9uIGxldmVsLCBhZGFwdGl2ZSBmaWx0ZXJpbmdcbiAgICAgIHBuZzoge1xuICAgICAgICBxdWFsaXR5OiA3NSxcbiAgICAgICAgY29tcHJlc3Npb25MZXZlbDogOSxcbiAgICAgICAgYWRhcHRpdmVGaWx0ZXJpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICAgLy8gV2ViUCBmYWxsYmFjayBpZiBWaXRlIGVuY291bnRlcnMgYW55IFx1MjAxNCBrZWVwIHNoYXJwXG4gICAgICB3ZWJwOiB7XG4gICAgICAgIGxvc3NsZXNzOiBmYWxzZSxcbiAgICAgICAgcXVhbGl0eTogNzUsXG4gICAgICAgIGVmZm9ydDogNixcbiAgICAgIH0sXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBsb2dTdGF0czogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3ZlbmRvci1yZWFjdCc6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAndmVuZG9yLXN1cGFiYXNlJzogWydAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUywwQkFBMEI7QUFFbkMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sbUJBQW1CO0FBQUE7QUFBQSxNQUVqQixTQUFTO0FBQUE7QUFBQSxNQUVULEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixTQUFTO0FBQUEsTUFDWDtBQUFBO0FBQUEsTUFFQSxLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixtQkFBbUI7QUFBQSxNQUNyQjtBQUFBO0FBQUEsTUFFQSxNQUFNO0FBQUEsUUFDSixVQUFVO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLGdCQUFnQixDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxVQUN6RCxtQkFBbUIsQ0FBQyx1QkFBdUI7QUFBQSxRQUM3QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
