const fs = require("fs");
const path = require("path");

function set(fileSaveDir, fileName, data, encoding = "utf-8") {
  try {
    const filePath = resolveTilde(path.join(fileSaveDir, fileName));
    fs.mkdirSync(fileSaveDir, { recursive: true });
    fs.writeFileSync(filePath, data, { encoding });
    return "success";
  } catch (err) {
    console.error(`Unexpected error when writing to file.`);
    throw err;
  }
}

function get(fileSaveDir, fileName, encoding = "utf-8") {
  try {
    const filePath = resolveTilde(path.join(fileSaveDir, fileName));
    const data = fs.readFileSync(filePath, { encoding });
    return data;
  } catch (err) {
    console.error(`Unexpected error when reading file`);
    throw err;
  }
}

// Resolves paths that start with a tilde to the user's home directory.
function resolveTilde(filePath) {
  const os = require("os");
  if (!filePath || typeof filePath !== "string") {
    return "";
  }

  // '~/folder/path' or '~' not '~alias/folder/path'
  if (filePath.startsWith("~/") || filePath === "~") {
    return filePath.replace("~", os.homedir());
  }

  return filePath;
}

module.exports = {
  get,
  set,
};
