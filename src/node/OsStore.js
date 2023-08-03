const keyring = require("../../build/Release/keyring-go");

const ERROR_PREFIX = "[-!ERROR-]: ";

function set(serviceName, keyName, data) {
  const result = keyring.setOsStore(serviceName, keyName, data);
  if (result.toString().startsWith(ERROR_PREFIX)) throw new Error(result);

  return result;
}

function get(serviceName, keyName) {
  const result = keyring.getOsStore(serviceName, keyName);
  if (result.toString().startsWith(ERROR_PREFIX)) throw new Error(result);

  return result;
}

module.exports = {
  get,
  set,
};
