import {
    ElementProperties,
    StyleProperties,
} from './InputTextProperties.js';

var CopyElementConfig = function (from) {
    if (from === undefined) {
        from = {};
    }
    var to = {};

    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);

    return to;
}

var CopyProperty = function (from, to, key) {
    if (typeof (key) === 'string') {
        if (from.hasOwnProperty(key)) {
            to[key] = from[key];
        }
    } else if (Array.isArray(key)) {
        for (var i = 0, cnt = key.length; i < cnt; i++) {
            CopyProperty(from, to, key[i]);
        }
    } else {
        var keys = key;
        for (var key in keys) {
            CopyProperty(from, to, key);
        }
    }
}


export default CopyElementConfig;