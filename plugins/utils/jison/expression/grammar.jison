/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"+"                   return "PLUS"
"-"                   return "MINUS"
"*"                   return "MULTIPLE"
"/"                   return "DIVIDE"
"("                   return "LP"
")"                   return "RP"
"="                   return "EQU"
[0-9]+("."[0-9]+)?    return 'NUMBER'
[a-zA-Z]+("_"[0-9a-zA-Z]+)? return 'WORD'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start file

%% /* language grammar */

file: 
    statement EOF { return $1; }
    ;

statement:
  term PLUS term {$$ = $1 + $3}
  |
  term MINUS term {$$ = $1 - $3}
  |
  term {$$ = $1}
  ;

term:
  factor MULTIPLE factor {$$ = $1 * $3}
  |
  factor DIVIDE factor {$$ = $1 / $3}
  |
  factor {$$ = $1}
  ;

factor:
  NUMBER {$$ = parseFloat($1)}
  |
  WORD {$$ = $1}
  |
  LP statement RP {$$ = $2}
  ;
