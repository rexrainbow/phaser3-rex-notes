var Split = function (s, delimiter) {
    var regexString = `(?<!\\\\)\\${delimiter}`;
    var escapeString = `\\${delimiter}`;
    return s.split(new RegExp(regexString, 'g')).map(function (s) {
        return s.replace(escapeString, delimiter);
    })
}

export default Split;