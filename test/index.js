import fs from "fs";
import rewire from "rewire";

const module = rewire("../src/index.js");
const { Generator } = module;

// Debugging
let parser = fs.readFileSync(__dirname + "/../src/parser.pegjs", "utf8");
parser = require("pegjs").buildParser(parser);
module.__set__("parser", parser);

const options = {
  lambda: 0.5
};

let generator = Generator.fromFile(__dirname + "/test.dgl", options);

for (let value of generator.generate("Start"))
  process.stdout.write(value.replace(/\\n/g, "\n"));