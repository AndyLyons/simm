/**
 * A fallback processor that will provide a zero-effect stub implementation of
 * the processor API methods for unknown objects that don't match any other
 * processor.
 */
const NO_KEYS = [];
const unknown = {
	matches() {
		return true;
	},

	has() {
		return false;
	},

	keys() {
		return NO_KEYS;
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
	}
};

/**
 * Combines multiple individual processors into a single processor. Method APIs
 * are delegated to the first processor whose `matches` method returns `true`.
 */
export default function combineProcessors(processors) {
	const cache = WeakMap && new WeakMap();
	const combined = {
		find(item) {
			if (cache && cache.has(item)) {
				return cache.get(item);
			}

			let processor = unknown;
			for(let i = 0, l = processors.length; i < l;) {
				const currentProcessor = processors[i++];
				if (currentProcessor.matches(item)) {
					processor = currentProcessor;
					break;
				}
			}

			cache && cache.set(item, processor);
			return processor;
		},

		matches() {
			return true;
		},

		has(item) {
			const processor = combined.find(item);
			return processor.has.apply(processor, arguments);
		},

		keys(item) {
			const processor = combined.find(item);
			return processor.keys.apply(processor, arguments);
		},

		get(item) {
			const processor = combined.find(item);
			return processor.get.apply(processor, arguments);
		},

		set(item) {
			const processor = combined.find(item);
			return processor.set.apply(processor, arguments);
		},

		merge(item) {
			const processor = combined.find(item);
			return processor.merge.apply(processor, arguments);
		},

		delete(item) {
			const processor = combined.find(item);
			return processor.delete.apply(processor, arguments);
		},

		new(item) {
			const processor = combined.find(item);
			return processor.new.apply(processor, arguments);
		}
	};

	return combined;
}