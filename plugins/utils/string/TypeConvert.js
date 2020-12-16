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
        if (s === 'false') {
            s = false;
        } else if (s === 'true') {
            s = true;
        }
    }

    return s;
};
export default convert;