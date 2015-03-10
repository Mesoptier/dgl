"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var regeneratorRuntime = require("regenerator-runtime-only");

var parser = _interopRequire(require("../build/parser"));

var fs = _interopRequire(require("fs"));

var util = _interopRequire(require("util"));

// Debugging
// parser = fs.readFileSync(__dirname + "/parser.pegjs", "utf8");
// parser = require("pegjs").buildParser(parser);

var Generator = exports.Generator = (function () {
  function Generator(grammar) {
    var _this = this;

    _classCallCheck(this, Generator);

    this.ast = parser.parse(grammar);
    this.rules = {};
    this.ast.rules.forEach(function (rule) {
      _this.rules[rule.name] = rule;
    });
  }

  _createClass(Generator, {
    generate: {
      value: regeneratorRuntime.mark(function generate(startRule) {
        var _this = this;

        var node;
        return regeneratorRuntime.wrap(function generate$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              node = startRule ? _this.rules[startRule] : Object.values(_this.rules)[0];
              return context$2$0.delegateYield(_this._handle(node), "t0", 2);

            case 2:
            case "end":
              return context$2$0.stop();
          }
        }, generate, this);
      })
    },
    _handle: {
      value: regeneratorRuntime.mark(function _handle(node) {
        var _this = this;

        var sum, weights, rand, prev, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, expression, count;

        return regeneratorRuntime.wrap(function _handle$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.t1 = node.type;
              context$2$0.next = context$2$0.t1 === "rule" ? 3 : context$2$0.t1 === "weighted_expr" ? 5 : context$2$0.t1 === "sequence_expr" ? 19 : context$2$0.t1 === "repeated_expr" ? 45 : context$2$0.t1 === "ruleref_expr" ? 57 : context$2$0.t1 === "literal_expr" ? 59 : 62;
              break;

            case 3:
              return context$2$0.delegateYield(_this._handle(node.expression), "t2", 4);

            case 4:
              return context$2$0.abrupt("return");

            case 5:
              sum = 0;
              weights = node.choices.map(function (choice) {
                return sum += choice.weight || 1;
              }).map(function (weight) {
                return weight / sum;
              });
              rand = Math.random();
              prev = 0;
              context$2$0.t3 = regeneratorRuntime.keys(weights);

            case 10:
              if ((context$2$0.t4 = context$2$0.t3()).done) {
                context$2$0.next = 18;
                break;
              }

              i = context$2$0.t4.value;

              if (!(prev <= rand && rand < weights[i])) {
                context$2$0.next = 15;
                break;
              }

              return context$2$0.delegateYield(_this._handle(node.choices[i].expression), "t5", 14);

            case 14:
              return context$2$0.abrupt("return");

            case 15:
              prev = weights[i];
              context$2$0.next = 10;
              break;

            case 18:
              throw new Error("invalid weighted expression");

            case 19:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 22;
              _iterator = node.expressions[Symbol.iterator]();

            case 24:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 30;
                break;
              }

              expression = _step.value;
              return context$2$0.delegateYield(_this._handle(expression), "t6", 27);

            case 27:
              _iteratorNormalCompletion = true;
              context$2$0.next = 24;
              break;

            case 30:
              context$2$0.next = 36;
              break;

            case 32:
              context$2$0.prev = 32;
              context$2$0.t7 = context$2$0["catch"](22);
              _didIteratorError = true;
              _iteratorError = context$2$0.t7;

            case 36:
              context$2$0.prev = 36;
              context$2$0.prev = 37;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 39:
              context$2$0.prev = 39;

              if (!_didIteratorError) {
                context$2$0.next = 42;
                break;
              }

              throw _iteratorError;

            case 42:
              return context$2$0.finish(39);

            case 43:
              return context$2$0.finish(36);

            case 44:
              return context$2$0.abrupt("return");

            case 45:
              if (!(node.min > node.max)) {
                context$2$0.next = 47;
                break;
              }

              throw new Error("repeated_expr: min cannot be larger than max");

            case 47:
              if (!(node.min < 0)) {
                context$2$0.next = 49;
                break;
              }

              throw new Error("repeated_expr: min cannot be smaller than 0");

            case 49:
              count = Math.floor(Math.random() * (node.max - node.min + 1)) + node.min;
              i = 0;

            case 51:
              if (!(i < count)) {
                context$2$0.next = 56;
                break;
              }

              return context$2$0.delegateYield(_this._handle(node.expression), "t8", 53);

            case 53:
              i++;
              context$2$0.next = 51;
              break;

            case 56:
              return context$2$0.abrupt("return");

            case 57:
              return context$2$0.delegateYield(_this._handle(_this.rules[node.name]), "t9", 58);

            case 58:
              return context$2$0.abrupt("return");

            case 59:
              context$2$0.next = 61;
              return node.literal;

            case 61:
              return context$2$0.abrupt("return");

            case 62:
              throw new Error("unhandled node '" + node.type + "'");

            case 63:
            case "end":
              return context$2$0.stop();
          }
        }, _handle, this, [[22, 32, 36, 44], [37,, 39, 43]]);
      })
    }
  }, {
    fromFile: {
      value: function fromFile(file) {
        var grammar = fs.readFileSync(file, "utf8");
        return new this(grammar);
      }
    }
  });

  return Generator;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});