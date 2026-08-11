import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * `base` is "/" for a user site (aadeshsingh.github.io).
 * If this ever moves to a project repo, set BASE_PATH in the workflow —
 * e.g. BASE_PATH=/portfolio/ — and nothing else needs to change.
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
  build: {
    target: "es2020",
    assetsInlineLimit: 2048,
  },
});
