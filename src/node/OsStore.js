const keyring = require("../../build/Release/keyring-go");
const { checkErrorInResponse } = require("./utils");

function set(serviceName, keyName, data) {
  const result = keyring.setOsStore(serviceName, keyName, data);

  checkErrorInResponse(result);

  return result;
}

function get(serviceName, keyName) {
  const result = keyring.getOsStore(serviceName, keyName);

  checkErrorInResponse(result);

  return result;
}

function list(serviceName) {
  const result = keyring.listOsStore(serviceName);

  if (result?.length === 1) checkErrorInResponse(result[0]);

  return result;
}

module.exports = {
  get,
  set,
  list,
};
