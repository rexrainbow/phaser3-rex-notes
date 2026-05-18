var RE_ASCII = /^[\x00-\x7F]+$/;
var IsASCIIString = function(s?: any) {
    return RE_ASCII.test(s);
}

export default IsASCIIString;