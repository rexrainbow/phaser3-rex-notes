var IsASCIIString = function (s) {
    return /^[\x00-\x7F]+$/.test(s);
}

export default IsASCIIString;