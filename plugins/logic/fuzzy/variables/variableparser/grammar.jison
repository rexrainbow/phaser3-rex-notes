/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
":"                   return ":"
","                   return ","
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[0-9a-zA-Z_.]+[+-]*   return 'NAME'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
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
