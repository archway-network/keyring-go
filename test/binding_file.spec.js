const { setFileStore, getFileStore } = require("../lib/binding.js");
const assert = require("assert");

assert(setFileStore, "setFileStore is undefined");
assert(getFileStore, "getFileStore is undefined");

const success = "success";

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";

function testSetFileStore() {  
    const result = setFileStore(fileSaveDir, fileNameFile, dataForFile);
    console.log("setFileStore returns:", result);
    assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetFileStore() {  
    const dataResult = getFileStore(fileSaveDir, fileNameFile);
    console.log("getFileStore returns:", dataResult);
    assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
}

assert.doesNotThrow(testSetFileStore, undefined, "testSetFileStore threw an expection");
console.log("");
assert.doesNotThrow(testGetFileStore, undefined, "testGetFileStore threw an expection");
console.log("");

console.log("Tests passed- everything looks OK!");