import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

export default defineConfig(({ mode }) => {

  const __dirname = dirname(fileURLToPath(import.meta.url))

  const env = loadEnv(mode, process.cwd())

  const isDev = process.env.NODE_ENV === 'development'

  return {
    plugins: [react()],
    server: isDev
      ? {
        host: env.VITE_DEV_HOST,
        port: parseInt(env.VITE_DEV_PORT, 10),
        cors: {
          origin: `https://${env.VITE_DEV_HOST}`,
          credentials: true,
        },
        https: {
          key: readFileSync(resolve(__dirname, env.VITE_DEV_KEY_PATH)),
          cert: readFileSync(resolve(__dirname, env.VITE_DEV_CERT_PATH)),
        },
      }
      : undefined,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@services': resolve(__dirname, 'src/services'),
        '@contexts': resolve(__dirname, 'src/contexts'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@constants': resolve(__dirname, 'src/constants'),
      },
    },
  }
})