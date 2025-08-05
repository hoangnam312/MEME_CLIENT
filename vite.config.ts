// http
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});

// // https
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import mkcert from 'vite-plugin-mkcert'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), mkcert()],
//   resolve: {
//     alias: {
//       src: "/src",
//     },
//   },
//   server: {
//     https: true,
//     host: 'localhost',
//     port: 5173,
//   },
// });
