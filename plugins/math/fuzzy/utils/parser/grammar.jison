/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
// Vairable
":"                   return ":"
","                   return ","
// Rule
"=>"                  return '=>'
"or"                  return "or"
"and"                 return "and"
"OR"                  return "or"
"AND"                 return "and"
"||"                  return "or"
"&&"                  return "and"
"("                   return '('
")"                   return ')'
// Vairable
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
// Common
[0-9a-zA-Z_.]+[+-]*   return 'NAME'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '=>'
%left 'or'
%left 'and'
%start expressions

%% /* language grammar */

expressions
    : varExp EOF
        {return $1;}
    | ruleExp EOF
        {return $1;}
    ;

varExp
    : NAME ':' NUMBER ',' NUMBER ',' NUMBER ',' NAME
        {
            var left = Number($3),
                right = Number($7),
                middle = Number($5);
            // setName, left, middle, right, type
            $$ = [$1,   left, middle, right, $9];
        }
    | NAME ':' NUMBER ',' NUMBER ',' NUMBER
        {
            var left = Number($3),
                right = Number($7),
                middle = Number($5);
            // setName, left, middle, right, type
            $$ = [$1,   left, middle, right, undefined];
        }
    | NAME ':' NUMBER ',' NUMBER
        {
            var left = Number($3),
                right = Number($5),
                middle = (left + right)/2;
            // setName, left, middle, right, type
            $$ = [$1,   left, middle, right, undefined];
        }
    | NAME ':' NUMBER ',' NUMBER ',' NAME
        {
            var left = Number($3),
                right = Number($5),
                middle = (left + right)/2;            
            // setName, left, middle, right, type
            $$ = [$1,   left, middle, right, $7];
        }
    ;

ruleExp
    : '(' ruleExp ')'
        {
            $$ = $2
        }
    | ruleExp 'or' ruleExp
        {
            $$ = ['or', $1, $3];
        }
    | ruleExp 'and' ruleExp
        {
            $$ = ['and', $1, $3];
        }

    | ruleExp '=>' NAME
        {
            $$ = ['=>', $1, $3];
        }
    | NAME 
        {
            $$ = $1;
        } 
    ;
