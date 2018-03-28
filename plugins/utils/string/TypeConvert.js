'use strict'

var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
var convert = function (s) {
    //var val = s.toLowerCase();
    if (s === '') {
        s = null;
    } else if (FLOAT.test(s)) {
        s = parseFloat(s);
    } else {
        var val = s.toLowerCase();
        if (val === 'false') {
            s = false;
        } else if (val === 'true') {
            s = true;
        }
    }

    return s;
};
export default convert;