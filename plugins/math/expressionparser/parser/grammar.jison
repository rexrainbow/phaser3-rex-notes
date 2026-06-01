/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b                                 return 'NUMBER'
\b0x[0-9A-Fa-f]+\b                                   return 'HEXNUMBER'
"*"                                                  return '*'
"/"                                                  return '/'
"-"                                                  return '-'
"+"                                                  return '+'
"^"                                                  return '^'
"%"                                                  return '%'
">="                                                 return ">="
"<="                                                 return "<="
">"                                                  return '>'
"<"                                                  return '<'
"=="                                                 return "=="
"!="                                                 return "!="
"||"                                                 return "||"
"&&"                                                 return "&&"
"?"                                                  return "?"
":"                                                  return ":"
"("                                                  return '('
")"                                                  return ')'
"["                                                  return '['
"]"                                                  return ']'
","                                                  return ','
"."                                                  return '.'
'true'                                               return 'true'
'false'                                              return 'false'
[^\s\*\/\-\+\^\%\>\=\<\!\|\&\?\:\(\)\[\]\,\.\"\']+   return 'NAME'
\"(\\.|[^\"\\])*\"|\'(\\.|[^\'\\])*\'                return 'QUOTED_STRING'
<<EOF>>                                              return 'EOF'
.                                                    return 'INVALID'

/lex

%{
    function runFn(arg, ctx) {
        return (typeof(arg) === 'function')? arg(ctx) : arg;
    }

    function mapArgs(args, ctx) {
        if (args) {
            args = args.map(function(arg){ return runFn(arg, ctx); });
        }
        return args;
    }

    function isHex(value) {
        return /^[0-9A-Fa-f]+$/.test(value);
    }

    function parseQuotedString(text) {
        var result = '';
        var end = text.length - 1;
        for (var i = 1; i < end; i++) {
            var char = text.charAt(i);
            if (char !== '\\') {
                result += char;
                continue;
            }

            i++;
            if (i >= end) {
                result += '\\';
                break;
            }

            var escaped = text.charAt(i);
            switch (escaped) {
                case 'n':
                    result += '\n';
                    break;
                case 'r':
                    result += '\r';
                    break;
                case 't':
                    result += '\t';
                    break;
                case 'b':
                    result += '\b';
                    break;
                case 'f':
                    result += '\f';
                    break;
                case 'v':
                    result += '\v';
                    break;
                case '0':
                    result += '\0';
                    break;
                case 'x':
                    var hex = text.substr(i + 1, 2);
                    if ((hex.length === 2) && isHex(hex)) {
                        result += String.fromCharCode(parseInt(hex, 16));
                        i += 2;
                    } else {
                        result += escaped;
                    }
                    break;
                case 'u':
                    if (text.charAt(i + 1) === '{') {
                        var closeIndex = text.indexOf('}', i + 2);
                        if ((closeIndex !== -1) && (closeIndex < end)) {
                            var codePoint = text.substring(i + 2, closeIndex);
                            if ((codePoint !== '') && isHex(codePoint)) {
                                var codePointValue = parseInt(codePoint, 16);
                                if (codePointValue <= 0x10ffff) {
                                    result += String.fromCodePoint(codePointValue);
                                    i = closeIndex;
                                    break;
                                }
                            }
                        }
                    }

                    var unicode = text.substr(i + 1, 4);
                    if ((unicode.length === 4) && isHex(unicode)) {
                        result += String.fromCharCode(parseInt(unicode, 16));
                        i += 4;
                    } else {
                        result += escaped;
                    }
                    break;
                default:
                    result += escaped;
                    break;
            }
        }

        return result;
    }

    function runBuildInMethod(self, ctx, name, args) {
        var callback = self[name];
        return callback.apply(self, mapArgs(args, ctx));
    }

    function getDefaultHandler(self, ctx) {
        var callback, scope;
        if (
            (ctx != null) &&
            ((typeof(ctx) === 'object') || (typeof(ctx) === 'function')) &&
            (
                self.safeMode ?
                Object.prototype.hasOwnProperty.call(ctx, 'defaultHandler') :
                ('defaultHandler' in ctx)
            )
        ) {
            callback = ctx.defaultHandler;
            if (callback != null) {
                scope = ctx;
            }
        }

        if (callback == null) {
            callback = self.defaultHandler;
            scope = self;
        }

        return {
            callback: callback,
            scope: scope
        };
    }

    function runMethod(self, ctx, name, args, dotMode) {
        var names;
        if (typeof(name) === 'string') {
            if (dotMode) {
                names = name.split('.');
            } else {
                names = [name];
            }
        } else {
            names = name;
        }

        var methodName = names.join('.');
        var methodArgs = mapArgs(args, ctx) || [];
        var callback, scope;
        if (names.length > 1) {
            var callbackName = names[names.length - 1];
            if (self.safeMode) {
                scope = self.getContextDotProperty(ctx, names.slice(0, -1));
            } else {
                scope = self.getDotProperty(ctx, names.slice(0, -1));
            }
            callback = self.getMethodProperty(scope, callbackName);
        } else {
            callback = self.getProperty(ctx, names[0]);
            scope = self;
        }

        if (callback == null) {
            callback = self.getFunction(methodName);
            scope = self;
        }

        if (callback == null) {
            var defaultHandler = getDefaultHandler(self, ctx);
            callback = defaultHandler.callback;
            scope = defaultHandler.scope;
            return callback.call(scope, methodName, methodArgs, ctx);
        }

        if (self.safeMode && (typeof(callback) !== 'function')) {
            throw new Error('Invalid method: ' + methodName);
        }

        return callback.apply(scope, methodArgs);
    }
%}

/* operator associations and precedence */

%left '?' ':'
%left '||'
%left '&&'
%left '>' '<' '==' '!=' '>=' '<='
%left '+' '-'
%left '*' '/' '%'
%left UMINUS
%right '^'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {
            var result = $1;
            if (typeof(result) === 'function') {
                return result;
            } else {
                return function(ctx) { return result; }
            }
        }
    ;

expression_list
    : expression_list ',' e
        { $$ = $1.concat([$3]); }
    | e
        { $$ = [$1]; }
    ;

dot_name
    : dot_name '.' NAME
        { $$ = $1.concat([$3]); }
    | dot_name '[' e ']'
        { $$ = $1.concat([$3]); }
    | NAME
        { $$ = [$1]; }
    ;

e
    : e '+' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_add', [$1, $3]); };
        }
    | e '-' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_subtract', [$1, $3]); };
        }
    | e '*' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_multiply', [$1, $3]); };
        }
    | e '/' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_divide', [$1, $3]); };
        }
    | e '%' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_mod', [$1, $3]); };
        }        
    | e '^' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_pow', [$1, $3]); };
        }
    | e '>' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$1, $3]) == true; };
        }
    | e '<' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$1, $3]) == true; };
        }
    | e '==' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$1, $3]) == true; };
        }
    | e '!=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$1, $3]) == false; };
        }
    | e '>=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$1, $3]) == false; };
        }
    | e '<=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$1, $3]) == false; };
        }
    | e '||' e
        {
            $$ = function(ctx) {
                var left = runFn($1, ctx);
                if (left) {
                    return true;
                }
                return runBuildInMethod(yy.parser, ctx, '_or', [left, $3]) == true;
            };
        }
    | e '&&' e
        {
            $$ = function(ctx) {
                var left = runFn($1, ctx);
                if (!left) {
                    return false;
                }
                return runBuildInMethod(yy.parser, ctx, '_and', [left, $3]) == true;
            };
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
            $$ = function(ctx) {
                return yy.parser.getDotProperty(ctx, mapArgs($1, ctx), 0); 
            }
        }        
    | dot_name '(' ')'
        {
            $$ = function(ctx) { 
                return runMethod(yy.parser, ctx, mapArgs($1, ctx), undefined, true); 
            }
        }
    | dot_name '(' expression_list ')'
        {
            $$ = function(ctx) { 
                return runMethod(yy.parser, ctx, mapArgs($1, ctx), $3, true); 
            }
        }
    | QUOTED_STRING
        { $$ = parseQuotedString(yytext); }
    | NUMBER
        { $$ = Number(yytext); }
    | HEXNUMBER
        { $$ = parseInt(yytext, 16); }
    ;
