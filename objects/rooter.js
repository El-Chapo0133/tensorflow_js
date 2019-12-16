const fileReader = require('./file_reader.js');
const fileWriter = require('./file_writer.js');
const Brain = require('./tensorflow.js');

let de = require('../roots/de.js');

var brain = new Brain();

class Rooter {
	constructor() {
		fileReader.read('_resources/data.json', (result) => {
			this.data = JSON.parse(result).init_data_train;
			console.log("> file readed");
		});
	}
	de(e) {
		var output_array = de.generate(e);
		var output = "";
		output_array.forEach((cell) => {
			output += `${cell} - `;
		});
		e.channel.send(output.substring(0, output.length - 2));
		/*fileReader.read('./../_resources/data.json', (err, data) => {
			if (err)
				throw(err);
			var json = JSON.parse(data);
			output_array.forEach((cell) => {
				json.init_data_train[0][json.init_data_train.length + 1] = parseInt(cell);
				json.init_data_train[1][json.init_data_train.length + 1] = parseInt(String(e.content).split(' ')[2]);				
			});
			fileWriter('./../_resources/data.json', JSON.stringify(json), (err) => {
				if (err)
					throw(err);
			});
		});*/
	}
	init(e) {
		console.log(`|- command: ${e.content}`)
		init_brain();
		e.channel.send("> ml initialized");
		brain.train(this.data);
		e.channel.send("> ml trained");
	}
	retrain(e) {
		console.log(`|- command: ${e.content}`)
		brain.train(this.data);
		e.channel.send("> ml retrained");
	}
	predict(e) {
		var input = parseInt(String(e.content).split(' ')[1]);
		console.log(`|- command: ${e.content}`)
		init_brain();
		brain.train(this.data);
		brain.predict(input).then((result) => {
			e.channel.send("```" + result.toString() + "```");
		});
	}
	print_tensors(e) {
		var tensors = brain.print_tensors();
		e.channel.send(tensors.toString());
	}
	print_weight(e) {
		var weight = brain.print_weight();
		e.channel.send("```" + weight + "```");
	}
}

function init_brain() {
	brain.init();
	brain.addLayer();
	brain.addLayer({units: 1000, activation: 'relu6'});
	brain.addLayer({units: 1000, activation: 'relu6'});
	brain.compile();
}

module.exports = new Rooter();