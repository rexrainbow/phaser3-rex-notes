import DefaultValueConverter from './TypeConvert.js';

var StringToValues = function (text, valueConverter, delimiter) {
    if (text == null) {
        return [];
    }
    if (valueConverter === undefined) {
        valueConverter = DefaultValueConverter;
    }
    if (delimiter === undefined) {
        delimiter = ',';
    }

    var values = text.split(delimiter);
    for (var i = 0, cnt = values.length; i < cnt; i++) {
        values[i] = valueConverter(values[i]);
    }
    return values;
}

export default StringToValues;