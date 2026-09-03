import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "smart-mailto/react": path.resolve(__dirname, "../../packages/smart-mailto/src/react.ts"),
      "smart-mailto": path.resolve(__dirname, "../../packages/smart-mailto/src/index.ts"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
