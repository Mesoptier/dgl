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

        var sum, weights, rand, prev, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, expression;

        return regeneratorRuntime.wrap(function _handle$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.t1 = node.type;
              context$2$0.next = context$2$0.t1 === "rule" ? 3 : context$2$0.t1 === "weighted_expr" ? 5 : context$2$0.t1 === "sequence_expr" ? 19 : context$2$0.t1 === "ruleref_expr" ? 45 : context$2$0.t1 === "literal_expr" ? 47 : 50;
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
              return context$2$0.delegateYield(_this._handle(_this.rules[node.name]), "t8", 46);

            case 46:
              return context$2$0.abrupt("return");

            case 47:
              context$2$0.next = 49;
              return node.literal;

            case 49:
              return context$2$0.abrupt("return");

            case 50:
              throw new Error("unhandled node '" + node.type + "'");

            case 51:
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