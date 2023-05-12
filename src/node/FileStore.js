const keyring = require("../../build/Release/keyring-go");
const { checkErrorInResponse } = require("./utils");

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

function list(serviceName) {
  const result = keyring.listFileStore(serviceName);

  if (result?.length === 1) checkErrorInResponse(result[0]);

  return result;
}

module.exports = {
  get,
  set,
  list,
};
