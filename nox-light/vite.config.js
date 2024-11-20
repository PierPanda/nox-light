import { defineConfig } from 'vite'

export default defineConfig({
  root: './index.html',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.glb'],
});
