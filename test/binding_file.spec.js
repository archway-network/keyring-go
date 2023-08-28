const keyring = require("../src/node");
const assert = require("assert");

// Encrypted File Store tests
assert(keyring.FileStore.set, "keyring.FileStore.set is undefined");
assert(keyring.FileStore.get, "keyring.FileStore.get is undefined");
assert(keyring.FileStore.list, "keyring.FileStore.list is undefined");
assert(keyring.FileStore.remove, "keyring.FileStore.remove is undefined");

const success = "success";

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";
const filePassword = "password123";

function testSetFileStore() {
  const result = keyring.FileStore.set(
    fileSaveDir,
    fileNameFile,
    dataForFile,
    filePassword
  );
  console.log("keyring.FileStore.set returns:", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetFileStore() {
  const dataResult = keyring.FileStore.get(
    fileSaveDir,
    fileNameFile,
    filePassword
  );
  console.log("keyring.FileStore.get returns:", dataResult);
  assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
}

function testListFileStore() {
  const result = keyring.FileStore.list(fileSaveDir);
  console.log("keyring.FileStore.list returns:", result);
  assert(
    Array.isArray(result) && result.includes(fileNameFile),
    "Unexpected value returned"
  );
}

function testRemoveFileStore() {
  const result = keyring.FileStore.remove(fileSaveDir, fileNameFile);
  console.log("keyring.FileStore.remove returns:", result);

  const list = keyring.FileStore.list(fileSaveDir);
  assert(
    Array.isArray(list) && !list.includes(fileNameFile),
    "Unexpected value returned"
  );
}

assert.doesNotThrow(
  testSetFileStore,
  undefined,
  "testSetFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testGetFileStore,
  undefined,
  "testGetFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testListFileStore,
  undefined,
  "testListFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testRemoveFileStore,
  undefined,
  "testRemoveFileStore threw an expection"
);
console.log("");

console.log("File Tests passed- everything looks OK! \n");
