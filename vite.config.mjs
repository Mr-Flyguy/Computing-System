import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/calculation_type": "http://localhost:3000"
        }
    },
    build: {
        outDir: "dist",
        emptyOutDir: true
    }
});
