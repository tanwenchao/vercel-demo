import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': '@/src/',      //格式一定要写对喽不然没有代码提示或者报错
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://v1.gptapi.cn/',
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
