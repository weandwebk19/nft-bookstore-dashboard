// import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
    alias: {
      // Add your alias configurations here
      "@": "/src",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@contexts": "/src/contexts",
      "@styles": "/src/styles"
      // ...
    }
  },
  loader: { ".js": "jsx" }
});
