'use strict';

/**
 * Gets the data at the given path.
 */
function get(processors, prev, path) {
	if (path.length === 0) {
		return prev;
	}

	var processor = processors.find(prev);
	var key = path[0];
	if (processor.has(prev, key)) {
		var next = processor.get(prev, key);
		return get(processors, next, path.slice(1));
	} else {
		return undefined;
	}
}

/**
 * Returns a deep clone of the data at the given path. This is slow compared to
 * get, but allows you to mutate the data without affecting the original object.
 */
function cloneAt(processors, prev, path) {
	var item = get(processors, prev, path);
	return clone(processors, item);
}

/**
 * Returns a deep clone of the given item.
 */
function clone(processors, item) {
	var processor = processors.find(item);
	var clone = processor.new(item);

	var keys = processor.keys(item);
	for (var i = 0, l = keys.length; i < l;) {
		var key = keys[i++];
		var child = processor.get(item, key);
		var childClone = clone(processors, child);
		processor.set(clone, key, childClone);
	}

	return clone;
}

/**
 * Replaces / overwrites the data at the given path with the new data.
 */
function set(processors, prev, path, next) {
	if (path.length === 0) {
		return next;
	}

	var processor = processors.find(prev);
	var key = path[0];
	if (processor.has(prev, key)) {
		processor.set(prev, key, set(processors, prev, path.slice(1), key));
	} else {
		return undefined;
	}
}

/**
 * Merges the data at the given path with the new data.
 */
function merge(processors, prev, path, next) {}

/**
 * Removes the data at the given path.
 */
function remove(processors, prev, path) {}

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

/**
 * A fallback processor that will provide a zero-effect stub implementation of
 * the processor API methods for unknown objects that don't match any other
 * processor.
 */
var NO_KEYS = [];
var unknown = {
	matches: function matches() {
		return true;
	},
	has: function has() {
		return false;
	},
	keys: function keys() {
		return NO_KEYS;
	},
	get: function get() {
		return undefined;
	},
	set: function set(item) {
		return item;
	},
	merge: function merge(item) {
		return item;
	},
	delete: function _delete(item) {
		return item;
	},
	new: function _new(item) {
		return item;
	}
};

/**
 * Combines multiple individual processors into a single processor. Method APIs
 * are delegated to the first processor whose `matches` method returns `true`.
 */
function combineProcessors(processors) {
	var cache = WeakMap && new WeakMap();
	var combined = {
		find: function find(item) {
			if (cache && cache.has(item)) {
				return cache.get(item);
			}

			var processor = unknown;
			for (var i = 0, l = processors.length; i < l;) {
				var currentProcessor = processors[i++];
				if (currentProcessor.matches(item)) {
					processor = currentProcessor;
					break;
				}
			}

			cache && cache.set(item, processor);
			return processor;
		},
		matches: function matches() {
			return true;
		},
		has: function has(item) {
			var processor = combined.find(item);
			return processor.has.apply(processor, arguments);
		},
		keys: function keys(item) {
			var processor = combined.find(item);
			return processor.keys.apply(processor, arguments);
		},
		get: function get(item) {
			var processor = combined.find(item);
			return processor.get.apply(processor, arguments);
		},
		set: function set(item) {
			var processor = combined.find(item);
			return processor.set.apply(processor, arguments);
		},
		merge: function merge(item) {
			var processor = combined.find(item);
			return processor.merge.apply(processor, arguments);
		},
		delete: function _delete(item) {
			var processor = combined.find(item);
			return processor.delete.apply(processor, arguments);
		},
		new: function _new(item) {
			var processor = combined.find(item);
			return processor.new.apply(processor, arguments);
		}
	};

	return combined;
}

var EMPTY_PATH$1 = [];

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
function normalisePath(path) {
  if (path instanceof Array) {
    return path;
  } else if (typeof path === 'string') {
    return path.split('.');
  } else {
    return EMPTY_PATH$1;
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

/**
 * Returns the set of API methods with a custom configuration.
 */
var EMPTY_PATH = [];
function configure(config) {
	var processor = combineProcessors(config.processors);
	return {
		get: function get$$1(prev, path) {
			return get(processor, prev, normalisePath(path));
		},
		clone: function clone$$1(prev) {
			return clone(processor, prev);
		},
		cloneAt: function cloneAt$$1(prev, path) {
			return cloneAt(processor, prev, normalisePath(path));
		},
		set: function set$$1(prev, next) {
			return set(processor, prev, EMPTY_PATH, next);
		},
		setAt: function setAt(prev, path, next) {
			return set(processor, prev, normalisePath(path), next);
		},
		merge: function merge$$1(prev, next) {
			return merge(processor, prev, EMPTY_PATH, next);
		},
		mergeAt: function mergeAt(prev, path, next) {
			return merge(processor, prev, normalisePath(path), next);
		},
		remove: function remove$$1(prev, path) {
			return remove(processor, prev, normalisePath(path));
		},
		createStore: function createStore(store) {
			return _createStore(processor, store);
		}
	};
}

/**
 * Creates a data store with the API methods, optionally with an initial state.
 * The data store removes the need for the `prev` data parameter, as all changes
 * are applied to the persistent store object.
 */
function _createStore(processor, store) {
	return {
		get: function get$$1(path) {
			return get(processor, store, normalisePath(path));
		},
		clone: function clone$$1() {
			return clone(processor, store);
		},
		cloneAt: function cloneAt$$1(path) {
			return cloneAt(processor, store, normalisePath(path));
		},
		set: function set$$1(next) {
			return store = set(processor, store, EMPTY_PATH, next);
		},
		setAt: function setAt(path, next) {
			return store = set(processor, store, normalisePath(path), next);
		},
		merge: function merge$$1(next) {
			return store = merge(processor, store, EMPTY_PATH, next);
		},
		mergeAt: function mergeAt(path, next) {
			return store = merge(processor, store, normalisePath(path), next);
		},
		remove: function remove$$1(path) {
			return store = remove(processor, store, normalisePath(path));
		}
	};
}

var simmDefault = configure({
	processors: [plainObjects, arrays],
	aggressive: false
});
simmDefault.configure = configure;

module.exports = simmDefault;
