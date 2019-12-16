/**
 * Author 		: Loris Levêque
 * Date 		: 10.12.2019
 * Description 	: generate the des
 * 
 */

// ### Constants

// ### Variables

// ### Classes
class DeGeneration {
	generate(e) {
		var commands = e.content.split(' ');
		if (commands.length == 2) {
			commands[2] = 1
		}
		// nb faces commands[1] - nb de commands[2]7
		if (this.isRightValues(commands)) {
			var output_array = []
			var output_message = "> ";
			for (var index = 0; index < commands[2]; index++) {
				output_array[index] = String(getRandom(1, commands[1])).split('.')[0];
			}
			return output_array;
		} else {
			var output = "wrong params given";
			return output;
		}
	}
	isRightValues(e) {
		if (e[1] >= 2 && e[2] >= 1 && e[2] <= 100)
			return true;
		else
			return false;
	}
}
// ### Instanciations

// ### Functions
function getRandom(min, max) {
	return Math.random(min, max) * max + min;
}
// ### Events

// ### Others
module.exports = new DeGeneration();