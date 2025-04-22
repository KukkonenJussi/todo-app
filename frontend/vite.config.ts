/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testSetup.ts',
    include: [
      'src/components/__tests__/**/*.test.tsx',
      'src/services/__tests__/**/*.test.ts',
    ]
  },
})
