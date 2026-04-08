import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Default ignores (even if not in .gitignore)
const DEFAULT_IGNORES = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  ".turbo",
  ".vercel",
  ".DS_Store",
]);

function loadGitignore(rootDir) {
  const gitignorePath = path.join(rootDir, ".gitignore");

  if (!fs.existsSync(gitignorePath)) return [];

  return fs
    .readFileSync(gitignorePath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

const gitignorePatterns = loadGitignore(ROOT);

function shouldIgnore(name, relativePath) {
  if (DEFAULT_IGNORES.has(name)) return true;

  return gitignorePatterns.some((pattern) => {
    // Remove trailing slash for folder patterns
    const cleanPattern = pattern.replace(/\/$/, "");

    // Match exact name
    if (name === cleanPattern) return true;

    // Match relative path
    if (relativePath === cleanPattern) return true;

    // Match folder/file inside ignored path
    if (relativePath.startsWith(cleanPattern + "/")) return true;

    return false;
  });
}

function printTree(dir, prefix = "", baseDir = ROOT) {
  let files = fs
    .readdirSync(dir)
    .filter((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, "/");
      return !shouldIgnore(file, relativePath);
    })
    .sort((a, b) => {
      const aPath = path.join(dir, a);
      const bPath = path.join(dir, b);

      const aIsDir = fs.statSync(aPath).isDirectory();
      const bIsDir = fs.statSync(bPath).isDirectory();

      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

  const lastIndex = files.length - 1;

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === lastIndex;

    const connector = isLast ? "└── " : "├── ";
    console.log(prefix + connector + file);

    if (fs.statSync(filePath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(filePath, newPrefix, baseDir);
    }
  });
}

console.log(path.basename(ROOT));
printTree(ROOT);