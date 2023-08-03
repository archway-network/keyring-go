const { FileStore } = require("../lib/binding.js");
const assert = require("assert");

assert(FileStore.set, "FileStore.set is undefined");
assert(FileStore.get, "FileStore.get is undefined");

const success = "success";

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";
const filePassword = "password123";

function testSetFileStore() {
  const result = FileStore.set(
    fileSaveDir,
    fileNameFile,
    dataForFile,
    filePassword
  );
  console.log("FileStore.set returns:", result);
  assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetFileStore() {
    let dataResult
  try {dataResult = FileStore.get(fileSaveDir, fileNameFile, filePassword);
  }
  catch(e) {
    console.log(e, '\n\n',e.message)

  }
  console.log("FileStore.get returns:", dataResult);
  assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
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

console.log("Tests passed- everything looks OK!");
