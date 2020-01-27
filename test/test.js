const test = require('ava');

const list = require('..');

test('returns an array', t => {
  t.true(Array.isArray(list) && list.length > 0);
});
