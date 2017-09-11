import {createObjectWithPath} from './utility';

/**
 * Gets the data at the given path.
 */
export function get(processors, prev, path) {
	if (path.length === 0) {
		return prev;
	}

	const processor = processors.find(prev);
	const key = path[0];
	if (processor.has(prev, key)) {
		const next = processor.get(prev, key);
		return get(processors, next, path.slice(1));
	} else {
		return undefined;
	}
}

/**
 * Returns a deep clone of the data at the given path. This is slow compared to
 * get, but allows you to mutate the data without affecting the original object.
 */
export function cloneAt(processors, prev, path) {
	const item = get(processors, prev, path);
	return clone(processors, item);
}

/**
 * Returns a deep clone of the given item.
 */
export function clone(processors, item) {
	const processor = processors.find(item);
	const clone = processor.new(item);

	const keys = processor.keys(item);
	for (let i = 0, l = keys.length; i < l;) {
		const key = keys[i++];
		const child = processor.get(item, key);
		const childClone = clone(processors, child);
		processor.set(clone, key, childClone);
	}

	return clone;
}

/**
 * Replaces / overwrites the data at the given path with the new data.
 */
export function set(processors, prev, path, next) {
	if (path.length === 0) {
		// Is `next` equal to `prev` ?
		return next;
	}

	const processor = processors.find(prev);
	const key = path[0];
	let updatedChild;

	if (processor.has(prev, key)) {
		const child = processor.get(prev, key);
		updatedChild = set(processors, child, path.slice(1), next);
	} else {
		updatedChild = createObjectWithPath(path, next);
	}

	return processor.set(prev, key, updatedChild);
}

/**
 * Merges the data at the given path with the new data.
 */
export function merge(processors, prev, path, next) {

}

/**
 * Removes the data at the given path.
 */
export function remove(processors, prev, path) {

}