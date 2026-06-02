var SplitTopLevelPipe = function (expression) {
    var parts = [];
    var startIndex = 0;
    var quoteChar;
    var parenDepth = 0;
    var bracketDepth = 0;

    for (var i = 0; i < expression.length; i++) {
        var char = expression.charAt(i);

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

        switch (char) {
            case '(':
                parenDepth++;
                break;
            case ')':
                parenDepth--;
                break;
            case '[':
                bracketDepth++;
                break;
            case ']':
                bracketDepth--;
                break;
            case '|':
                if (
                    (parenDepth === 0) &&
                    (bracketDepth === 0) &&
                    (expression.charAt(i - 1) !== '|') &&
                    (expression.charAt(i + 1) !== '|')
                ) {
                    parts.push(expression.substring(startIndex, i).trim());
                    startIndex = i + 1;
                }
                break;
        }
    }

    parts.push(expression.substring(startIndex).trim());

    return parts;
}

var ParseFilter = function (filter) {
    var parenIndex = filter.indexOf('(');
    if (parenIndex === -1) {
        return {
            name: filter.trim(),
            args: ''
        };
    }

    return {
        name: filter.substring(0, parenIndex).trim(),
        args: filter.substring(parenIndex + 1, filter.lastIndexOf(')')).trim()
    };
}

var TransformExpression = function (expression) {
    var parts = SplitTopLevelPipe(expression);
    if (parts.length === 1) {
        return expression;
    }

    var result = parts[0];
    for (var i = 1; i < parts.length; i++) {
        var filter = ParseFilter(parts[i]);
        if (filter.args === '') {
            result = `${filter.name}(${result})`;
        } else {
            result = `${filter.name}(${result}, ${filter.args})`;
        }
    }

    return result;
}

export default TransformExpression;
