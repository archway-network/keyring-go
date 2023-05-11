const keyring = require("../lib/binding.js");
const assert = require("assert");

// OS Store tests
assert(keyring.OsStore.set, "keyring.OsStore.set is undefined");
assert(keyring.OsStore.get, "keyring.OsStore.get is undefined");

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";
const success = "success";

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

// Encrypted File Store tests
assert(keyring.FileStore.set, "keyring.FileStore.set is undefined");
assert(keyring.FileStore.get, "keyring.FileStore.get is undefined");

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

// Unencrypted File Store tests
assert(
  keyring.UnencryptedFileStore.set,
  "keyring.UnencryptedFileStore.set is undefined"
);
assert(
  keyring.UnencryptedFileStore.get,
  "keyring.UnencryptedFileStore.get is undefined"
);

const dataForUnencryptedFile = "hello world file 3";

function testSetUnencryptedFileStore() {
  const result = keyring.UnencryptedFileStore.set(
    fileSaveDir,
    fileNameFile,
    dataForUnencryptedFile
  );
  console.log("keyring.UnencryptedFileStore.set returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetUnencryptedFileStore() {
  const dataResult = keyring.UnencryptedFileStore.get(
    fileSaveDir,
    fileNameFile
  );
  console.log("keyring.UnencryptedFileStore.get returns", dataResult);
  assert.strictEqual(
    dataResult,
    dataForUnencryptedFile,
    "Unexpected value returned"
  );
}

// Memory Store tests
assert(keyring.MemoryStore.set, "keyring.MemoryStore.set is undefined");
assert(keyring.MemoryStore.get, "keyring.MemoryStore.get is undefined");

const dataForMemory = "hello world memory 4";

function testSetMemoryStore() {
  const result = keyring.MemoryStore.set(dataForMemory);
  console.log("keyring.MemoryStore.set returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetMemoryStore() {
  const dataResult = keyring.MemoryStore.get();
  console.log("keyring.MemoryStore.get returns", dataResult);
  assert.strictEqual(dataResult, dataForMemory, "Unexpected value returned");
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
  testSetUnencryptedFileStore,
  undefined,
  "testSetUnencryptedFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testGetUnencryptedFileStore,
  undefined,
  "testGetUnencryptedFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testSetMemoryStore,
  undefined,
  "testSetMemoryStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testGetMemoryStore,
  undefined,
  "testGetMemoryStore threw an expection"
);
console.log("");

console.log("Tests passed- everything looks OK!");
