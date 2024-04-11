var GetPlainText = function (textObject, text) {
    if (textObject.getPlainText) {
        text = textObject.getPlainText(text);
    }

    return text;
}

export default GetPlainText;