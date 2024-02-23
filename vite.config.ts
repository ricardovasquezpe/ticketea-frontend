/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    plugins: [react()],
    preview: {
        port: 8080,
        strictPort: true,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["src/setupTest.ts"],
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    }
});