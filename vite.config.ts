import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/skinnygenes.shop/', // Adjust the base path for GitHub Pages
  build: {
    outDir: 'dist', // Output directory for the build
  },
  server: {
    port: 3000, // Development server port
  },
});