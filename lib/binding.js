const addon = require("../build/Release/keyring-go");
const MemoryStore = require("../src/node/MemoryStore");
const UnencryptedFileStore = require("../src/node/UnencryptedFileStore");

module.exports = {
  setOsStore: addon.setOsStore,
  getOsStore: addon.getOsStore,
  setFileStore: addon.setFileStore,
  getFileStore: addon.getFileStore,
  setUnencryptedFileStore: UnencryptedFileStore.set,
  getUnencryptedFileStore: UnencryptedFileStore.get,
  setMemoryStore: MemoryStore.set,
  getMemoryStore: MemoryStore.get,
};
