// Based on the default colors of Cache Studio
var navy    = '000088';
var blue    = '0000FF';
var red     = 'FF0000';
var olive   = '888800';
var fuchsia = 'FF00FF';
var maroon  = '880000';
var teal    = '008888';
var green   = '008800';
var purple  = '880088';
var fg = '000000';
var bg = 'F8F8F8'; // just a hint

module.exports = {
    SourceCode: {color: fg, background: bg},
    tokens: [
      {name: 'CodeNormal',      color: fg},
      {name: 'CodeAtom',        color: purple},
      {name: 'CodeAttribute',   color: maroon},
      {name: 'CodeBracket',     color: fg},
      {name: 'CodeBuiltin',     color: blue},
      {name: 'CodeComment',     color: green},
      {name: 'CodeDef',         color: fg},
      {name: 'CodeError',       color: red, underline: true},
      {name: 'CodeInvalidchar', color: red, underline: true},
      {name: 'CodeKeyword',     color: navy},
      {name: 'CodeMeta',        color: red},
      {name: 'CodeNumber',      color: fg},
      {name: 'CodeOperator',    color: fg},
      {name: 'CodeProperty',    color: blue},
      {name: 'CodeQualifier',   color: teal},
      {name: 'CodeString',      color: green},
      {name: 'CodeStringB',     color: olive},
      {name: 'CodeTag',         color: navy},
      {name: 'CodeVariable',    color: olive},
      {name: 'CodeVariableB',   color: fuchsia},
      {name: 'CodeVariableC',   color: maroon},

      // not used by studio languages
      {name: 'CodeEm',          color: fg},
      {name: 'CodeHeader',      color: fg},
      {name: 'CodeHr',          color: fg},
      {name: 'CodeLink',        color: fg},
      {name: 'CodeNegative',    color: fg},
      {name: 'CodePositive',    color: fg},
      {name: 'CodePunctuation', color: fg},
      {name: 'CodeQuote',       color: fg},
      {name: 'CodeStrong',      color: fg},
    ],
};
