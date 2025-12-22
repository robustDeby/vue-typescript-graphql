import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { yoga } from './src/yoga';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'graphql-yoga',
      configureServer(server) {
        server.middlewares.use('/graphql', yoga);
      },
    },
  ],
});
