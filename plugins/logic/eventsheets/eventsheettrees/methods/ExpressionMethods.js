import Compile from '../../../../math/expressionparser/utils/Complile.js';
import handlebars from 'handlebars';

// Number eval : `#(...)`, or `num()`
// String template : `_(...)`, or `str(...)`

var WrapToStringTemplate = function (s) {
    return `_(${s})`
}


var CreateEvalCallback = function (s) {
    if (s.startsWith('#(') && s.endsWith(')')) {
        return Compile(s.substring(2, s.length - 1));
    }
    if (s.startsWith('_(') && s.endsWith(')')) {
        return handlebars.compile(s.substring(2, s.length - 1));
    }

    if (s.startsWith('num(') && s.endsWith(')')) {
        return Compile(s.substring(4, s.length - 1));
    }
    if (s.startsWith('str(') && s.endsWith(')')) {
        return handlebars.compile(s.substring(4, s.length - 1));
    }
}

export {
    WrapToStringTemplate,
    CreateEvalCallback,
}