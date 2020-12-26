var ParseValue = function (text, valueConverter) {
    if (text.indexOf(',') !== -1) {
        var values = text.split(',');
        for (var i = 0, cnt = values.length; i < cnt; i++) {
            values[i] = valueConverter(values[i]);
        }
        return values;
    } else {
        return valueConverter(text);
    }
}

export default ParseValue;