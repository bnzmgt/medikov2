// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./styleguide.html",
        ".pages/**/*.html",
        "./src/**/*.{js,ts,jsx,tsx}", // sesuaikan kalau nanti pakai Vue/React
    ],
    theme: {
        extend: {
            fontFamily: {
            custom: ['SanFrancisco', 'sans-serif'], // 'custom' is your utility class name
          },
        },
    },
    plugins: [require("daisyui")],

    // (opsional) setting default theme DaisyUI
    daisyui: {
        themes: ["light", "dark", "cupcake"], // bisa pilih/ubah sesuai kebutuhan
    },
};
