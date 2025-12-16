import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
    return {
        plugins: [tailwindcss()],
        base: "/mediko/", // 👈 disesuaikan
        build: {
            manifest: "manifest.json",
        },
    };
});
