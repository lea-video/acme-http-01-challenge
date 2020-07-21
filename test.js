/* eslint-disable no-console */
let tester = require('acme-http-01-test');

const record = process.env.record || 'example.com';

let challenger = require('./index.js').create();

// The dry-run tests can pass on, literally, 'example.com'
// But the integration tests require that you have control over the domain
tester
  .testRecord('http-01', record, challenger)
  .then(() => {
    console.info('PASS', record);
  })
  .catch(e => {
    console.error(e.message);
    console.error(e.stack);
  });
