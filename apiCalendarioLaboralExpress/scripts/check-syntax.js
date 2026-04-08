const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function getJsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getJsFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

const root = path.resolve(__dirname, "..");
const files = getJsFiles(path.join(root, "src")).concat(
  getJsFiles(path.join(root, "scripts"))
);

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status);
  }
}

console.log("Sintaxis verificada.");
