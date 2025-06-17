import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(new URL('src', import.meta.url).pathname), // 👈 this makes @/ point to /src at the root in ESM
    },
  },
});
