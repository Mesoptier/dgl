import { Generator } from "../src";

let generator = Generator.fromFile(__dirname + "/test.dgl");

for (let value of generator.generate("Start"))
  process.stdout.write(value.replace(/\\n/g, "\n"));