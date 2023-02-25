const { setOsStore, getOsStore } = require("../lib/binding.js");
const assert = require("assert");

assert(setOsStore, "setOsStore is undefined");
assert(getOsStore, "getOsStore is undefined");

const serviceName = "archwayhq";
const keyName = "keyring2";
const data = "hello world 2 - 1";

function testSetOsStore()
{
    const success = "success";
    const result =  setOsStore(serviceName, keyName, data);
    assert.strictEqual(result, success, "Unexpected value returned");
    console.log("setOsTore returns", success);
}

function testGetOsStore()
{
    const result =  getOsStore(serviceName, keyName);
    assert.strictEqual(result, data, "Unexpected value returned");
    console.log("getOsTore returns", result);
}

assert.doesNotThrow(testSetOsStore, undefined, "testSetOsStore threw an expection");
assert.doesNotThrow(testGetOsStore, undefined, "testGetOsStore threw an expection");

console.log("Tests passed- everything looks OK!");