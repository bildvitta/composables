import { resolve } from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),

      fileName: 'index',

      formats: ['es']
    },

    rollupOptions: {
      external: ['vue', 'vue-demi'],

      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },

  plugins: [
    dts()
  ]
})
