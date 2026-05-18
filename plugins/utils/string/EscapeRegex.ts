// https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

var EscapeRegex = function(s?: any) {
    return s
        .replace(re0, '\\$&')
        .replace(re1, '\\x2d');
}

var re0 = /[|\\{}()[\]^$+*?.]/g;
var re1 = /-/g;

export default EscapeRegex;