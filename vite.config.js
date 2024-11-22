import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  assetsInclude: ['**/*.glb'],
});
