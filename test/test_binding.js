const setOsStore = require("../lib/binding.js");
const assert = require("assert");

assert(setOsStore, "The expected function is undefined");

function testSetOsStore()
{
    const result =  setOsStore("archwayhq", "keyring1", "hello world");
    assert.strictEqual(result, "world", "Unexpected value returned");
}

assert.doesNotThrow(testSetOsStore, undefined, "testSetOsStore threw an expection");

console.log("Tests passed- everything looks OK!");