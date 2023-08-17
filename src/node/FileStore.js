const fs = require("fs");
const path = require("path");
const keyring = require("node-gyp-build")(path.join(__dirname, "../.."));

const { checkErrorInResponse, resolveTilde } = require("./utils");

function set(fileSaveDir, fileName, data, password) {
  const result = keyring.setFileStore(fileSaveDir, fileName, data, password);

  checkErrorInResponse(result);

  return result;
}

function get(fileSaveDir, fileName, password) {
  const result = keyring.getFileStore(fileSaveDir, fileName, password);

  checkErrorInResponse(result);

  return result;
}

/**
 *
 * @param {string} fileSaveDir
 * @param {string} fileName
 * @param {string} password
 * @returns {Uint8Array} bytes of the file
 */
function getBytes(fileSaveDir, fileName, password) {
  return keyring.getFileStoreBytes(fileSaveDir, fileName, password);
}

function list(fileSaveDir) {
  const result = keyring.listFileStore(fileSaveDir);

  if (result?.length === 1) checkErrorInResponse(result[0]);

  return result;
}

function remove(fileSaveDir, fileName) {
  const filePath = resolveTilde(path.join(fileSaveDir, fileName));

  if (!fs.existsSync(filePath)) throw new Error("The specified item could not be found in the keychain");

  const result = keyring.deleteFileStore(fileSaveDir, fileName);

  checkErrorInResponse(result);
}

module.exports = {
  get,
  getBytes,
  set,
  list,
  remove,
};
