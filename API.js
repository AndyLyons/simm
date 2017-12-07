// `simm` provides the core methods. By default they support objects and arrays
import {get, set, merge, createStore, configure} from 'simm/es6';
import * as simm from 'simm/es6';
import simm from 'simm/es6';

// `simm/processors` contains standard processor classes
import {objects, arrays, maps} from 'simm/es6/processors';

// Compiled
const simm = require('simm'); // same as e.g. import * as simm from 'simm/es6'
const processors = require('simm/processors');


///////////
// Usage //
///////////
const mysimm = configure({get, set, createStore}, {
	processors: [arrays, objects]
});


const store = createStore({}); // defaults
const store = mysimm.createStore({}); // configured

const _get = curry(3, function(config, item, path) {

});

const _createStore = curry(2, function(config, store) {
	store = store !== undefined ? store : Object.create(null);
	return {
		get: _get(config, store)
	};
});

const defaultConfig = {processors:[arrays, objects]};
const get = _get(defaultConfig);
const set = _set(defaultConfig);
const createStore = _createStore(defaultConfig);

export default {
	get,
	set,
	...
};

export get;
export set;


function configure(api, config) {
	if (typeof api === 'function') {
		return api(config);
	}

	const configured = {};
	const keys = Object.keys(api);
	for (let i = 0, l = keys.length; i < l;) {
		const key = keys[i++];
		configured[key] = api[key](config);
	}
	return configured;
}

// Creates a partially applied version of a function. This is a simple
// implementation with limited use outside of simm, and providing no safety for
// bad arguments.
function curry(arity, func) {
	const allArgs = [];
	return function curried() {
		for (let i = 0, l = arguments.length; i < l;) {
			allArgs.push(arguments[i++]);
		}
		return allArgs.length < arity ? curried : func.apply(this, allArgs);
	};
}

// function configureMethod(method, config) {
// 	// Currently the most arguments an API method takes is 3. If more are
// 	// needed, more anonymous arguments will need to be added here. We use
// 	// anonymous parameters rather than the arguments object to keep the file
// 	// size down and the speed high.
// 	function simm(a,b,c) {
// 		return method.apply(this, [config, a, b, c]);
// 	}
// 	simm.impl = method;
// 	return simm;
// }

configureMethod(get, {processors: [...]});