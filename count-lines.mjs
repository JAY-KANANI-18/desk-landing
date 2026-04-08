import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ignore from "ignore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

// Folders always ignored
const DEFAULT_IGNORES = [
  "node_modules",
  "dist",
  "build",
  ".git",
  ".next",
  ".turbo",
  ".cache",
  "coverage",
  ".vercel",
  ".idea",
  ".vscode",
  "out",
];

// File extensions to count as "code"
const CODE_EXTENSIONS = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".json",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".html",
  ".md",
  ".yml",
  ".yaml",
  ".sh",
  ".env",
]);

async function loadGitignore(rootDir) {
  const ig = ignore();

  // Add default ignores
  ig.add(DEFAULT_IGNORES.map((d) => `${d}/`));

  try {
    const gitignorePath = path.join(rootDir, ".gitignore");
    const gitignoreContent = await fs.readFile(gitignorePath, "utf8");
    ig.add(gitignoreContent);
  } catch {
    // no .gitignore found, ignore silently
  }

  return ig;
}

function normalizeForIgnore(filePath) {
  return filePath.split(path.sep).join("/");
}

function isCodeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath).toLowerCase();

  // Allow .env and similar dot files
  if (base.startsWith(".env")) return true;

  return CODE_EXTENSIONS.has(ext);
}

async function countLinesInFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");

    // Count all lines
    const totalLines = content === "" ? 0 : content.split(/\r?\n/).length;

    // Count non-empty lines
    const nonEmptyLines = content
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "").length;

    return {
      totalLines,
      nonEmptyLines,
    };
  } catch {
    return {
      totalLines: 0,
      nonEmptyLines: 0,
    };
  }
}

async function walk(dir, ig, rootDir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = normalizeForIgnore(path.relative(rootDir, fullPath));

    if (ig.ignores(relativePath)) continue;

    if (entry.isDirectory()) {
      if (DEFAULT_IGNORES.includes(entry.name)) continue;
      await walk(fullPath, ig, rootDir, results);
    } else if (entry.isFile()) {
      results.push({
        fullPath,
        relativePath,
      });
    }
  }

  return results;
}

async function main() {
  const ig = await loadGitignore(ROOT);
  const files = await walk(ROOT, ig, ROOT);

  let totalAllLines = 0;
  let totalAllNonEmpty = 0;
  let totalCodeLines = 0;
  let totalCodeNonEmpty = 0;

  const perFile = [];
  const perExt = {};

  for (const file of files) {
    const counts = await countLinesInFile(file.fullPath);
    const ext = path.extname(file.relativePath).toLowerCase() || "[no-ext]";
    const code = isCodeFile(file.relativePath);

    totalAllLines += counts.totalLines;
    totalAllNonEmpty += counts.nonEmptyLines;

    if (code) {
      totalCodeLines += counts.totalLines;
      totalCodeNonEmpty += counts.nonEmptyLines;
    }

    if (!perExt[ext]) {
      perExt[ext] = {
        files: 0,
        totalLines: 0,
        nonEmptyLines: 0,
      };
    }

    perExt[ext].files += 1;
    perExt[ext].totalLines += counts.totalLines;
    perExt[ext].nonEmptyLines += counts.nonEmptyLines;

    perFile.push({
      file: file.relativePath,
      ext,
      code,
      totalLines: counts.totalLines,
      nonEmptyLines: counts.nonEmptyLines,
    });
  }

  // Sort largest files first
  perFile.sort((a, b) => b.totalLines - a.totalLines);

  const sortedExts = Object.entries(perExt).sort(
    (a, b) => b[1].totalLines - a[1].totalLines
  );

  console.log("\n========== LINE COUNT REPORT ==========\n");

  console.log("ROOT:", ROOT);
  console.log("\n--- TOTALS ---");
  console.log(`All files (total lines):      ${totalAllLines}`);
  console.log(`All files (non-empty lines):  ${totalAllNonEmpty}`);
  console.log(`Code files (total lines):     ${totalCodeLines}`);
  console.log(`Code files (non-empty lines): ${totalCodeNonEmpty}`);

  console.log("\n--- BY EXTENSION ---");
  for (const [ext, stats] of sortedExts) {
    console.log(
      `${ext.padEnd(10)} files: ${String(stats.files).padStart(3)} | total: ${String(
        stats.totalLines
      ).padStart(6)} | non-empty: ${String(stats.nonEmptyLines).padStart(6)}`
    );
  }

  console.log("\n--- TOP FILES ---");
  for (const file of perFile) {
    console.log(
      `${String(file.totalLines).padStart(5)} lines | ${String(
        file.nonEmptyLines
      ).padStart(5)} non-empty | ${file.file}`
    );
  }

  console.log("\n=======================================\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});