import * as core from './core';
import {normalisePath} from './utility';

const simm = {
	get(prev, path, config) {
		return core.get(prev, normalisePath(path), 0, config);
	},

	set(prev, next, config) {
		return core.set(prev, [], next, config);
	},

	setAt(prev, path, next, config) {
		return core.set(prev, normalisePath(path), next, config);
	},

	merge(prev, next, config) {
		return core.merge(prev, [], next, config);
	},

	mergeAt(prev, path, next, config) {
		return core.merge(prev, normalisePath(path), next, config);
	},

	remove(prev, path, config) {
		return core.remove(prev, normalisePath(path), config);
	},

	clone(item, shallow, config) {
		return core.clone(item, shallow, config);
	},

	createStore(store, config) {
		return {
			get(path) {
				return simm.get(store, path, config);
			},

			set(next) {
				return store = simm.set(store, next, config);
			},

			setAt(path, next) {
				return store = simm.setAt(store, path, next, config);
			},

			merge(next) {
				return store = simm.merge(store, next, config);
			},

			mergeAt(path, next) {
				return store = simm.mergeAt(store, path, next, config);
			},

			remove(path) {
				return store = simm.remove(store, path, config);
			}
		};
	}
};

// function configure(methods, settings) {
// 	const config = {
// 		pcsr: combineProcessors(settings.processors)
// 	};

// 	if (typeof methods === 'function') {
// 		return methods(config);
// 	}

// 	const configured = {};
// 	const keys = Object.keys(methods);
// 	for (let i = 0, l = keys.length; i < l;) {
// 		const key = keys[i++];
// 		configured[key] = methods[key](config);
// 	}
// 	return configured;
// }

// const defaultConfig = {processors:[arrays, objects]};
// const get = configure(_get, defaultConfig);
// const set = configure(_set, defaultConfig);
// const createStore = configure(_createStore, defaultConfig);

// const simmDefault = configure({
// 	processors: [objects, arrays],
// 	aggressive: false
// });
// simmDefault.configure = configure;

export default simm;