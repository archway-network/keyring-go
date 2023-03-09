const {
  setOsStore,
  getOsStore,
  setFileStore,
  getFileStore,
  setUnencryptedFileStore,
  getUnencryptedFileStore,
  setMemoryStore,
  getMemoryStore,
} = require("../lib/binding.js");
const assert = require("assert");

// OS Store tests
assert(setOsStore, "setOsStore is undefined");
assert(getOsStore, "getOsStore is undefined");

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";
const success = "success";

function testSetOsStore() {
  const result = setOsStore(serviceName, keyName, data);
  assert.strictEqual(result, success, "Unexpected value returned");
  console.log("setOsStore returns", result);
}

function testGetOsStore() {
  const result = getOsStore(serviceName, keyName);
  assert.strictEqual(result, data, "Unexpected value returned");
  console.log("getOsStore returns", result);
}

assert.doesNotThrow(
  testSetOsStore,
  undefined,
  "testSetOsStore threw an expection"
);
assert.doesNotThrow(
  testGetOsStore,
  undefined,
  "testGetOsStore threw an expection"
);

// Encrypted File Store tests
const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";

function testSetFileStore() {
  const result = setFileStore(fileSaveDir, fileNameFile, dataForFile);
  console.log("setFileStore returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetFileStore() {
  const dataResult = getFileStore(fileSaveDir, fileNameFile);
  console.log("getFileStore returns", dataResult);
  assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
}

assert.doesNotThrow(
  testSetFileStore,
  undefined,
  "testSetFileStore threw an expection"
);
assert.doesNotThrow(
  testGetFileStore,
  undefined,
  "testGetFileStore threw an expection"
);

// Unencrypted File Store tests
const dataForUnencryptedFile = "hello world file 3";

function testSetUnencryptedFileStore() {
  const result = setUnencryptedFileStore(
    fileSaveDir,
    fileNameFile,
    dataForUnencryptedFile
  );
  console.log("setUnencryptedFileStore returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetUnencryptedFileStore() {
  const dataResult = getUnencryptedFileStore(fileSaveDir, fileNameFile);
  console.log("getUnencryptedFileStore returns", dataResult);
  assert.strictEqual(
    dataResult,
    dataForUnencryptedFile,
    "Unexpected value returned"
  );
}

assert.doesNotThrow(
  testSetUnencryptedFileStore,
  undefined,
  "testSetUnencryptedFileStore threw an expection"
);
assert.doesNotThrow(
  testGetUnencryptedFileStore,
  undefined,
  "testGetUnencryptedFileStore threw an expection"
);

// Memory Store tests
const dataForMemory = "hello world memory 4";

function testSetMemoryStore() {
  const result = setMemoryStore(dataForMemory);
  console.log("setMemoryStore returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetMemoryStore() {
  const dataResult = getMemoryStore();
  console.log("getMemoryStore returns", dataResult);
  assert.strictEqual(dataResult, dataForMemory, "Unexpected value returned");
}

assert.doesNotThrow(
  testSetMemoryStore,
  undefined,
  "testSetMemoryStore threw an expection"
);
assert.doesNotThrow(
  testGetMemoryStore,
  undefined,
  "testGetMemoryStore threw an expection"
);

console.log("Tests passed- everything looks OK!");
