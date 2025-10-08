const fs = require("fs");
const path = require("path");

const SUPPORTED_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);
const IGNORED_DIRECTORIES = new Set(["node_modules", ".next", ".git", "vendor"]);

function collectTargets(targetPath, results) {
  let stats;
  try {
    stats = fs.statSync(targetPath);
  } catch (error) {
    return;
  }

  if (stats.isDirectory()) {
    for (const entry of fs.readdirSync(targetPath)) {
      if (IGNORED_DIRECTORIES.has(entry)) continue;
      collectTargets(path.join(targetPath, entry), results);
    }
    return;
  }

  if (!stats.isFile()) return;
  if (!SUPPORTED_EXTENSIONS.has(path.extname(targetPath))) return;

  results.add(path.resolve(targetPath));
}

function buildMessages(fileContent) {
  const lines = fileContent.split(/\r?\n/);
  const messages = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const column = line.indexOf("console.");
    if (column !== -1) {
      messages.push({
        ruleId: "no-console",
        message: "Unexpected console statement.",
        severity: 1,
        line: i + 1,
        column: column + 1,
      });
    }
  }

  return messages;
}

class FakeESLint {
  constructor(options = {}) {
    this.options = options;
  }

  async calculateConfigForFile() {
    return {
      plugins: ["@next/next"],
      rules: this.options?.baseConfig?.rules ?? {},
    };
  }

  async lintFiles(targets) {
    const fileSet = new Set();
    for (const target of targets) {
      const absoluteTarget = path.resolve(process.cwd(), target);
      collectTargets(absoluteTarget, fileSet);
    }

    const results = [];
    for (const filePath of fileSet) {
      let content = "";
      try {
        content = fs.readFileSync(filePath, "utf8");
      } catch (error) {
        continue;
      }

      const messages = buildMessages(content);
      const warningCount = messages.filter((message) => message.severity === 1).length;
      const errorCount = messages.filter((message) => message.severity === 2).length;

      results.push({
        filePath,
        messages,
        warningCount,
        errorCount,
        fatalErrorCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0,
      });
    }

    return results;
  }

  async loadFormatter() {
    return {
      format: (entries) =>
        entries
          .map((entry) =>
            entry.messages
              .map((message) =>
                `${entry.filePath}:${message.line}:${message.column} ${message.message}`
              )
              .join("\n")
          )
          .filter(Boolean)
          .join("\n"),
    };
  }
}

FakeESLint.version = "9.0.0";
FakeESLint.outputFixes = async () => {};
FakeESLint.getErrorResults = (results) => results.filter((result) => result.errorCount > 0);

module.exports = {
  ESLint: FakeESLint,
  CLIEngine: { version: "9.0.0" },
};
