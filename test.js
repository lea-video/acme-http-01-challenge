var tester = require('acme-http-01-test');

const record = process.env.record || 'example.com';

var challenger = require('./index.js').create();

// The dry-run tests can pass on, literally, 'example.com'
// but the integration tests require that you have control over the domain
tester
	.testRecord('http-01', record, challenger)
	.then(function() {
		console.info('PASS', record);
	})
	.catch(function(e) {
		console.error(e.message);
		console.error(e.stack);
	});
