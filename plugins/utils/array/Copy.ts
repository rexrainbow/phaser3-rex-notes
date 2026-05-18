var Copy = function(dest?: any, src?: any, startIdx?: any, endIdx?: any) {
    if (startIdx === undefined) {
        startIdx = 0
    };
    if (endIdx === undefined) {
        endIdx = src.length;
    }
    dest.length = endIdx - startIdx;
    for (var i = 0, len = dest.length; i < len; i++) {
        dest[i] = src[i + startIdx];
    }
    return dest;
};
export default Copy;