const fileReader = require('./file_reader.js');
const fileWriter = require('./file_writer.js');
const Brain = require('./tensorflow.js');

var brain = new Brain();

class Rooter {
	constructor() {
		fileReader.read('_resources/data.json', (result) => {
			this.data = JSON.parse(result).init_data_train;
			console.log("> file readed");
		});
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
}

function init_brain() {
	brain.init();
	brain.addLayer();
	brain.addLayer({units: 1000, activation: 'relu6'});
	brain.addLayer({units: 1000, activation: 'relu6'});
	brain.compile();
}

module.exports = new Rooter();