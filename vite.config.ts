import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'build' ? '/skinnygenes-shop/' : '/',
    appType: 'spa',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mantine-vendor': ['@mantine/core', '@mantine/hooks'],
            'three-vendor': ['three', '@react-three/fiber']
          },
        },
      },
      chunkSizeWarningLimit: 1000
    },
    server: {
      port: 3000
    }
  };
});