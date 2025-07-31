import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'dev.quemvaivai',
    port: 5173, // ou outra porta, se necessário
  }
})