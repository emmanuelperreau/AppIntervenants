import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/AppIntervenants/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,json,woff2}'],
                navigateFallback: null
            },
            manifest: false,
            injectRegister: null,
        })
    ],
    esbuild: {
        drop: ['console', 'debugger']
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          simulateur: 'simulateur.html'
        }
      }
    }
});
