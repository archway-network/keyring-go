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
  static delete(key) {
    return this._storeMap.delete(key);
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

function remove(key = "_default_key_") {
  let success;

  try {
    success = InMemoryStore.delete(key);
  } catch (err) {
    throw new Error(`Unexpected error when reading from memory`);
  }

  if (!success)
    throw new Error("The specified item could not be found in the keychain");
}

module.exports = {
  get,
  set,
  list,
  remove,
};
