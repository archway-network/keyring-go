const keyring = require("../src/node");
const assert = require("assert");

// OS Store tests
assert(keyring.OsStore.set, "keyring.OsStore.set is undefined");
assert(keyring.OsStore.get, "keyring.OsStore.get is undefined");
assert(keyring.OsStore.list, "keyring.OsStore.list is undefined");
assert(keyring.OsStore.remove, "keyring.OsStore.remove is undefined");

const serviceName = "archway-keyring-test";
const keyName = "test";
const data = "hello from os keyring";

function testSetOsStore(_context) {
  return () => {
    const result = keyring.OsStore.set(serviceName, keyName, data);
    console.log("keyring.OsStore.set returns:", result);
    assert.strictEqual(result, "success", "Unexpected value returned");
  };
}

function testGetOsStore(_context) {
  return () => {
    const result = keyring.OsStore.get(serviceName, keyName);
    console.log("keyring.OsStore.get returns:", result);
    assert.strictEqual(result, data, "Unexpected value returned");
  };
}

function testListOsStore(_context) {
  return () => {
    const result = keyring.OsStore.list(serviceName);
    console.log("keyring.OsStore.list returns:", result);
    assert(
      Array.isArray(result) && result.includes(keyName),
      "Unexpected value returned"
    );
  };
}

function testRemoveOsStore(_context) {
  return () => {
    const result = keyring.OsStore.remove(serviceName, keyName);
    console.log("keyring.OsStore.remove returns:", result);

    const list = keyring.OsStore.list(serviceName);
    assert(
      Array.isArray(list) && !list.includes(keyName),
      "Unexpected value returned"
    );
  };
}

function run(context) {
  assert.doesNotThrow(
    testSetOsStore(context),
    undefined,
    "testSetOsStore threw an expection"
  );
  assert.doesNotThrow(
    testGetOsStore(context),
    undefined,
    "testGetOsStore threw an expection"
  );
  assert.doesNotThrow(
    testListOsStore(context),
    undefined,
    "testListOsStore threw an expection"
  );
  assert.doesNotThrow(
    testRemoveOsStore(context),
    undefined,
    "testRemoveOsStore threw an expection"
  );
}

module.exports = {
  run,
};
