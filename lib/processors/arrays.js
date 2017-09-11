'use strict';

var EMPTY_ARRAY = [];
var arrays = {
	matches: function matches(item) {
		return item instanceof Array;
	},
	has: function has(item, key) {
		return arrays.keys(item).indexOf(key) >= 0;
	},
	keys: function keys(item) {
		return Object.keys(item);
	},
	get: function get(item, key) {
		return item[key];
	},
	set: function set(item, key, value) {
		item[key] = value;
		return item;
	},
	merge: function merge() {
		return EMPTY_ARRAY.concat.apply(EMPTY_ARRAY, arguments);
	},
	delete: function _delete(item, key) {
		item.splice(key, 1);
		return item;
	},
	new: function _new() {
		return [];
	}
};

module.exports = arrays;
