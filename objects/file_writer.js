/**
 * Author : Loris Levêque
 * Date : 15.12.2019
 * Description : 
 */

// Constants
let fs = require('fs');
// Variables

// Classes
class fileWriter {
	write(url, data) {
		fs.writeFile(url, data, (err) => {
			if (err)
				throw(err);
		})
	}
}
// Instantiations

// Events

// Functions

// Others
module.exports = new fileWriter();