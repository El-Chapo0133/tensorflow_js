/*
 * Author : Loris Levêque
 * Description : Class to do some math function
 *
 */

class CMath {
	moy(array) {
		let toReturn = 0;
		const LENGTH = array.length;
		for (let index = 0; index < LENGTH; index++) {
			toReturn += array[index];
		}
		return toReturn / LENGTH;
	}
	max(array) {
		const LENGTH = array.length - 1;
		return array.sort()[LENGTH]
	}
	min(array) {
		if (array.length === 0)
			return 0;
		return array.sort()[0];
	}
	median(array) {
		const LENGTH = array.length;
		if (LENGTH === 0)
			return 0;
		if (LENGTH % 2 === 0) {
			const MIDDLE = LENGTH / 2;
			return array[MIDDLE] + ((array[MIDDLE] + array[MIDDLE + 1]) / 2);
		} else {
			return array[(LENGTH + 1) / 2];
		}
	}
	scope(array) {
		const LENGTH = array.length - 1;
		const COPYARRAY = array.sort();
		return COPYARRAY[LENGTH] - COPYARRAY[0];
	}
	standardDeviation(array) {
		const LENGTH = array.length;
		const MOY = this.moy(array);
		let buffer = 0;
		for (let index = 0; index < LENGTH; index++) {
			buffer += Math.pow(array[index] - MOY, 2);
		}
		return buffer / (LENGTH - 1);
	}
	Q1(array) {
		const LENGTH = array.length;
		return array[(LENGTH + 3) / 4];
	}
	Q3(array) {
		const LENGTH = array.length;
		return array[((3 * LENGTH) + 1) / 4]
	}
}

module.exports = new CMath();