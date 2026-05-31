export default {
    base: "./",
    publicDir: false,
    server: {
        proxy: {
            "/calculation_type": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
            // backward compatibility: also proxy old /requests path to the same backend
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
