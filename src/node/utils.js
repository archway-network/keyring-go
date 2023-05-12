const ERROR_PREFIX = "[-!ERROR-]: ";

function checkErrorInResponse(value) {
  if (value?.toString?.()?.startsWith(ERROR_PREFIX)) {
    throw new Error(value.toString().replace(ERROR_PREFIX, ""));
  }
}

module.exports = {
  checkErrorInResponse,
};
