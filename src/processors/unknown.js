const unknown = {
	matches() {
		return true;
	},

	isCollection() {
		return false;
	},

	has() {
		return false;
	},

	keys() {
		return [];
	},

	get() {
		return undefined;
	},

	set(item) {
		return item;
	},

	merge(item) {
		return item;
	},

	delete(item) {
		return item;
	},

	new(item) {
		return item;
	},

	copy(item) {
		return item;
	}
};


export default unknown;
