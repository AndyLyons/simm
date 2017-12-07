const objects = {
	matches(item) {
		return item != null && typeof item === 'object' && (
			Object.getPrototypeOf(item) === Object.prototype ||
			Object.getPrototypeOf(item) === null
		);
	},

	isCollection() {
		return true;
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
	},

	copy(item) {
		return Object.assign(objects.new(item), item);
	}
};

export default objects;