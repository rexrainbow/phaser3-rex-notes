var TextWrapByCharCallback = function (text, textObject) {
    var context = textObject.context;
    var wrapWidth = textObject.style.wordWrapWidth;

    // Short string testing
    if (text.length <= 100) {
        var textWidth = context.measureText(text).width;
        if (textWidth <= wrapWidth) {
            return text;
        }
    }

    var tokenArray = text.split('');
    var token, tokenWidth;
    var lines = [];
    var line = [], remainderLineWidth = wrapWidth;
    for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = context.measureText(token).width;

        remainderLineWidth -= tokenWidth;
        if (remainderLineWidth < 0) {
            lines.push(line.join(''));
            line.length = 0;
            remainderLineWidth = wrapWidth - tokenWidth;
        }

        line.push(token);
    }

    if (line.length > 0) {
        lines.push(line.join(''));
    }

    return lines;
}

export default TextWrapByCharCallback;