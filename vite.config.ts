import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/img/[name][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "css/[name][extname]";
          }

          if (/\.(woff2?|ttf|otf|eot|svg)$/.test(name ?? "")) {
            return "fonts/[name][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name][extname]";
        },
      },
    },
  },
})
