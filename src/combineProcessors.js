import basic from './processors/basic';

/**
 * Combines multiple individual processors into a single processor. Method APIs
 * are delegated to the first processor whose `matches` method returns `true`.
 */
export default function combineProcessors(processors) {
	const cache = WeakMap && new WeakMap();
	return function getProcessor(item) {
		if (cache && cache.has(item)) {
			return cache.get(item);
		}

		let processor = basic;
		for(let i = 0, l = processors.length; i < l;) {
			const currentProcessor = processors[i++];
			if (currentProcessor.matches(item)) {
				processor = currentProcessor;
				break;
			}
		}

		cache && cache.set(item, processor);
		return processor;
	};
}