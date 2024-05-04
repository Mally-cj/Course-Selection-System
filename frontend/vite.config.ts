import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8088',
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react(), TanStackRouterVite()],
})
