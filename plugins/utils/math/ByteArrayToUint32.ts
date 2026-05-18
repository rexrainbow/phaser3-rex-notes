var ByteArrayToUint32 = function(a?: any, b?: any, c?: any, d?: any, bigEndian?: any) {
    if (bigEndian === undefined) {
        bigEndian = false;
    }
    var value;
    if (bigEndian?: any) {
        value = (a << 24) | (b << 16) | (c << 8) | d;
    } else {
        value = a | (b << 8) | (c << 16) | (d << 24);
    }

    return value;
}
export default ByteArrayToUint32;