const addon = require('../build/Release/keyring-go');

module.exports = {
    setOsStore: addon.setOsStore,
    getOsStore: addon.getOsStore,
    setFileStore: addon.setFileStore
};

