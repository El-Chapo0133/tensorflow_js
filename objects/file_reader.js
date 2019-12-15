/**
 * Author : Loris Levêque
 * Date : 15.12.2019
 * Description : 
 */

// Constants
let fs = require('fs');
// Variables

// Classes
class fileReader {
	async read(url, callback) {
		fs.readFile(url, (err, data) => {
			if (err)
				throw(err);
			callback(data.toString());
		})
	}
}
// Instantiations

// Events

// Functions

// Others
module.exports = new fileReader();