// inject-assets.js
import fs from "fs";
import path from "path";

// Path manifest baru (Vite 5+)
const manifestPath = "./dist/manifest.json";
const basePath = "/mediko/"; // sesuai vite.config.js

// 1. Cek apakah manifest ada
if (!fs.existsSync(manifestPath)) {
    console.error("❌ manifest.json tidak ditemukan:", manifestPath);
    process.exit(1);
}

// 2. Ambil info asset dari manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
const jsFile = manifest["index.html"].file;
const cssFiles = manifest["index.html"].css || [];

// 3. Inject ke file HTML
function injectToFile(filePath) {
    let html = fs.readFileSync(filePath, "utf-8");

    // --- Inject CSS ---
    const cssTags = cssFiles.map(f => `<link rel="stylesheet" href="${basePath}${f}">`).join("\n");

    if (!html.includes(cssTags)) {
        // Tambahkan CSS tepat sebelum </head>
        html = html.replace(/<\/head>/i, `${cssTags}\n</head>`);
    }

    // --- Hapus script development (src/main.js) ---
    html = html.replace(/<script[^>]*src="\/src\/main\.js"[^>]*><\/script>\s*/gi, "");

    // --- Inject JS hasil build ---
    const jsTag = `<script type="module" src="${basePath}${jsFile}"></script>`;
    if (!html.includes(jsTag)) {
        html = html.replace(/<\/body>/i, `${jsTag}\n</body>`);
    }

    fs.writeFileSync(filePath, html, "utf-8");
    console.log(`✅ Injected: ${filePath}`);
}

// 4. Telusuri folder dist untuk semua HTML (kecuali index.html)
function walkAndInject(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkAndInject(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html") {
            injectToFile(fullPath);
        }
    }
}

// Jalankan
walkAndInject("./dist");
