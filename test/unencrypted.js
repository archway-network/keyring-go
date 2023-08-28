const keyring = require("../src/node");
const assert = require("assert");

// Unencrypted File Store tests
assert(
  keyring.UnencryptedFileStore.set,
  "keyring.UnencryptedFileStore.set is undefined"
);
assert(
  keyring.UnencryptedFileStore.get,
  "keyring.UnencryptedFileStore.get is undefined"
);
assert(
  keyring.UnencryptedFileStore.list,
  "keyring.UnencryptedFileStore.list is undefined"
);
assert(
  keyring.UnencryptedFileStore.remove,
  "keyring.UnencryptedFileStore.remove is undefined"
);

const fileName = "unencrypted.key";
const data = "hello from unencrypted keystore";

function testSetUnencryptedFileStore(context) {
  return () => {
    const result = keyring.UnencryptedFileStore.set(
      context.tmpDir,
      fileName,
      data
    );
    console.log("keyring.UnencryptedFileStore.set returns", result);
    assert.strictEqual(result, "success", "Unexpected value returned");
  };
}

function testGetUnencryptedFileStore(context) {
  return () => {
    const dataResult = keyring.UnencryptedFileStore.get(
      context.tmpDir,
      fileName
    );
    console.log("keyring.UnencryptedFileStore.get returns", dataResult);
    assert.strictEqual(dataResult, data, "Unexpected value returned");
  };
}

function testListUnencryptedFileStore(context) {
  return () => {
    const result = keyring.UnencryptedFileStore.list(context.tmpDir);
    console.log("keyring.UnencryptedFileStore.list returns:", result);
    assert(
      Array.isArray(result) && result.includes(fileName),
      "Unexpected value returned"
    );
  };
}

function testRemoveUnencryptedFileStore(context) {
  return () => {
    const result = keyring.UnencryptedFileStore.remove(
      context.tmpDir,
      fileName
    );
    console.log("keyring.UnencryptedFileStore.remove returns:", result);

    const list = keyring.UnencryptedFileStore.list(context.tmpDir);
    assert(
      Array.isArray(list) && !list.includes(fileName),
      "Unexpected value returned"
    );
  };
}

function run(context) {
  console.log("");
  assert.doesNotThrow(
    testSetUnencryptedFileStore(context),
    undefined,
    "testSetUnencryptedFileStore threw an expection"
  );
  console.log("");
  assert.doesNotThrow(
    testGetUnencryptedFileStore(context),
    undefined,
    "testGetUnencryptedFileStore threw an expection"
  );
  console.log("");
  assert.doesNotThrow(
    testListUnencryptedFileStore(context),
    undefined,
    "testListUnencryptedFileStore threw an expection"
  );
  console.log("");
  assert.doesNotThrow(
    testRemoveUnencryptedFileStore(context),
    undefined,
    "testRemoveUnencryptedFileStore threw an expection"
  );
}

module.exports = {
  run,
};
