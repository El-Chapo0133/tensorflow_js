/**
 * Author : Loris Levêque
 * Date : 16.02.2020
 * Description : ml file for the tensorflow-tfjs library
 */

const tensorflow = require('@tensorflow-tfjs');

const default_init_options = {
	layers: [
		tensorflow.layers.dense({units: 1, inputShape: [1]})
	],
	name: "my_model",
}
const default_compile_options = {
	optimizer: 'sgd',
	loss: 'meanSquaredError',
	metrics: ['accuracy'],
}
const default_evaluate_options = {
	batchSize: 1,
}
const default_layer_options = {
	units: 1,
	inputShape: [1],
	activation: 'relu',
}
const default_fit_options = {
	batchSize: 1,
	epochs: 1,
}
const default_predict_options = {
	batchSize: 1,
}
const default_data = {
	save_file: '/tmp/saved-model'
}

class Brain {
	constructor() {
		this.model = null;
		this.bufferLayer = null;
		this.isCompiled = false;
		this.fits = [];
		//require('@tensorflow-tfjs-node');
		//require('@tensorflow-tfjs-node-gpu');
	}
	init(options) {
		const treated_options = applyInputOptions(default_init_options, options);
		try {
			if (options === "undefined")
				this.model = tensorflow.sequential();
			else
				this.model = tensorflow.sequential(treated_options);
		} catch(exception) {
			console.log({
				title: 'error on init function',
				exception: exception,
			});
			throw(exception);
		}
	}
	addLayer(layer_configs) {
		[...layer_configs].forEach(layer_config => {
			const treated_layer = applyInputOptions(default_layer_options, layer_config);
			try {
				this.bufferLayer = tensorflow.layers.dense(treated_layer);
				this.model.add(this.bufferLayer);
			} catch(exception) {
				console.log({
					title: 'Error on addLayer function',
					exception: exception,
				});
				throw(exception);
			}
		});
	}
	compile(options) {
		const treated_options = applyInputOptions(default_compile_options, options);
		try {
			this.model.compile(options);
		} catch(exception) {
			console.log({
				title: 'error on compile function',
				exception: exception,
			})
			throw(exception);
		}
	}
	fit(x, y, options, loops) {
		const treated_options = applyInputOptions(default_fit_options, options);
		for (let index = 0; index < loops; index++) {
			try {
				this.fits.push(this.model.fit(x, y, treated_options));
			} catch(exception) {
				console.log({
					title: 'error on fit function',
					loop: index,
					exception: exception,
				});
				throw(exception);
			}
		}
	}
	evaluate(x,y,options) {
		if (!this.isCompiled) {
			console.log("This model hasn't compiled yet");
			return 0;
		}
		const treated_options = applyInputOptions(default_evaluate_options, options);
		try {
			this.model.evaluate(x,y,options).print();
		} catch(exception) {
			console.log({
				title: 'error on evaluate fonction',
				exception: exception,
			});
			throw(exception);
		}
	}
	predict(input, options) {
		const treated_options = applyInputOptions(default_predict_options, options);
		try {
			return this.model.predict(input);
		} catch(exception) {
			console.log({
				title: 'error on predict function',
				exception: exception
			});
			throw(exception);
		}
	}
	apply(args) {
		let ARGS = [...agrs]

		const tf_input = tensorflow.input(ARGS[0]);
		ARGS.shift();

		let buffer;
		let index = 0;
		ARGS.forEach(arg => {
			let treated_layer = applyInputOptions(default_layer_options, arg);
			if (index === 1) {
				buffer = tensorflow.layers.dense(treated_layer);
				continue
			}
			buffer = buffer.apply(tensorflow.layers.dense(treated_layer));
		});

		return tensorflow.model({inputs: tf_input, outputs: buffer});
	}
	cloneLastLayer() {
		if (this.bufferLayer === null)
			return 0;
		try {
			this.model.add(this.bufferLayer);
		} catch(exception) {
			console.log({
				title: 'Error on clone function | adding the bufferLayer',
				exception: exception,
			});
			throw(exception);
		}
	}
	createTensor(input) {
		let buffer = 0;
		while (typeof input[buffer] != Number) {
			buffer++;
		}
		return tensorflow[`tensor${buffer + 1}d`](input);
	}

	getModel() {
		return this.model;
	}
	getLayerInput() {
		return JSON.stringify(this.model.outputs[0].shape);
	}
	getNumberLayers() {
		return this.model.getLayer().length;
	}
	async save(file) {
		const outputFile = file === "undefined" ? default_data.save_file : file;
		try {
			await this.model.save(outputFile);
			return
		} catch(exception) {
			console.log({
				title: 'error on save function',
				exception: exception,
			});
			throw(exception);
		}
	}
	async load(file) {
		const inputFile = file === "undefined" ? default_data.save_file : file;
		try {
			this.model = await tensorflow.load(inputFile);
		} catch(exception) {
			console.log({
				title: 'error on load function',
				exception: exception,
			});
			throw(exception);
		}
	}
}

function applyInputOptions(default_options, input_options) {
	let treated_options = default_options;
	Object.keys(input_options).forEach(key => {
		treated_options[key] = input_options[key];
	});
	return treated_options;
}

module.exports = Brain;