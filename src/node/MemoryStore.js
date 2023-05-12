class InMemoryStore {
  static _storeMap = new Map();

  static set(key, data) {
    this._storeMap.set(key, data);
  }
  static get(key) {
    return this._storeMap.get(key);
  }
  static list() {
    return [...this._storeMap.keys()];
  }
}

function set(data, key = "_default_key_") {
  try {
    InMemoryStore.set(key, data);

    return "success";
  } catch (err) {
    throw new Error(`Unexpected error when writing to memory.`);
  }
}

function get(key = "_default_key_") {
  try {
    const result = InMemoryStore.get(key);

    if (result === undefined) throw new Error("Key not found");

    return result;
  } catch (err) {
    throw new Error(`Unexpected error when reading from memory`);
  }
}

function list() {
  try {
    return InMemoryStore.list();
  } catch (err) {
    throw new Error(`Unexpected error when reading from memory`);
  }
}

module.exports = {
  get,
  set,
  list,
};
