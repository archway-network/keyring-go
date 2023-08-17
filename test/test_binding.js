const keyring = require("../lib/binding.js");
const assert = require("assert");

// OS Store tests
assert(keyring.OsStore.set, "keyring.OsStore.set is undefined");
assert(keyring.OsStore.get, "keyring.OsStore.get is undefined");
assert(keyring.OsStore.list, "keyring.OsStore.list is undefined");
assert(keyring.OsStore.remove, "keyring.OsStore.remove is undefined");

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

// Encrypted File Store tests
assert(keyring.FileStore.set, "keyring.FileStore.set is undefined");
assert(keyring.FileStore.get, "keyring.FileStore.get is undefined");
assert(keyring.FileStore.list, "keyring.FileStore.list is undefined");
assert(keyring.FileStore.remove, "keyring.FileStore.remove is undefined");

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
  console.log('SET SUCCESS')
}

function testGetFileStore() {
  const dataResult = keyring.FileStore.get(
    fileSaveDir,
    fileNameFile,
    filePassword
  );
  console.log("keyring.FileStore.get returns:", dataResult);
  assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
  console.log('GET SUCCESS')
}

function testListFileStore() {
  const result = keyring.FileStore.list(fileSaveDir);
  console.log("keyring.FileStore.list returns:", result);
  assert(
    Array.isArray(result) && result.includes(fileNameFile),
    "Unexpected value returned"
  );
  console.log('LIST SUCCESS')
}

function testRemoveFileStore() {
  const result = keyring.FileStore.remove(fileSaveDir, fileNameFile);
  console.log("keyring.FileStore.remove returns:", result);

  const list = keyring.FileStore.list(fileSaveDir);
  console.log('This is the list', list)
  assert(
    Array.isArray(list) && !list.includes(fileNameFile),
    "Unexpected value returned"
  );
  console.log('REMOVE SUCCESS')
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
assert(
  keyring.UnencryptedFileStore.list,
  "keyring.UnencryptedFileStore.list is undefined"
);
assert(
  keyring.UnencryptedFileStore.remove,
  "keyring.UnencryptedFileStore.remove is undefined"
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

function testListUnencryptedFileStore() {
  const result = keyring.UnencryptedFileStore.list(fileSaveDir);
  console.log("keyring.UnencryptedFileStore.list returns:", result);
  assert(
    Array.isArray(result) && result.includes(fileNameFile),
    "Unexpected value returned"
  );
}

function testRemoveUnencryptedFileStore() {
  const result = keyring.UnencryptedFileStore.remove(fileSaveDir, fileNameFile);
  console.log("keyring.UnencryptedFileStore.remove returns:", result);

  const list = keyring.UnencryptedFileStore.list(fileSaveDir);
  assert(
    Array.isArray(list) && !list.includes(fileNameFile),
    "Unexpected value returned"
  );
}

// Memory Store tests
assert(keyring.MemoryStore.set, "keyring.MemoryStore.set is undefined");
assert(keyring.MemoryStore.get, "keyring.MemoryStore.get is undefined");
assert(keyring.MemoryStore.list, "keyring.MemoryStore.list is undefined");
assert(keyring.MemoryStore.remove, "keyring.MemoryStore.remove is undefined");

const dataForMemory = "hello world memory 4";
const keyForMemory = "keyring2";

function testSetMemoryStore() {
  const result = keyring.MemoryStore.set(dataForMemory, keyForMemory);
  console.log("keyring.MemoryStore.set returns", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetMemoryStore() {
  const dataResult = keyring.MemoryStore.get(keyForMemory);
  console.log("keyring.MemoryStore.get returns", dataResult);
  assert.strictEqual(dataResult, dataForMemory, "Unexpected value returned");
}

function testListMemoryStore() {
  const result = keyring.MemoryStore.list();
  console.log("keyring.MemoryStore.list returns:", result);
  assert(
    Array.isArray(result) && result.includes(keyForMemory),
    "Unexpected value returned"
  );
}

function testRemoveMemoryStore() {
  const result = keyring.MemoryStore.remove(keyForMemory);
  console.log("keyring.MemoryStore.remove returns:", result);

  const list = keyring.MemoryStore.list();
  assert(
    Array.isArray(list) && !list.includes(keyForMemory),
    "Unexpected value returned"
  );
}

// assert.doesNotThrow(
//   testSetOsStore,
//   undefined,
//   "testSetOsStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testGetOsStore,
//   undefined,
//   "testGetOsStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testListOsStore,
//   undefined,
//   "testListOsStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testRemoveOsStore,
//   undefined,
//   "testRemoveOsStore threw an expection"
// );
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
// assert.doesNotThrow(
//   testSetUnencryptedFileStore,
//   undefined,
//   "testSetUnencryptedFileStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testGetUnencryptedFileStore,
//   undefined,
//   "testGetUnencryptedFileStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testListUnencryptedFileStore,
//   undefined,
//   "testListUnencryptedFileStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testRemoveUnencryptedFileStore,
//   undefined,
//   "testRemoveUnencryptedFileStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testSetMemoryStore,
//   undefined,
//   "testSetMemoryStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testGetMemoryStore,
//   undefined,
//   "testGetMemoryStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testListMemoryStore,
//   undefined,
//   "testListMemoryStore threw an expection"
// );
// console.log("");
// assert.doesNotThrow(
//   testRemoveMemoryStore,
//   undefined,
//   "testRemoveMemoryStore threw an expection"
// );
console.log("");

console.log("Tests passed- everything looks OK!");
