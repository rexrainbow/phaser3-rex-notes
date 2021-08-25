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
"or"                  return 'OP2'
"and"                 return 'OP2'
"OR"                  return 'OP2'
"AND"                 return 'OP2'
"very"                return 'OP1'
"fairly"              return 'OP1'
"VERY"                return 'OP1'
"FAIRLY"              return 'OP1'
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
%left 'OP1'
%left 'OP2'
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
    | OP1 ruleExp
        {
            var operator = $1.toLowerCase();
            $$ = [operator, $2];
        }        
    | ruleExp OP2 ruleExp
        {
            var operator = $2.toLowerCase();
            var op1 = $1, op2 = $3;
            var result = [operator];
            if (Array.isArray(op1) && (op1[0] === operator)) {
                for(var i=1, cnt=op1.length; i<cnt; i++) {
                    result.push(op1[i]);
                }
            } else {
                result.push(op1);
            }
            if (Array.isArray(op2) && (op2[0] === operator)) {
                for(var i=1, cnt=op2.length; i<cnt; i++) {
                    result.push(op2[i]);
                }
            } else {
                result.push(op2);
            }
            $$ = result;
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
