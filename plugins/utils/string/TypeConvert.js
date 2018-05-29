'use strict'

var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
var convert = function (s) {
    if (typeof (s) !== 'string') {
        return s;
    }

    if (s === '') {
        s = null;
    } else if (FLOAT.test(s)) {
        s = parseFloat(s);
    } else {        
        if (val === 'false') {
            s = false;
        } else if (val === 'true') {
            s = true;
        }
    }

    return s;
};
export default convert;