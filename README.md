**Currently in alpha, expect breaking changes.**

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

#### Example
```js
// ES6
let generator = new Generator(grammar);
for (let value of generator.generate("start")) {
  console.log(value);
}

// ES5
var generator = new Generator(grammar);
var it = generator.generate("start");
var result = it.next();
while (!result.done) {
  console.log(result.value);
  result = it.next();
}
```

## Language
For now, only an extremely simple grammar is supported:
```
Start
  2: A
  1: B;
  
A : "a";
B : "b" A;
```
The above will generate `a` 2 out of 3 times, and `ba` 1 out of 3.

Rules start with an identifier and end with a `;`. Each choice in a rule starts with a `:`, which can have a number in front of it indicating the weight of the option (default weight is 1).

Currently supported expressions:
  * `"literal"` or `'literal'` - Simply yields the literal string.
  * `rule` - A reference to another rule to be yielded.
  * `(expression)` - Group expressions together, so you don't have to create an additional rule fpr them.
  * `expression{num}` - Repeat `expression` exactly `num` times.
  * `expression{min,max}` - Repeats `expression` a random amount of times, at least `min` and at most `max` times. This is uniformly distributed.
  * `expression+` or `expression*` - Repeats `expression` a random amount of times, at least 1 or 0 times respectively. This is exponentially distributed.