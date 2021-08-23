/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"||"                  return "or"
"&&"                  return "and"
"OR"                  return "or"
"AND"                 return "and"
"or"                  return "or"
"and"                 return "and"
"("                   return '('
")"                   return ')'
"=>"                  return '=>'
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
    : e EOF
        {return $1;}
    ;

e
    : e 'or' e
        {
            $$ = ['or', $1, $3];
        }
    | e 'and' e
        {
            $$ = ['and', $1, $3];
        }
    | '(' e ')'
        {
            $$ = $2
        }
    | e '=>' e
        {
            $$ = ['=>', $1, $3];
        }
    | NAME 
        {
            $$ = $1;
        } 
    ;
