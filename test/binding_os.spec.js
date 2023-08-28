const keyring = require("../src/node");
const assert = require("assert");

// OS Store tests
assert(keyring.OsStore.set, "keyring.OsStore.set is undefined");
assert(keyring.OsStore.get, "keyring.OsStore.get is undefined");
assert(keyring.OsStore.list, "keyring.OsStore.list is undefined");
assert(keyring.OsStore.remove, "keyring.OsStore.remove is undefined");

const success = "success";

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";

function testSetOsStore() {
  const result = keyring.OsStore.set(serviceName, keyName, data);
  console.log("keyring.OsStore.set returns:", success);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetOsStore() {
  const result = keyring.OsStore.get(serviceName, keyName);
  console.log("keyring.OsStore.get returns:", result);
  assert.strictEqual(result, data, "Unexpected value returned");
}

function testListOsStore() {
  const result = keyring.OsStore.list(serviceName);
  console.log("keyring.OsStore.list returns:", result);
  assert(
    Array.isArray(result) && result.includes(keyName),
    "Unexpected value returned"
  );
}

function testRemoveOsStore() {
  const result = keyring.OsStore.remove(serviceName, keyName);
  console.log("keyring.OsStore.remove returns:", result);

  const list = keyring.OsStore.list(serviceName);
  assert(
    Array.isArray(list) && !list.includes(keyName),
    "Unexpected value returned"
  );
}

assert.doesNotThrow(
  testSetOsStore,
  undefined,
  "testSetOsStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testGetOsStore,
  undefined,
  "testGetOsStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testListOsStore,
  undefined,
  "testListOsStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testRemoveOsStore,
  undefined,
  "testRemoveOsStore threw an expection"
);
console.log("");

console.log("OS Tests passed- everything looks OK! \n");
