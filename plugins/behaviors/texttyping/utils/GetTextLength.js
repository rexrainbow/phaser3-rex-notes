var GetTextLength = function (textObject, text) {
    var len;
    if (textObject.getPlainText) {
        len = textObject.getPlainText(text).length;
    } else {
        len = text.length;
    }

    return len;
}

export default GetTextLength;