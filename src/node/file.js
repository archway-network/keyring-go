const fs = require("node:fs");
const path = require("node:path");
const keyring = require("node-gyp-build")(path.join(__dirname, "../.."));

const { checkErrorInResponse, resolveTilde } = require("./utils");

function set(fileSaveDir, fileName, data, password) {
  const result = keyring.setFileStore(fileSaveDir, fileName, data, password);

  checkErrorInResponse(result);

  return result;
}

/**
 * Returns a `String` with the unencrypted file content.
 *
 * @param {string} fileSaveDir
 * @param {string} fileName
 * @param {string} password
 * @returns {Uint8Array} unencrypted bytes of the file
 */
function get(fileSaveDir, fileName, password) {
  const result = keyring.getFileStore(fileSaveDir, fileName, password);

  checkErrorInResponse(result);

  return result;
}

/**
 * Returns an unencrypted `Uint8Array` of the file content.
 *
 * @param {string} fileSaveDir
 * @param {string} fileName
 * @param {string} password
 * @returns {Uint8Array} unencrypted bytes of the file
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
