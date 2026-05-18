var GetPlainText = function(textObject?: any, text?: any) {
    if (textObject.getPlainText) {
        text = textObject.getPlainText(text);
    }

    return text;
}

export default GetPlainText;