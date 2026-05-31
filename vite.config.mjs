import { defineConfig } from "vite";

export default defineConfig({
    publicDir: false,
    server: {
        proxy: {
            "/calculation_type": "http://localhost:3000"
        }
    },
    build: {
        outDir: "public",
        emptyOutDir: true
    }
});
