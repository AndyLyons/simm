Aggressive mode:
- 3 levels?
	0 - All checks just use ===, no deep object compare
	1 - set / merge use deep object compare against the object they're replacing to avoid using new objects for same data
	2 - set / merge use deep object compare against every other object in the store to ensure all objects with the same data are the same object

Auto benchmarking:
	On startup kicks off a webworker that benchmarks aggressiveness levels, and calculates a time factor (e.g. 1x slower, 2x slower, 3.4x slower) between them
	Some API method e.g
		autoConfigure(function doStuff(start, finished) {
			start();
			doStuff...
			finished();
		}, 5);
	Executes the doStuff function once, with a certain aggressiveness. After 5 times (configurable via second parameter?) it tries a different aggressiveness. After 5 more times, it tries the last aggressiveness. It now has an average benchmark for how fast it runs with different settings, and thereafter it will use whicever was fastest.
		- Start/Finished callbacks are to support async 'doStuffs' that don't happen immediately (e.g. some render on a timeout or delay)

	In 'dev' mode it could print console messages detailing the results as you use the app (detect 'dev' mode from Node environment and use if(NODE_ENV.dev) => if(false) or whatever to strip out the code in prod environments?)