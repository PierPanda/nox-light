import { defineConfig } from 'vite'

export default defineConfig({
  root: './path/to/your/index.html',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.glb'],
});
