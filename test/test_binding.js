const { setOsStore, getOsStore, setFileStore, getFileStore } = require("../lib/binding.js");
const assert = require("assert");

assert(setOsStore, "setOsStore is undefined");
assert(getOsStore, "getOsStore is undefined");

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";
const success = "success";

function testSetOsStore() {    
    const result =  setOsStore(serviceName, keyName, data);
    assert.strictEqual(result, success, "Unexpected value returned");
    console.log("setOsTore returns", success);
}

function testGetOsStore() {
    const result =  getOsStore(serviceName, keyName);
    assert.strictEqual(result, data, "Unexpected value returned");
    console.log("getOsTore returns", result);
}

const fileSaveDir = "~/";
const fileNameFile = "file-keyring2";
const dataForFile = "hello world file 2";

function testSetFileStore() {       
    const result = setFileStore(fileSaveDir, fileNameFile, dataForFile);
    console.log("testSetFileStore result", result);
    assert.strictEqual(result, "", "Unexpected value returned");
}

function testGetFileStore() {       
    const dataResult = getFileStore(fileSaveDir, fileNameFile);
    console.log("testSetFileStore data", dataResult);
    assert.strictEqual(dataResult, dataForFile, "Unexpected value returned");
}

assert.doesNotThrow(testSetOsStore, undefined, "testSetOsStore threw an expection");
assert.doesNotThrow(testGetOsStore, undefined, "testGetOsStore threw an expection");
assert.doesNotThrow(testSetFileStore, undefined, "testSetFileStore threw an expection");
assert.doesNotThrow(testGetFileStore, undefined, "testGetFileStore threw an expection");

console.log("Tests passed- everything looks OK!");