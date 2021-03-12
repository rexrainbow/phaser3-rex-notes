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
">="                         return ">="
"<="                         return "<="
">"                          return '>'
"<"                          return '<'
"=="                         return "=="
"!="                         return "!="
"||"                         return "||"
"&&"                         return "&&"
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

    function runMethod(self, name, args) {
        if (self[name]) {
            if (args) {
                args = args.map(runFn);
                return self[name].apply(self, args);
            } else {
                return self[name]();
            }
        } else {
            return self.defaultHandler(name, args);
        }
    }
%}

/* operator associations and precedence */

%left '||' '&&'
%left '>' '<' '==' '!=' '>=' '<='
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
            $$ = function() { return runMethod(yy.parser, 'add', [$1, $3]); };
        }
    | e '-' e
        {
            $$ = function() { return runMethod(yy.parser, 'subtract', [$1, $3]); };
        }
    | e '*' e
        {
            $$ = function() { return runMethod(yy.parser, 'multiply', [$1, $3]); };
        }
    | e '/' e
        {
            $$ = function() { return runMethod(yy.parser, 'divide', [$1, $3]); };
        }
    | e '^' e
        {
            $$ = function() { return runMethod(yy.parser, 'pow', [$1, $3]); };
        }
    | e '>' e
        {
            $$ = function() { return runMethod(yy.parser, 'greaterThen', [$1, $3]) == true; };
        }
    | e '<' e
        {
            $$ = function() { return runMethod(yy.parser, 'lessThen', [$1, $3]) == true; };
        }
    | e '==' e
        {
            $$ = function() { return runMethod(yy.parser, 'equalTo', [$1, $3]) == true; };
        }
    | e '!=' e
        {
            $$ = function() { return runMethod(yy.parser, 'equalTo', [$1, $3]) == false; };
        }
    | e '>=' e
        {
            $$ = function() { return runMethod(yy.parser, 'lessThen', [$1, $3]) == false; };
        }
    | e '<=' e
        {
            $$ = function() { return runMethod(yy.parser, 'greaterThen', [$1, $3]) == false; };
        }
    | e '||' e
        {
            $$ = function() { return runMethod(yy.parser, 'or', [$1, $3]) == true; };
        }
    | e '&&' e
        {
            $$ = function() { return runMethod(yy.parser, 'and', [$1, $3]) == true; };
        }        
    | '-' e %prec UMINUS
        {
            $$ = function() { return -runFn($2); };
        }
    | '(' e ')'
        {$$ = $2;}
    | NAME 
        {
            $$ = function() {
                var data = yy.parser.data;
                return (data.hasOwnProperty($NAME))? data[$NAME] : 0;
            }
        }
    | NAME '(' ')'
        {
            $$ = function() { return runMethod(yy.parser, $NAME); }
        }        
    | NAME '(' expression_list ')'
        {
            $$ = function() { return runMethod(yy.parser, $NAME, $expression_list); }
        }
    | NUMBER
        {$$ = Number(yytext);}
    ;
