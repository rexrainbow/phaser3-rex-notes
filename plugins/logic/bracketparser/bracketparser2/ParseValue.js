var ParseValue = function (text, valueConverter) {
    if (text == null) {
        return null;
    }

    var firstChar = text.charAt(0);
    var lastChar = text.charAt(text.length - 1);
    if ((firstChar === '"') && (lastChar === '"')) {
        return text.substring(1, text.length - 1);
    } else if ((firstChar === '"') && (lastChar === '"')) {
        return text.substring(1, text.length - 1);
    } else if ((firstChar === '[') && (lastChar === ']')) {
        return JSON.parse(text)
    } else if ((firstChar === '{') && (lastChar === '}')) {
        return JSON.parse(text)
    }

    return valueConverter(text);
}

export default ParseValue;