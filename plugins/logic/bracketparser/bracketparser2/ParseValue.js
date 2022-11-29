var ParseValue = function (text, valueConverter) {
    if (text == null) {
        return null;
    }

    var firstChar = text.charAt(0);
    if ((firstChar === '"') || (firstChar === "'")) {
        return text.substring(1, text.length - 1);
    }

    return valueConverter(text);
}

export default ParseValue;