import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        "Cross-Origin-Embedder-Policy": "unsafe-none"
      },
      proxy: !env.VITE_API_URL
        ? {
            '/auth': { target: 'http://localhost:5000', changeOrigin: true },
            '/student': { target: 'http://localhost:5000', changeOrigin: true },
            '/teacher': { target: 'http://localhost:5000', changeOrigin: true },
            '/admin': { target: 'http://localhost:5000', changeOrigin: true },
            '/payment': { target: 'http://localhost:5000', changeOrigin: true },
            '/leads': { target: 'http://localhost:5000', changeOrigin: true },
          }
        : {},
    },
  }
})