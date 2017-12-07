import combineProcessors from '../combineProcessors';
import arrays from 'arrays';
import objects from 'objects';
import unknown from 'unknown';

const getProcessor = combineProcessors([arrays, objects, unknown]);

/**
 * A prebuilt combination of the core supported types (arrays and objects), plus
 * default handling for unknown types.
 */
const basic = {};

const methods = Object.keys(unknown);
for (let i = 0, l = methods.length; i < l;) {
	const method = methods[i++];
	basic[method] = function(item) {
		const processor = getProcessor(item);
		return processor[method].apply(processor, arguments);
	};
}

export default basic;