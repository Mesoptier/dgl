# DGL -  Data Generation Language
> Generate random data using grammar-like specifications.


## Usage
1. Install using `npm install dgl`
2. Import/require:
  * ES6: `import { Generator } from "dgl";`
  * ES5: `var Generator = require("dgl/es5").Generator;`
  
*Note: `dgl/es5` contains the [babel](https://babeljs.io/)-compiled code from `dgl`.*


## API
#### `new Generator(grammar)`
Creates a new generator, `grammar` is a string containing the dgl.

#### `Generator.fromFile(filename)`
Creates a new generator with the grammar synchronously read from `filename`.

#### `generator.*generate([startRule])`
ES6 generator that yields a part of the random data each `.next()` call.
`startRule` is the rule to start the generation with, defaults to the first rule in the grammar.


## Language
