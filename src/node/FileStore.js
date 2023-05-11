const keyring = require("../../build/Release/keyring-go");

const ERROR_PREFIX = "[-!ERROR-]: ";

function set(fileSaveDir, fileName, data, password) {
  const result = keyring.setFileStore(fileSaveDir, fileName, data, password);
  if (result.toString().startsWith(ERROR_PREFIX))
    throw new Error(result.replace(ERROR_PREFIX, ""));

  return result;
}

function get(fileSaveDir, fileName, password) {
  const result = keyring.getFileStore(fileSaveDir, fileName, password);
  if (result.toString().startsWith(ERROR_PREFIX))
    throw new Error(result.replace(ERROR_PREFIX, ""));

  return result;
}

module.exports = {
  get,
  set,
};
