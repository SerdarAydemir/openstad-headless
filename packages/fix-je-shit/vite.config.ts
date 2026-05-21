import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
    };
  } else {
    return {
      plugins: [react({ jsxRuntime: 'classic' })],
      build: {
        lib: {
          formats: ['iife'],
          entry: 'src/fix-je-shit.tsx',
          name: 'OpenstadHeadlessFixJeShit',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'remixicon/fonts/remixicon.css'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    };
  }
});
