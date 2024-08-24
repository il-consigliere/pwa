import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  server: {
    proxy: {
      '/api/': {
        target: 'https://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
