const { setOsStore, getOsStore, setFileStore, getFileStore } = require("../lib/binding.js");
const assert = require("assert");

assert(setOsStore, "setOsStore is undefined");
assert(getOsStore, "getOsStore is undefined");
assert(setFileStore, "setFileStore is undefined");
assert(getFileStore, "getFileStore is undefined");

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";
const success = "success";

function testSetOsStore() {    
    const result = setOsStore(serviceName, keyName, data);    
    console.log("setOsStore returns:", success);
    assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetOsStore() {
    const result =  getOsStore(serviceName, keyName);    
    console.log("getOsStore returns:", result);
    assert.strictEqual(result, data, "Unexpected value returned");
}

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";
const filePassword = "password123";

function testSetFileStore() {  
    const result = setFileStore(fileSaveDir, fileNameFile, dataForFile, filePassword);
    console.log("setFileStore returns:", result);
    assert.strictEqual(result, success, "Unexpected value returned");
}

function testGetFileStore() {  
    const dataResult = getFileStore(fileSaveDir, fileNameFile, filePassword);
    console.log("getFileStore returns:", dataResult);
    assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
}

assert.doesNotThrow(testSetOsStore, undefined, "testSetOsStore threw an expection");
console.log("");
assert.doesNotThrow(testGetOsStore, undefined, "testGetOsStore threw an expection");
console.log("");
assert.doesNotThrow(testSetFileStore, undefined, "testSetFileStore threw an expection");
console.log("");
assert.doesNotThrow(testGetFileStore, undefined, "testGetFileStore threw an expection");
console.log("");

console.log("Tests passed- everything looks OK!");