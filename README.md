# tensorflow_js
App that use tensorflow/tfjs with node - student work

## Simple class

Use it to simplify your usage of the tensorflow-tfjs package
I tried not to restrain too much the tensorflow package

import the class with :
```js
const Brain = require('tensorflow.js');
// i called it 'Brain' because it's fun :p
const brain = new Brain();
```

simple exemple :
```js
const Brain = require('tensorflow.js');
const brain = new Brain();

// first : define input (CMath.js is here for you) (batchSize dimension not included)
// then define all hidden layers
const model = brain.apply({shape: [5]}, {units: 10, activation: 'relu'}, {units: 2, activation: 'relu'});
// you can train, evaluate and predict with this model, but it has to be done from you, the class Brain cannot do this for you

// predict with some fake data, output is a tensor1d here
const output = model.predict(tensorflow.ones([2, 5]));

// .print() is a tensor function, which print the tensor ;)
output.print()
```

some more accompanied function from the 'Brain'
```js
const Brain = require('tensorflow.js');
const brain = new Brain();

// init the model, using the default options
brain.init();
// adding some hidden layers, 
brain.addLayer({units: 16, inputShape: [5], activation: 'relu'});
brain.addLayer({units: 2, inputShape: [16], activation: 'relu'});
brain.addLayer({units: 1, inputShape: [2], activation: 'relu'});
// compile the model with the hidden layers setted
brain.compile({optimizer: 'sgd', loss: 'meanSquaredError', metrics: ['accuracy']});
// fit the model with some fake data
brain.fit(tensorflow.ones([8, 5]), tensorflow.ones([8, 2]), {batchSize: 16, epochs: 4}, 20);
// predict from fake data, output is a tensor1d here
const output = brain.predict(tensorflow.ones([8, 5]), {batchSize: 4});

// print the output tensor with the tensorflow function .print();
output.print();
```

## CMath
simple class to perform some "complexes" calculations

## functions
everything has to be done..