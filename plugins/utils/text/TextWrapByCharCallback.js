var TextWrapByCharCallback = function (text, textObject) {
    var output = [];

    var textLines = text.split('\n');
    var context = textObject.context;
    var wrapWidth = textObject.style.wordWrapWidth;
    for (var i = 0, cnt = textLines.length; i < cnt; i++) {
        WrapLine(context, textLines[i], wrapWidth, output);
    }

    return output;
}

var WrapLine = function (context, text, wrapWidth, output) {
    if (text.length <= 100) {
        var textWidth = context.measureText(text).width;
        if (textWidth <= wrapWidth) {
            output.push(text);
            return output;
        }
    }

    var tokenArray = text.split('');
    var token, tokenWidth;
    var line = [], remainderLineWidth = wrapWidth;
    for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
        token = tokenArray[j];
        tokenWidth = context.measureText(token).width;

        remainderLineWidth -= tokenWidth;
        if (remainderLineWidth < 0) {
            output.push(line.join(''));
            line.length = 0;
            remainderLineWidth = wrapWidth - tokenWidth;
        }

        line.push(token);
    }

    if (line.length > 0) {
        output.push(line.join(''));
    }

    return output;
}

export default TextWrapByCharCallback;