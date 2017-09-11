const EMPTY_PATH = [];

/**
 * Normalises paths of String or Array type into the Array type. A string path
 * is a dot separated list of object keys to visit. An empty string represents a
 * valid path with a single empty string entry (as an empty string is a valid
 * key in JS objects) and so an empty array must be used to refer to an empty
 * path.
 *
 * normalisePath('A.B.C'); // ['A', 'B', 'C']
 * normalisePath('');      // ['']
 * normalisePath(null);    // []
 */
export function normalisePath(path) {
	if (path instanceof Array) {
		return path;
	} else if (typeof path === 'string') {
		return path.split('.');
	} else {
		return EMPTY_PATH;
	}
}

/**
 * Creates a new object with a value at the given path. Objects are created at
 * each level of the path until the end is reached, where the value is set.
 *
 * createObjectWithPath(['A', 'B', 'C'], 'Value');
 * {
 *   'A': {
 *     'B': {
 *       'C': 'Value'
 *     }
 *   }
 * }
 */
export function createObjectWithPath(path, value) {
	return path.reduceRight((nextData, key) => {
		const newData = Object.create(null);
		newData[key] = nextData;
		return newData;
	}, value);
}