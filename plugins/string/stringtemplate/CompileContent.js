var FindExpressionEnd = function (content, startIndex, delimiterRight) {
    var quoteChar;
    var delimiterRightLength = delimiterRight.length;

    for (var i = startIndex; i < content.length; i++) {
        var char = content.charAt(i);

        if (quoteChar) {
            if (char === '\\') {
                i++;
            } else if (char === quoteChar) {
                quoteChar = undefined;
            }
            continue;
        }

        if ((char === '"') || (char === '\'')) {
            quoteChar = char;
            continue;
        }

        if (content.substr(i, delimiterRightLength) === delimiterRight) {
            return i;
        }
    }

    return -1;
}

var CompileContent = function (
    content,
    delimiterLeft,
    delimiterRight,
    expressionParser,
    expressionCompileConfig,
    expressionTransform
) {
    var result = [];
    var charIdx = 0;
    var delimiterLeftLength = delimiterLeft.length;
    var delimiterRightLength = delimiterRight.length;

    while (charIdx < content.length) {
        var matchStart = content.indexOf(delimiterLeft, charIdx);
        if (matchStart === -1) {
            break;
        }

        if ((matchStart > charIdx) && (content.charAt(matchStart - 1) === '\\')) {
            result.push(content.substring(charIdx, matchStart - 1));
            result.push(delimiterLeft);
            charIdx = matchStart + delimiterLeftLength;
            continue;
        }

        var expressionStart = matchStart + delimiterLeftLength;
        var matchEnd = FindExpressionEnd(content, expressionStart, delimiterRight);
        if (matchEnd === -1) {
            break;
        }

        if (charIdx < matchStart) {
            result.push(content.substring(charIdx, matchStart));
        }

        var expression = content.substring(expressionStart, matchEnd);
        if (expressionTransform) {
            expression = expressionTransform(expression);
        }
        result.push(expressionParser.compile(expression, expressionCompileConfig));

        charIdx = matchEnd + delimiterRightLength;
    }

    if (charIdx < content.length) {
        result.push(content.substring(charIdx));
    }

    return result;
}

export default CompileContent;
