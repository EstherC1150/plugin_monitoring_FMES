/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");

async function main() {
  const args = process.argv.slice(2);
  const isLocal = args.includes("--local");

  const repoRoot = path.resolve(__dirname, "..");
  const entry = path.join(repoRoot, "plugin", "deployEntry.js");
  
  let outDir, outFile, format;

  if (isLocal) {
    // 로컬 개발용 Fallback 번들링
    outDir = path.join(repoRoot, "plugin", "dist");
    outFile = path.join(outDir, "index.bundle.js");
    format = "esm"; // import()로 로드하기 위해 ESM 포맷 사용
  } else {
    // 배포용 번들링 (deploy.py에서 사용)
    outDir = path.join(repoRoot, "tmp");
    outFile = path.join(outDir, "index.deploy.js");
    format = "iife"; // 레거시 호스트 호환성을 위해 IIFE 포맷 유지
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`[build] Starting build... Mode: ${isLocal ? "Local-Fallback" : "Deploy"}`);

  const buildOptions = {
    entryPoints: [entry],
    bundle: true,
    write: isLocal, // 로컬 빌드는 바로 파일로 씀
    outfile: isLocal ? outFile : undefined,
    format: format,
    target: ["es2019"],
    minify: false,
    sourcemap: false,
    legalComments: "none",
  };

  if (isLocal) {
    await esbuild.build(buildOptions);
    console.log(`[build] Local fallback bundle created at: ${path.relative(repoRoot, outFile)}`);
  } else {
    // 배포용은 기존처럼 전역 변수 노출 래퍼 추가
    const result = await esbuild.build({
      ...buildOptions,
      globalName: "__FemsDeploy",
      write: false,
    });

    const bundled = result.outputFiles[0].text;
    const wrapped = `${bundled}\n\n// NextSpace 호스트(eval)에서 호출될 엔트리\nfunction Run(params){\n  return __FemsDeploy.Run(params);\n}\n`;
    
    fs.writeFileSync(outFile, wrapped, "utf8");
    console.log(`[build] Deploy bundle created at: ${path.relative(repoRoot, outFile)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
