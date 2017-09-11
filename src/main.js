import * as core from './core';
import plainObjects from './processors/plainObjects';
import arrays from './processors/arrays';
import combineProcessors from './combineProcessors';
import {normalisePath} from './utility';

/**
 * Returns the set of API methods with a custom configuration.
 */
const EMPTY_PATH = [];
function configure(config) {
	const processor = combineProcessors(config.processors);
	return {
		get(prev, path) {
			return core.get(processor, prev, normalisePath(path));
		},

		clone(prev) {
			return core.clone(processor, prev);
		},

		cloneAt(prev, path) {
			return core.cloneAt(processor, prev, normalisePath(path));
		},

		set(prev, next) {
			return core.set(processor, prev, EMPTY_PATH, next);
		},

		setAt(prev, path, next) {
			return core.set(processor, prev, normalisePath(path), next);
		},

		merge(prev, next) {
			return core.merge(processor, prev, EMPTY_PATH, next);
		},

		mergeAt(prev, path, next) {
			return core.merge(processor, prev, normalisePath(path), next);
		},

		remove(prev, path) {
			return core.remove(processor, prev, normalisePath(path));
		},

		createStore(store) {
			return createStore(processor, store);
		}
	};
}

/**
 * Creates a data store with the API methods, optionally with an initial state.
 * The data store removes the need for the `prev` data parameter, as all changes
 * are applied to the persistent store object.
 */
function createStore(processor, store) {
	return {
		get(path) {
			return core.get(processor, store, normalisePath(path));
		},

		clone() {
			return core.clone(processor, store);
		},

		cloneAt(path) {
			return core.cloneAt(processor, store, normalisePath(path));
		},

		set(next) {
			return store = core.set(processor, store, EMPTY_PATH, next);
		},

		setAt(path, next) {
			return store = core.set(processor, store, normalisePath(path), next);
		},

		merge(next) {
			return store = core.merge(processor, store, EMPTY_PATH, next);
		},

		mergeAt(path, next) {
			return store = core.merge(processor, store, normalisePath(path), next);
		},

		remove(path) {
			return store = core.remove(processor, store, normalisePath(path));
		}
	};
}

const simmDefault = configure({
	processors: [plainObjects, arrays],
	aggressive: false
});
simmDefault.configure = configure;

export default simmDefault;