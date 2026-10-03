/* Vite solo para desarrollo: npm run dev sirve src/ con recarga en vivo.

   El juego que se publica no sale de aquí sino de npm run build
   (pruebas/empaquetar.js), que lo deja en un único index.html autónomo. */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src",
  plugins: [react()],
  server: { port: 5176 },
  build: { outDir: "../desarrollo", emptyOutDir: true },
});
