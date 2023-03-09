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
    console.error(`Unexpected error when writing to file.`);
    throw err;
  }
}

function get(key = "_default_key_") {
  try {
    return InMemoryStore.get(key);
  } catch (err) {
    console.error(`Unexpected error when reading file`);
    throw err;
  }
}

module.exports = {
  get,
  set,
};
