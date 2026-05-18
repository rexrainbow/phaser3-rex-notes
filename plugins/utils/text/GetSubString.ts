var GetSubString = function(textObject?: any, text?: any, startIdx?: any, endIdx?: any) {
    var result;
    if (textObject.getSubString) {
        result = textObject.getSubString(text, startIdx, endIdx);
    } else {
        result = text.slice(startIdx, endIdx);
    }

    return result;
}

export default GetSubString;