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

### simple exemples
to apply a neural network to an input (no train, no fit) and predict something
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
// fit the model with some fake data, last arg is the number of loops to perform
brain.fit(tensorflow.ones([8, 5]), tensorflow.ones([8, 2]), {batchSize: 16, epochs: 4}, 20);
// predict from fake data, output is a tensor1d here
const output = brain.predict(tensorflow.ones([8, 5]), {batchSize: 4});

// print the output tensor with the tensorflow function .print();
output.print();
```

## CMath
simple class to perform some "complexes" calculations
### Quartiles
```js
const CMath = require('CMath.js');
const cMath = new CMath();

const array = [1,2,5,8,0,2,6,12,63,89,3,74,94,13,73];

const Q0 = cMath.min(array);	// returns 0
const Q1 = cMath.Q1(array);		// returns 3
const Q2 = cMath.median(array);	// returns 12
const Q3 = cMath.Q3(array);		// returns 73
const Q4 = cMath.max(array);	// returns 94
```
### Other CMath functions
to get the moy of the array
```js
const CMath = require('CMath.js');
const cMath = new CMath();

const array = [1,2,5,8,0,2,6,12,63,89,3,74,94,13,73];

const output = cMath.moy(array); // returns 29.666666666666668
```
to get the scope of the array :
```js
const CMath = require('CMath.js');
const cMath = new CMath();

const array = [1,2,5,8,0,2,6,12,63,89,3,74,94,13,73];

const output = cMath.scope(array); // returns 94
```
to get the standard deviation :
```js
const CMath = require('CMath.js');
const cMath = new CMath();

const array = [1,2,5,8,0,2,6,12,63,89,3,74,94,13,73];

const output = cMath.standardDeviation(array); // returns 1341.8095238095234
```

## functions
everything has to be done..

### createTensor
this function create a tensor adapted to your data, it doesn't check the compatibilities with your model
```js
brain.createTensor([1,1]); // returns Tensor1d
brain.createTensor([[1], [1]]); // returns Tensor2d
brain.createTensor([[[1, 1], [1]], [[1, 1], [1]]]);	// returns Tensor3d
brain.createTensor([[[[1, 1], [1]], [1], [1, 1]], [1]]); // returns Tensor4d
```
### cloneLastLayer
this function clone the last layer used and add it to the neural network
```js
brain.addLayer({units: 16, inputShape: [16], activation: 'relu'});
brain.cloneLastLayer();

brain.getNumberLayers(); // returns 2
```