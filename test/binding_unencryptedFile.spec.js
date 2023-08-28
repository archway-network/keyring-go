const keyring = require("../src/node");
const assert = require("assert");

const success = "success";

const dataForUnencryptedFile = "hello world file 3";

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";

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
  testListUnencryptedFileStore,
  undefined,
  "testListUnencryptedFileStore threw an expection"
);
console.log("");
assert.doesNotThrow(
  testRemoveUnencryptedFileStore,
  undefined,
  "testRemoveUnencryptedFileStore threw an expection"
);
console.log("");

console.log("Unencrypted File Tests passed- everything looks OK! \n");
