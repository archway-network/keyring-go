const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const context = {
  tmpDir: fs.mkdtempSync(path.join(os.tmpdir(), "archway-keyring-test-")),
};

["file", "os", "unencrypted"].forEach((test) =>
  require(`./${test}`).run(context)
);

try {
  fs.rmSync(context.tmpDir, { recursive: true });
} catch (e) {
  console.error(
    `An error has occurred while cleaning up the temp folder at ${tmpDir}`
  );
}

console.log("");
console.log("All tests passed!");
