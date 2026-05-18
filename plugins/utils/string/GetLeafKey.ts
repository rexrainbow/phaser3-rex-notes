var GetLeafKey = function(key?: any, delimiter = '.') {
    var lastDotIndex = key.lastIndexOf(delimiter);
    var leafKey = (lastDotIndex === -1) ? key : key.slice(lastDotIndex + 1);
    return leafKey;
}

export default GetLeafKey;