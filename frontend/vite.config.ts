import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    },
    strictPort: true,
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    tsconfigPaths()
  ],
})
