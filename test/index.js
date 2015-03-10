import { Generator } from "../src";

let generator = Generator.fromFile(__dirname + "/test.dgl");

for (let value of generator.generate("Function"))
  process.stdout.write(value.replace("\\n", "\n"));