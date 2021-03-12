/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b         return 'NUMBER'
"*"                          return '*'
"/"                          return '/'
"-"                          return '-'
"+"                          return '+'
"^"                          return '^'
"("                          return '('
")"                          return ')'
","                          return ','
[a-zA-Z]+("_"[0-9a-zA-Z]+)?  return 'NAME'
<<EOF>>                      return 'EOF'
.                            return 'INVALID'

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

expression_list
    : expression_list ',' e
        { $$ = $1.concat([$3]); }
    | e
        { $$ = [$1]; }
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
        {
            $$ = function() { Math.pow(runFn($1), runFn($3)); };
        }
    | '-' e %prec UMINUS
        {
            $$ = function() { return -runFn($2); };
        }
    | '(' e ')'
        {$$ = $2;}
    | NAME '(' ')'
        {
            $$ = function() {
                return yy.parser[$NAME]();
            }
        }        
    | NAME '(' expression_list ')'
        {
            $$ = function() { 
                var self = yy.parser, args = $expression_list.map(runFn);
                return self[$NAME].apply(self, args);
            }
        }
    | NUMBER
        {$$ = Number(yytext);}
    ;
