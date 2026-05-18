var Split = function(s?: any, delimiter?: any) {
    var regexString = `(?<!\\\\)\\${delimiter}`;
    var escapeString = `\\${delimiter}`;
    return s.split(new RegExp(regexString, 'g')).map(function(s?: any) {
        return s.replace(escapeString, delimiter);
    })
}

export default Split;