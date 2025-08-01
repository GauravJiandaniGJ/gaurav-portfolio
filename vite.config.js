import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // alias fix for @ usage (optional but helps for "@/components" etc)
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
