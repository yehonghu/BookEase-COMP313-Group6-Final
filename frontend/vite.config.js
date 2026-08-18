import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const pagesBuild = env.VITE_DEPLOY_TARGET === 'pages';

  return {
    base: pagesBuild ? '/BookEase-COMP313-Group6-Final/' : '/',
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      hmr: { clientPort: 3000 },
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_PROXY || 'http://localhost:5001',
          changeOrigin: true,
        },
      },
    },
  };
});
