import { realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = realpathSync(fileURLToPath(new URL('.', import.meta.url)))

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: process.env.AMZ_API_PROXY_TARGET || 'http://127.0.0.1:8787',
        changeOrigin: false,
      },
    },
  }
})
