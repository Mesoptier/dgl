import parser from "../build/parser";
import fs from "fs";
import util from "util";

const defaultOptions = {
  lambda: 0.5
};

export class Generator {

  constructor(grammar, options) {
    Object.assign(this.options = {}, defaultOptions, options);

    this.ast = parser.parse(grammar);
    this.rules = {};
    this.ast.rules.forEach((rule) => { this.rules[rule.name] = rule; });
  }

  static fromFile(file, options) {
    let grammar = fs.readFileSync(file, "utf8");
    return new this(grammar, options);
  }

  *generate(startRule) {
    let node = startRule
      ? this.rules[startRule]
      : Object.values(this.rules)[0];

    yield* this._handle(node);
  }

  *_handle(node) {
    switch (node.type) {
      case "rule":
        yield* this._handle(node.expression);
        return;

      case "weighted_expr":
        let sum = 0;
        let weights = node.choices
          .map((choice) => sum += (choice.weight || 1))
          .map((weight) => weight / sum);

        let rand = Math.random();
        let prev = 0;
        for (let i in weights) {
          if (prev <= rand && rand < weights[i]) {
            yield* this._handle(node.choices[i].expression);
            return;
          }
          prev = weights[i];
        }
        throw new Error("invalid weighted expression");

      case "sequence_expr":
        for (let expression of node.expressions)
          yield* this._handle(expression);
        return;

      case "repeated_expr":
        if (node.min > node.max)
          throw new Error("repeated_expr: min cannot be larger than max");
        if (node.min < 0)
          throw new Error("repeated_expr: min cannot be smaller than 0");

        let num;

        if (node.min === node.max) {
          num = node.min;
        } else if (node.max == Infinity) {
          // Exponential distribution
          let lambda = this.options.lambda;
          num = Math.round(Math.log(1 - Math.random()) / -lambda) + node.min;
        } else {
          // Uniform distribution
          num = Math.floor(Math.random() * (node.max - node.min + 1)) + node.min;
        }

        for (let i = 0; i < num; i++)
          yield* this._handle(node.expression);
        return;

      case "ruleref_expr":
        yield* this._handle(this.rules[node.name]);
        return;

      case "literal_expr":
        yield node.literal;
        return;

      default:
        throw new Error(`unhandled node '${ node.type }'`);
    }
  }

}