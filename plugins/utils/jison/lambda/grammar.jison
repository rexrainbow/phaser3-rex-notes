/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
"random"              return 'RANDOM'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    function runFn(arg) {
        return (typeof(arg) === 'function')? arg() : arg;
    }
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : e '+' e
        {
            $$ = function() { return runFn($1) + runFn($3); };
        }
    | e '-' e
        {
            $$ = function() { return runFn($1) - runFn($3); };
        }
    | e '*' e
        {
            $$ = function() { return runFn($1) * runFn($3); };
        }
    | e '/' e
        {
            $$ = function() { return runFn($1) / runFn($3); };
        }
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    | RANDOM
        {
            $$ = function() { return Math.random(); }
        }
    ;
