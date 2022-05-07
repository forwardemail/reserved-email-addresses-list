const list = require('./index.json');
module.exports = new Map(list.map((key) => [key, key]));
