import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: './public/assets'
  },
  assetsInclude: ['**/*.glb'],
});
