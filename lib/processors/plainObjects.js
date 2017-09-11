'use strict';

var plainObjects = {
	matches: function matches(item) {
		return item != null && typeof item === 'object' && (Object.getPrototypeOf(item) === Object.prototype || Object.getPrototypeOf(item) === null);
	},
	has: function has(item, key) {
		return key in item;
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
		return Object.assign.apply(arguments);
	},
	delete: function _delete(item, key) {
		delete item[key];
		return item;
	},
	new: function _new(item) {
		return Object.create(Object.getPrototypeOf(item));
	}
};

module.exports = plainObjects;
