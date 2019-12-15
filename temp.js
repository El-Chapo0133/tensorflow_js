let fs = require('fs');

const output_file = "./_resources/data.json";
const min_val = 2, max_val = 100;

var output = {};
var data = [];
data[0] = [];
data[1] = [];

function getRandom(min,max) {
	return String(Math.random(min,max) * max + min).split('.')[0];
}

for (var index = 0; index < 1000000; index++) {
	var faces = getRandom(0,100);
	data[0][index] = parseInt(getRandom(0,faces));
	data[1][index] = parseInt(faces);
}
output.init_data_train = data;

fs.writeFile(output_file, JSON.stringify(output), (err) => {
	if (err)
		throw(err);
	console.log("finished");
});