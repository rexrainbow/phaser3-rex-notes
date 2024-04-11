var GetSubString = function (textObject, text, startIdx, endIdx) {
    var result;
    if (textObject.getSubString) {
        result = textObject.getSubString(text, startIdx, endIdx);
    } else {
        result = text.slice(startIdx, endIdx);
    }

    return result;
}

export default GetSubString;