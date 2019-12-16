/**
 * Author : Loris Levêque
 * Date : 15.12.2019
 * Description : 
 */

// Constants
const tensorflow = require("@tensorflow/tfjs");
const compile_default = {
	loss: 'meanSquaredError',
	optimizer: 'sgd',
	activation: 'tanh'
};
const layer_default = {
	units: 1,
	inputShape: [1]
};
// Variables

// Classes
class Brain {
	constructor() {
		this.brain;
	}
	init() {
		//require("@tensorflow/tfjs-node");
		//require("@tensorflow/tfjs-node-gpu");
		this.brain = tensorflow.sequential();
	}
	addLayer(layer_input) {
		var layer = isUndefined(layer_input) ? layer_input : layer_default;
		this.brain.add(tensorflow.layers.dense(layer));
	}
	compile(compile_input) {
		var compile = isUndefined(compile_input) ? compile_input : compile_default;
		this.brain.compile(compile);
	}
	async train(input_data) {
		var xs = tensorflow.tensor1d(input_data[0]);
		var ys = tensorflow.tensor1d(input_data[1]);

		await this.brain.fit(xs, ys);
	}
	async predict(input) {
		return this.brain.predict(tensorflow.tensor2d([input], [1, 1])).data();
	}
	print_tensors() {
		var tensors = this.brain.layers;
		var output = "";
		tensors.forEach((tensor) => {
			output += `${tensor.id} ${tensor.name}[${tensor.dtype}]: ${tensor.batchInputShape}\n`;
		});
		return output;
	}
	print_weight() {
		var output = "";
		var weight = this.brain.weight;
		weight.forEach((layer) => {
			output += `${layer.name}: ${layer.shape}\n`;
		});
		return output;
	}
}
// Events

// Functions
function isUndefined(input) {
	if (input == "undefined")
		return true;
	else
		return false;
}
// Others
module.exports = Brain;