// copy-static-pages.js
import fs from 'fs'
import path from 'path'

const srcDir = './pages'
const distDir = './dist/pages'

function copyFileSync(source, target) {
  const targetDir = path.dirname(target)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  fs.copyFileSync(source, target)
}

function copyPages(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true })

  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyPages(srcPath, destPath)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      copyFileSync(srcPath, destPath)
      console.log(`📄 Copied: ${srcPath} -> ${destPath}`)
    }
  })
}

copyPages(srcDir, distDir)
