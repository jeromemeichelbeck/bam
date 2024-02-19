import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

console.log(path.resolve(__dirname, "./src"));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
