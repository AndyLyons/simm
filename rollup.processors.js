import globby from 'globby';
import babel from 'rollup-plugin-babel';

const configs = globby.sync('src/processors/*.js').map(inputFile => ({
	input: inputFile,
	output: {
		file: inputFile.replace('src', 'lib'),
		format: 'cjs'
	},
	plugins: [
		babel()
	]
}));

export default configs;