const storage = new Map();

// based on https://git.coolaj86.com/coolaj86/acme-http-01-standalone.js
module.exports.create = function(config) {
	let verbose = config.verbose || false;

	return {
		init: function(opts) {
			if (verbose) console.log('Init Key Auth URL', opts, storage);
			return Promise.resolve(null);
		},

		set: function(data) {
			if (verbose) console.log('Add Key Auth URL', data, storage);

			const ch = data.challenge;
			const key = ch.identifier.value + '#' + ch.token;
			storage.set(key, ch);

			return Promise.resolve(null);
		},

		get: function(data) {
			if (verbose) console.log('List Key Auth URL', data, storage);

			const ch = data.challenge;
			const key = ch.identifier.value + '#' + ch.token;
			if (storage.has(key)) return Promise.resolve(storage.get(key));

			return Promise.resolve(null);
		},

		remove: function(data) {
			if (verbose) console.log('Remove Key Auth URL', data, storage);

			const ch = data.challenge;
			const key = ch.identifier.value + '#' + ch.token;
			storage.delete(key);

			return Promise.resolve(null);
		}
	};
};
