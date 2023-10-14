import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      api: `${path.resolve(__dirname, "./src/api/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      helpers: `${path.resolve(__dirname, "./src/helpers/")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      routes: `${path.resolve(__dirname, "./src/routes/")}`,
      store: `${path.resolve(__dirname, "./src/store/")}`,
      utilities: `${path.resolve(__dirname, "./src/utilities/")}`
    }
  }
})
