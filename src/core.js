/**
 * Gets the data at the given path.
 */
export function get(prev, path, position, config) {
	if (position === path.length - 1) {
		return prev;
	}

	const processor = config.pcsr(prev);
	const key = path[position];
	if (!processor.has(prev, key)) {
		return undefined;
	}

	const child = processor.get(prev, key);
	return get(child, path, position + 1, config);
}

/**
 * Returns a clone of the given item. By default a deep clone is returned. A
 * shallow clone can be created by setting the third parameter to `true`.
 */
export function clone(item, shallow, config) {
	const processor = config.pcsr(item);
	if (shallow && processor.copy) {
		return processor.copy(item);
	}

	const clone = processor.new(item);
	const keys = processor.keys(item);
	for (let i = 0, l = keys.length; i < l;) {
		const key = keys[i++];
		const child = config.processors.get(item, key);
		processor.set(clone, key, shallow ? child : clone(child, false, config));
	}

	return clone;
}

/**
 * Replaces / overwrites the data at the given path with the new data.
 */
export function set(item, path, next, position, config) {
	if (position === path.length - 1) {
		return preserve(item, next, config);
	}

	const processor = config.pcsr(item);
	const key = path[position];
	const currentChild = processor.has(item, key) ? processor.get(item, key) : Object.create(null);
	const newChild = set(currentChild, path, next, position + 1, config);
	const newItem = clone(item, true, config);

	return processor.set(newItem, key, newChild);
}

/**
 * Merges the data at the given path with the new data.
 */
export function merge(prev, path, next, config) {

}

/**
 * Removes the data at the given path.
 */
export function remove(prev, path, config) {

}

export function equals(item1, item2, config) {
	// Equivalent to Object.is: covers NaN === NaN and +0 !== -0
	if ((item1 === item2 && (item1 !== 0 || 1/item1 === 1/item2)) || (item1 !== item1 && item2 !== item2)) {
		return true;
	}

	const processor1 = config.pcsr(item1);
	const processor2 = config.pcsr(item2);

	if (processor1 !== processor2) {
		return false;
	}

	const childKeys1 = this.getChildKeys(item1);
	const childKeys2 = this.getChildKeys(item2);

	return childKeys1.length === childKeys2.length && childKeys1.every((key, index) => key === childKeys2[index]);
}

function preserve(prev, next, level, config) {
	if (level === 1) {

	} else if (level === 2) {

	}
	return prev === next ? prev : next;
}