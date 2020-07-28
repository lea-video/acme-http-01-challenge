/* eslint-disable no-console */
const storage = new Map();
const listeners = [];

// Based on https://git.coolaj86.com/coolaj86/acme-http-01-standalone.js
module.exports.create = function create(config = {}) {
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

      // Notify all listeners
      return Promise.all(listeners.map(func => func('set', data.challenge)));
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

      // Notify all listeners
      return Promise.all(listeners.map(func => func('remove', data.challenge)));
    },
  };
};
// Give others in the same context the option to subscribe to changes
module.exports.notify = cb => {
  if (typeof cb !== 'function') throw new TypeError('expecting the callback to be a function');
  listeners.push(cb);
};
// Give others in the same context access to the storage
module.exports.get = () => Array.from(storage.values());
