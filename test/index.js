const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const context = {
  tmpDir: fs.mkdtempSync(path.join(os.tmpdir(), "archway-keyring-test-")),
};

["file", process.env.CI != "true" && "os", "unencrypted"]
  .filter((item) => item)
  .forEach((test) => {
    console.log(`\n=> Testing ${test}`);
    require(`./${test}`).run(context);
  });

try {
  fs.rmSync(context.tmpDir, { recursive: true });
} catch (e) {
  console.error(
    `An error has occurred while cleaning up the temp folder at ${tmpDir}`
  );
}

console.log("\nAll tests passed!");
