import { resolve } from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),

      fileName: 'index.js',

      formats: ['es']
    },

    rollupOptions: {
      external: ['vue'],

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
