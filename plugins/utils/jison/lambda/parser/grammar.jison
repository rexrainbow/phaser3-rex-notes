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
"?"                          return "?"
":"                          return ":"
"("                          return '('
")"                          return ')'
","                          return ','
"."                          return '.'
'true'                       return 'true'
'false'                      return 'false'
[a-zA-Z]+("_"[0-9a-zA-Z]+)?  return 'NAME'
<<EOF>>                      return 'EOF'
.                            return 'INVALID'

/lex

%{
    function runFn(arg, ctx) {
        return (typeof(arg) === 'function')? arg(ctx) : arg;
    }

    function runMethod(self, ctx, name, args, dotMode) {
        if (dotMode === undefined) {
            dotMode = false;
        }
        var method = self[(dotMode)? "getDotProperty" : "getProperty"](ctx, name);
        if (method === undefined) {
            method = self.getProperty(ctx, 'defaultHandler');
        }

        if (args) {
            args = args.map(function(arg){ return runFn(arg, ctx); });
        }
        return method.apply(self, args);
    }
%}

/* operator associations and precedence */

%left '?' ':'
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

dot_name
    : dot_name '.' NAME
        { $$ = `${$1}.${$3}`}
    | NAME
        { $$ = $1; }
    ;

e
    : e '+' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'add', [$1, $3]); };
        }
    | e '-' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'subtract', [$1, $3]); };
        }
    | e '*' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'multiply', [$1, $3]); };
        }
    | e '/' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'divide', [$1, $3]); };
        }
    | e '^' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'pow', [$1, $3]); };
        }
    | e '>' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'greaterThen', [$1, $3]) == true; };
        }
    | e '<' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'lessThen', [$1, $3]) == true; };
        }
    | e '==' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'equalTo', [$1, $3]) == true; };
        }
    | e '!=' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'equalTo', [$1, $3]) == false; };
        }
    | e '>=' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'lessThen', [$1, $3]) == false; };
        }
    | e '<=' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, 'greaterThen', [$1, $3]) == false; };
        }
    | e '||' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'or', [$1, $3]) == true; };
        }
    | e '&&' e
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, 'and', [$1, $3]) == true; };
        }        
    | '-' e %prec UMINUS
        {
            $$ = function(ctx) { return -runFn($2, ctx); };
        }
    | '(' e ')'
        {
            $$ = function(ctx) { return runFn($2, ctx); };
        }
    | '(' e ')' '?' e ':' e
        {
            $$ = function(ctx) { return runFn($2, ctx)? runFn($5, ctx) : runFn($7, ctx); };
        }
    | 'true'
        { $$ = true; }
    | 'false'
        { $$ = false; }
    | dot_name 
        {
            $$ = function(ctx) { return yy.parser.getDotProperty(ctx, $dot_name, 0); }
        }        
    | dot_name '(' ')'
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, $dot_name, undefined, true); }
        }        
    | dot_name '(' expression_list ')'
        {
            $$ = function(ctx) { return runMethod(yy.parser, ctx, $dot_name, $expression_list, true); }
        }
    | NUMBER
        { $$ = Number(yytext); }
    ;
