var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
var HEX = /^0x[0-9A-F]+$/i;

var TypeConvert = function (s) {
    if (typeof (s) !== 'string') {
        return s;
    }

    if (s === '') {
        s = null;

    } else if (FLOAT.test(s)) {
        s = parseFloat(s);

    } else if (HEX.test(s)) {
        s = parseInt(s, 16);

    } else {
        switch (s) {
            case 'false': s = false; break;
            case 'true': s = true; break;
            case 'null': s = null; break;
            case 'undefined': s = undefined; break;
        }
    }

    return s;
};
export default TypeConvert;