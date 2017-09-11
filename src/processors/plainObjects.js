const plainObjects = {
	matches(item) {
		return item != null && typeof item === 'object' && (
			Object.getPrototypeOf(item) === Object.prototype ||
			Object.getPrototypeOf(item) === null
		);
	},

	has(item, key) {
		return key in item;
	},

	keys(item) {
		return Object.keys(item);
	},

	get(item, key) {
		return item[key];
	},

	set(item, key, value) {
		item[key] = value;
		return item;
	},

	merge() {
		return Object.assign.apply(arguments);
	},

	delete(item, key) {
		delete item[key];
		return item;
	},

	new(item) {
		return Object.create(Object.getPrototypeOf(item));
	}
};

export default plainObjects;