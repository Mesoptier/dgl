{
  function makeList(first, rest) {
    return [ first ].concat(rest);
  }
}

Grammar
  = first:Rule rest:(_ r:Rule { return r; })* { return { type: "grammar", rules: makeList(first, rest) }; }

Rule
  = name:IdentifierName _ expr:Expression ";" { return { type: "rule", name: name, expression: expr }; }

Expression
  = expr:WeightedExpression _ { return expr; }

WeightedExpression
  = first:WeightedChoice rest:(__ r:WeightedChoice { return r; })* { return { type: "weighted_expr", choices: makeList(first, rest) }; }

WeightedChoice
  = weight:(Float?) ":" _ expr:SequenceExpression { return { weight: weight, expression: expr }; } 

SequenceExpression
  = first:RepeatedExpression rest:(__ r:RepeatedExpression { return r; })* { return { type: "sequence_expr", expressions: makeList(first, rest) }; }

RepeatedExpression
  = expr:NestedExpression repeat:RepeatedQuantifier? { return repeat == null ? expr : { type: "repeated_expr", min: repeat.min, max: repeat.max, expression: expr }; }

RepeatedQuantifier
  = "[" _ min:Integer _ "," _ max:Integer _ "]" { return { min: min, max: max }; }
  / "[" _ num:Integer _ "]" { return { min: num, max: num }; }
  / "+" { return { min: 1, max: Infinity }; }
  / "*" { return { min: 0, max: Infinity }; }

NestedExpression
  = "(" _ expr:SequenceExpression _ ")" { return expr; }
  / expr:PrimaryExpression { return expr; }

PrimaryExpression
  = literal:Literal { return { type: "literal_expr", literal: literal }; }
  / name:IdentifierName { return { type: "ruleref_expr", name: name }; }

Literal
  = '"' str:[^"]* '"' { return str.join(""); }
  / "'" str:[^']* "'" { return str.join(""); }

IdentifierName
  = str:[a-zA-Z]+ { return str.join(""); }

Integer
  = num:([0-9]+) { return parseInt(num.join("")); }

Float
  = num:([0-9]+ "."? [0-9]*) { return parseFloat(num.join("")); }

_
  = [ \t\r\n]*

__
  = [ \t\r\n]+