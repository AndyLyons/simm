// // var timm = require('timm');

// // var prev = {
// // 	a: {
// // 		b: 1
// // 	}
// // };

// // var next = timm.mergeIn(prev, ['a'], {b: 1});
// // console.log(JSON.stringify(prev), JSON.stringify(next), ' ---- ', prev === next);
// // console.log(JSON.stringify(prev.a), JSON.stringify(next.a), ' ---- ', prev.a === next.a);
// // console.log(JSON.stringify(prev.a.b), JSON.stringify(next.a.b), ' ---- ', prev.a.b === next.a.b);


function canWinAtNextRace(driver) {
	const beatenAllRivals = compareAgainstRivals(driver, (rival, pointsNeeded) => pointsNeeded <= 0, 'every');
	const cannotWin = compareAgainstRivals(driver, (rival, pointsNeeded) => pointsNeeded > 25, 'some');

	if (beatenAllRivals) {
		console.log(`${name(driver)} has already won!`);
	} else if (cannotWin) {
		console.log(`${name(driver)} can't win at the next race`);
	} else {
		console.log(`To win ${name(driver)} must...`);
		compareAgainstRivals(driver, (rival, pointsNeeded) => {
			if (pointsNeeded <= 25 && pointsNeeded > 0) {
				console.log(`\t...beat ${name(rival)} by ${pointsNeeded} points`);
			}
		});

		console.log('');

		scenarios(driver);
	}
}

function compareAgainstRivals(driver, handler, iterator = 'forEach') {
	const remainingPoints = (remainingRaces - 1) * points[0];
	const currentPoints = standings[driver];
	const rivals  = Object.keys(standings).filter(rival => rival !== driver);

	return rivals[iterator](rival => {
		const pointsNeeded = (standings[rival] + remainingPoints) - currentPoints;
		return handler(rival, pointsNeeded);
	});
}

function scenarios(driver) {
	points.forEach((driverPoints, iD) => {
		const driverPosition = iD + 1;
		let firstLine = true;

		const canWinAtPosition = compareAgainstRivals(driver, (rival, pointsNeeded) => {
			return findRivalLosingPosition(driverPosition, pointsNeeded) >= 0;
		}, 'every');

		if (canWinAtPosition) {
			compareAgainstRivals(driver, (rival, pointsNeeded) => {
				const rivalLosingPosition = findRivalLosingPosition(driverPosition, pointsNeeded);
				if (rivalLosingPosition > 0) {
					if (firstLine) {
						console.log(`\tIf ${name(driver)} finishes [${driverPosition}]...`);
						firstLine = false;
					}
					console.log(`\t\t...${name(rival)} must finish [${rivalLosingPosition}]`);
					return false;
				}
				return true;
			});
		}
	});
}

function findRivalLosingPosition(driverPosition, pointsNeeded) {
	if (pointsNeeded <= 0) {
		return 0; // driver already won
	}

	const driverPoints = points[driverPosition - 1];

	for (var iR = driverPosition; iR < points.length; ++iR) {
		const rivalPoints = points[iR];
		const pointsDifference = driverPoints - rivalPoints;
		if (pointsNeeded <= pointsDifference) {
			return iR + 1;
		}
	}

	return -1; // driver cannot win
}

function name(name) {
	return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
}

const remainingRaces = 4;
const points = [25,18,15,12,10,8,6,4,2,1];
const standings = {
	hamilton: 306,
	vettel: 247,
	verstappen: 232
};

canWinAtNextRace('hamilton');
