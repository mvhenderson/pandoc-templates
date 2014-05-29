// Based of the solarized CodeMirror stylesheet
var base03  = '002b36';
var base02  = '073642';
var base01  = '586e75';
var base00  = '657b83';
var base0   = '839496';
var base1   = '93a1a1';
var base2   = 'eee8d5';
var base3   = 'fdf6e3';
var yellow  = 'b58900';
var orange  = 'cb4b16';
var red     = 'dc322f';
var magenta = 'd33682';
var violet  = '6c71c4';
var blue    = '268bd2';
var cyan    = '2aa198';
var green   = '859900';
var fg = base00;
var bg = base3;

module.exports = {
    SourceCode: {color: fg, background: bg},
    tokens: [
      {name: 'CodeNormal',      color: fg},
      {name: 'CodeAtom',        color: magenta},
      {name: 'CodeAttribute',   color: cyan},
      {name: 'CodeBracket',     color: orange},
      {name: 'CodeBuiltin',     color: magenta},
      {name: 'CodeComment',     color: base01, italic: true},
      {name: 'CodeDef',         color: cyan},
      {name: 'CodeEm',          color: fg, italic: true},
      {name: 'CodeError',       color: red, underline: true},
      {name: 'CodeHeader',      color: base01, bold: true},
      {name: 'CodeHr',          color: base01},
      {name: 'CodeInvalidchar', color: red, underline: true},
      {name: 'CodeKeyword',     color: orange},
      {name: 'CodeLink',        color: base1, underline: true},
      {name: 'CodeMeta',        color: green},
      {name: 'CodeNegative',    color: fg },
      {name: 'CodeNumber',      color: magenta},
      {name: 'CodeOperator',    color: violet},
      {name: 'CodePositive',    color: fg },
      {name: 'CodeProperty',    color: cyan },
      {name: 'CodePunctuation', color: fg },
      {name: 'CodeQualifier',   color: yellow },
      {name: 'CodeQuote',       color: base1 },
      {name: 'CodeString',      color: green },
      {name: 'CodeStringB',     color: yellow },
      {name: 'CodeStrong',      color: fg, bold: true},
      {name: 'CodeTag',         color: base1},
      {name: 'CodeVariable',    color: blue},
      {name: 'CodeVariableB',   color: yellow},
      {name: 'CodeVariableC',   color: violet},
    ],
};
