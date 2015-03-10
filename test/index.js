import { Generator } from "../src";

let generator = Generator.fromFile(__dirname + "/test.dgl");

for (let i = 0; i < 20; i++) {
  process.stdout.write(i + ": ");
  for (let value of generator.generate("Start"))
    process.stdout.write(value);
  process.stdout.write("\n");
}
