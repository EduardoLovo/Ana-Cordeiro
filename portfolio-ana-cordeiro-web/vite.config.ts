import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- O fiscal estava reclamando aqui

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
