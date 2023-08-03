class InMemoryStore {
  static _storeMap = new Map();

  static set(key, data) {
    this._storeMap.set(key, data);
  }
  static get(key) {
    return this._storeMap.get(key);
  }
}

function set(data, key = "_default_key_") {
  try {
    InMemoryStore.set(key, data);
    return "success";
  } catch (err) {
    console.error(`Unexpected error when writing to memory.`);
    throw err;
  }
}

function get(key = "_default_key_") {
  try {
    const result = InMemoryStore.get(key);
    if (result === undefined) throw new Error("Key not found");
    return result;
  } catch (err) {
    console.error(`Unexpected error when reading from memory`);
    throw err;
  }
}

module.exports = {
  get,
  set,
};
