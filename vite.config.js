import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// Bundle analysis is opt-in, so it never runs on a normal build or a Cloudflare
// deploy:  npm run analyze  ->  writes dist/stats.html (open it in a browser).
// This is what showed that @supabase/* (162 KB gzip, incl. auth + realtime the
// public site never uses) was being pulled into the entry chunk by the eagerly
// imported blog routes. Worth re-running before assuming the bundle is clean —
// "unused JS" tooling won't catch code that is used, just loaded too early.
const analyze = process.env.ANALYZE === '1'

export default defineConfig({
  plugins: [
    tailwindcss(),
      react(),
    analyze &&
      visualizer({
        filename: 'dist/stats.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
})
