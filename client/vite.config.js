import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "..",
  root: '.',
  build: {
    manifest: true,
  },
})
