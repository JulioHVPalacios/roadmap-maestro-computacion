import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  optimizeDeps: {
    include: ["gsap", "lenis", "howler"],
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    reportCompressedSize: false,
  },
})