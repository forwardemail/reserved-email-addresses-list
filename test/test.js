const test = require('ava');

const list = require('reserved-email-addresses-list');
const array = require('reserved-email-addresses-list/array');
const map = require('reserved-email-addresses-list/map');
const set = require('reserved-email-addresses-list/set');

test('default returns an array', (t) => {
  t.true(Array.isArray(list) && list.length > 0);
});

test('array returns an array', (t) => {
  t.true(Array.isArray(array) && list.length > 0);
});

test('map returns an map', (t) => {
  t.true(map instanceof Map && map.size > 0);
});

test('set returns an set', (t) => {
  t.true(set instanceof Set && set.size > 0);
});
