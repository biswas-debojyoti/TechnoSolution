import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
//    server: {
//   host: true
// },
server: {
   port: 3002,
    allowedHosts: ['sanford-unsoothing-melvina.ngrok-free.dev']
  },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    
  };
});
