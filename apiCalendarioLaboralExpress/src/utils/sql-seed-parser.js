const fs = require("fs");

function splitSqlValues(rawValues) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < rawValues.length; index += 1) {
    const char = rawValues[index];

    if (char === "'") {
      inQuotes = !inQuotes;
      current += char;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    values.push(current.trim());
  }

  return values.map((value) => {
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1);
    }

    if (/^(true|false)$/i.test(value)) {
      return value.toLowerCase() === "true";
    }

    if (/^-?\d+$/.test(value)) {
      return Number(value);
    }

    return value;
  });
}

function parseInsertStatements(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("INSERT INTO "));

  return lines.map((line) => {
    const match = line.match(
      /^INSERT INTO\s+([^(]+)\(([^)]+)\)\s+VALUES\s*\((.+)\);$/i
    );

    if (!match) {
      throw new Error(`No se pudo interpretar la linea SQL: ${line}`);
    }

    const [, tableName, rawColumns, rawValues] = match;
    const columns = rawColumns.split(",").map((column) => column.trim());
    const values = splitSqlValues(rawValues);
    const payload = {};

    columns.forEach((column, index) => {
      payload[column] = values[index];
    });

    return {
      tableName: tableName.trim(),
      payload,
    };
  });
}

module.exports = { parseInsertStatements };
