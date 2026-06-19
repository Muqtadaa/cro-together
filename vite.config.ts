import { defineConfig, Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolves Figma Make's proprietary figma:asset/ image imports to empty strings.
// Images will be absent but the build won't fail. Replace with real image paths later.
const figmaAssetsPlugin: Plugin = {
  name: 'figma-assets',
  resolveId(id: string) {
    if (id.startsWith('figma:asset/')) return '\0' + id;
  },
  load(id: string) {
    if (id.startsWith('\0figma:asset/')) return 'export default ""';
  },
}

export default defineConfig({
  plugins: [
    figmaAssetsPlugin,
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
