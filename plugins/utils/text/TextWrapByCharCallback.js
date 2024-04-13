import IsASCIIString from '../string/IsASCIIString.js';

var TextWrapByCharCallback = function (text, textObject) {
    var output = [];

    var textLines = text.split('\n');
    var style = textObject.style;
    var wrapWidth = style.wordWrapWidth;
    var wrapMode = (style.hasOwnProperty('wrapMode')) ? style.wrapMode : 3;
    var context = textObject.context;
    for (var i = 0, cnt = textLines.length; i < cnt; i++) {
        WrapLine(context, textLines[i], wrapWidth, wrapMode, output);
    }

    return output;
}

var GetTokenArray = function (text, wrapMode) {
    var tokenArray;

    if (wrapMode === 2) {  // CHAR_WRAP
        tokenArray = text.split('');
    } else {  // MIX_WRAP
        tokenArray = [];
        var words = text.split(' '), word;
        for (var i = 0, wordCount = words.length; i < wordCount; i++) {
            word = words[i];

            if (i < (wordCount - 1)) {
                if (IsASCIIString(word)) {
                    tokenArray.push(word + ' ');
                } else {
                    tokenArray.push(...word.split(''));
                    // Add space as last token
                    tokenArray.push(' ');
                }

            } else {  // The last word
                if (word !== '') {
                    if (IsASCIIString(word)) {
                        tokenArray.push(word);
                    } else {
                        tokenArray.push(...word.split(''));
                    }
                }

            }

        }
    }

    return tokenArray;
}

var WrapLine = function (context, text, wrapWidth, wrapMode, output) {
    if (text.length <= 100) {
        var textWidth = context.measureText(text).width;
        if (textWidth <= wrapWidth) {
            output.push(text);
            return output;
        }
    }

    var tokenArray = GetTokenArray(text, wrapMode);

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