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
  = weight:(Number?) ":" _ expr:SequenceExpression { return { weight: weight, expression: expr }; } 

SequenceExpression
  = first:PrimaryExpression rest:(__ r:PrimaryExpression { return r; })* { return { type: "sequence_expr", expressions: makeList(first, rest) }; }

PrimaryExpression
  = literal:Literal { return { type: "literal_expr", literal: literal }; }
  / name:IdentifierName { return { type: "ruleref_expr", name: name }; }

Literal
  = '"' str:[^"]* '"' { return str.join(""); }
  / "'" str:[^']* "'" { return str.join(""); }

IdentifierName
  = str:[a-zA-Z]+ { return str.join(""); }

Number
  = num:([0-9]+ "."? [0-9]*) { return parseFloat(num.join("")); }

_
  = [ \t\r\n]*

__
  = [ \t\r\n]+