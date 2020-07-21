module.exports.create = function(config) {
	console.log('New http-challenge-client', config);

	let storage = [];
	/** stores data instances:
		data.challenge.token
		data.challenge.keyAuthorization
	*/

	return {
		init: function(opts) {
			console.log('Init Key Auth URL', opts);
			return null;
		},

		set: function(data) {
			console.log('Add Key Auth URL', data);

			storage.push(data);
		},

		get: function(data) {
			console.log('List Key Auth URL', data);

			for (const s of storage) {
				if (s.challenge.token === data.challenge.token) return s.challenge.keyAuthorization;
			}
			return null;
		},

		remove: function(data) {
			console.log('Remove Key Auth URL', data);

			storage = storage.filter(s => {
				return s.challenge.token === data.challenge.token;
			});
		}
	};
};
