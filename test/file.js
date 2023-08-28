const keyring = require("../src/node");
const assert = require("node:assert");

// Encrypted File Store tests
assert(keyring.FileStore.set, "keyring.FileStore.set is undefined");
assert(keyring.FileStore.get, "keyring.FileStore.get is undefined");
assert(keyring.FileStore.list, "keyring.FileStore.list is undefined");
assert(keyring.FileStore.remove, "keyring.FileStore.remove is undefined");

const fileName = "test.key";
const data = "hello from file keystore";
const password = "password123";

function testSetFileStore(context) {
  return () => {
    const result = keyring.FileStore.set(
      context.tmpDir,
      fileName,
      data,
      password
    );
    console.log("keyring.FileStore.set returns:", result);
    assert.strictEqual(result, "success", "Unexpected value returned");
  };
}

function testGetFileStore(context) {
  return () => {
    const dataResult = keyring.FileStore.get(
      context.tmpDir,
      fileName,
      password
    );
    console.log("keyring.FileStore.get returns:", dataResult);
    assert.strictEqual(dataResult, data, "Unexpected value returned");
  };
}

function testListFileStore(context) {
  return () => {
    const result = keyring.FileStore.list(context.tmpDir);
    console.log("keyring.FileStore.list returns:", result);
    assert(
      Array.isArray(result) && result.includes(fileName),
      "Unexpected value returned"
    );
  };
}

function testRemoveFileStore(context) {
  return () => {
    const result = keyring.FileStore.remove(context.tmpDir, fileName);
    console.log("keyring.FileStore.remove returns:", result);

    const list = keyring.FileStore.list(context.tmpDir);
    assert(
      Array.isArray(list) && !list.includes(fileName),
      "Unexpected value returned"
    );
  };
}

function run(context) {
  assert.doesNotThrow(
    testSetFileStore(context),
    undefined,
    "testSetFileStore threw an expection"
  );
  assert.doesNotThrow(
    testGetFileStore(context),
    undefined,
    "testGetFileStore threw an expection"
  );
  assert.doesNotThrow(
    testListFileStore(context),
    undefined,
    "testListFileStore threw an expection"
  );
  assert.doesNotThrow(
    testRemoveFileStore(context),
    undefined,
    "testRemoveFileStore threw an expection"
  );
}

module.exports = {
  run,
};
