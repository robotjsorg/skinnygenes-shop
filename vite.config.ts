import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '',
    appType: 'spa', // Explicitly declare as SPA
    build: {
      outDir: 'dist', // Output directory for the build
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries into separate chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mantine-vendor': ['@mantine/core', '@mantine/hooks'],
            'three-vendor': ['three', '@react-three/fiber'],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB for better visibility
    },
    server: {
      port: 3000, // Development server port
    },
  };
});