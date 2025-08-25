#!/usr/bin/env bun
import { execSync } from "child_process";
import { rmSync } from "fs";

async function build() {
  // Clean dist directory
  console.log("🧹 Cleaning dist directory...");
  rmSync("dist", { recursive: true, force: true });
  rmSync("docs", { recursive: true, force: true });

  try {
    // Build ESM
    console.log("📦 Building ESM...");
    const esmResult = await Bun.build({
      entrypoints: ["src/index.ts"],
      outdir: "dist",
      format: "esm",
      sourcemap: "external",
      target: "node",
      naming: "[name].js",
    });

    if (!esmResult.success) {
      console.error("ESM build failed:", esmResult.logs);
      process.exit(1);
    }

    // Build CJS
    console.log("📦 Building CJS...");
    const cjsResult = await Bun.build({
      entrypoints: ["src/index.ts"],
      outdir: "dist",
      format: "cjs",
      sourcemap: "external",
      target: "node",
      naming: "[name].cjs",
    });

    if (!cjsResult.success) {
      console.error("CJS build failed:", cjsResult.logs);
      process.exit(1);
    }

    // Generate TypeScript declarations
    console.log("📝 Generating TypeScript declarations...");
    execSync("tsc --emitDeclarationOnly --noEmit false --outDir dist", { stdio: "inherit" });

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

await build();
