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
"very"                return "very"
"fairly"              return "fairly"
"OR"                  return "or"
"AND"                 return "and"
"VERY"                return "very"
"FAIRLY"              return "fairly"
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
%left 'fairly'
%left 'very'
%left 'and'
%left 'or'
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
    | 'fairly' ruleExp
        {
            $$ = ['fairly', $1];
        }        
    | 'very' ruleExp
        {
            $$ = ['very', $1];
        }
    | ruleExp 'and' ruleExp
        {
            $$ = ['and'];
            if (Array.isArray($1) && ($1[0] === 'and')) {
                for(var i=1, cnt=$1.length; i<cnt; i++) {
                    $$.push($1[i]);
                }
            } else {
                $$.push($1);
            }
            if (Array.isArray($3) && ($3[0] === 'and')) {
                for(var i=1, cnt=$3.length; i<cnt; i++) {
                    $$.push($3[i]);
                }
            } else {
                $$.push($3);
            }
        }
    | ruleExp 'or' ruleExp
        {
            $$ = ['or'];
            if (Array.isArray($1) && ($1[0] === 'or')) {
                for(var i=1, cnt=$1.length; i<cnt; i++) {
                    $$.push($1[i]);
                }
            } else {
                $$.push($1);
            }
            if (Array.isArray($3) && ($3[0] === 'or')) {
                for(var i=1, cnt=$3.length; i<cnt; i++) {
                    $$.push($3[i]);
                }
            } else {
                $$.push($3);
            }
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
