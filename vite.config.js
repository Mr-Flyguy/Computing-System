export default {
    base: "./",
    publicDir: false,
    server: {
        proxy: {
            "/requests": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: "./public",
        emptyOutDir: true,
    },
};
