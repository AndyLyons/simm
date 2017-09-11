const EMPTY_ARRAY = [];
const arrays = {
	matches(item) {
		return item instanceof Array;
	},

	has(item, key) {
		return arrays.keys(item).indexOf(key) >= 0;
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
		return EMPTY_ARRAY.concat.apply(EMPTY_ARRAY, arguments);
	},

	delete(item, key) {
		item.splice(key, 1);
		return item;
	},

	new() {
		return [];
	}
};

export default arrays;
