const arrays = {
	matches(item) {
		return Array.isArray(item);
	},

	isCollection() {
		return true;
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
		return Array.prototype.concat.apply([], arguments);
	},

	delete(item, key) {
		item.splice(key, 1);
		return item;
	},

	new() {
		return [];
	},

	copy(item) {
		return item.slice();
	}
};

export default arrays;
