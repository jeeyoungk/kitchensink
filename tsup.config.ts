import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/chain.ts", "src/urls.ts"],
  format: ["cjs", "esm"],
  splitting: true,
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: "es2022",
  outDir: "dist",
});
