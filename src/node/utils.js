const ERROR_PREFIX = "[-!ERROR-]: ";

// Checks if a keystore response has the error prefix and throws error accordingly
function checkErrorInResponse(value) {
  if (value?.toString?.()?.startsWith(ERROR_PREFIX)) {
    throw new Error(value.toString().replace(ERROR_PREFIX, ""));
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
  checkErrorInResponse,
  resolveTilde,
};
