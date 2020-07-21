/* eslint-disable no-console */
const storage = new Map();

// Based on https://git.coolaj86.com/coolaj86/acme-http-01-standalone.js
module.exports.create = function create(config) {
  let verbose = config.verbose || false;

  return {
    init: function init(opts) {
      if (verbose) console.log('Init Key Auth URL', opts, storage);
      return Promise.resolve(null);
    },

    set: function set(data) {
      if (verbose) console.log('Add Key Auth URL', data, storage);

      const ch = data.challenge;
      const key = `${ch.identifier.value}#${ch.token}`;
      storage.set(key, ch);

      return Promise.resolve(null);
    },

    get: function get(data) {
      if (verbose) console.log('List Key Auth URL', data, storage);

      const ch = data.challenge;
      const key = `${ch.identifier.value}#${ch.token}`;
      if (storage.has(key)) return Promise.resolve(storage.get(key));

      return Promise.resolve(null);
    },

    remove: function remove(data) {
      if (verbose) console.log('Remove Key Auth URL', data, storage);

      const ch = data.challenge;
      const key = `${ch.identifier.value}#${ch.token}`;
      storage.delete(key);

      return Promise.resolve(null);
    },
  };
};
