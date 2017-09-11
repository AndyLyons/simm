import babel from 'rollup-plugin-babel';

export default {
	input: 'src/main.js',
	output: {
		file: 'lib/simm.js',
		format: 'cjs'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**' // only transpile our source code
		})
	]
};