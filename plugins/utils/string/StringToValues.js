import DefaultValueConverter from './TypeConvert.js';

var StringToValues = function (text, valueConverter) {
    if (text == null) {
        return [];
    }
    if (valueConverter === undefined) {
        valueConverter = DefaultValueConverter;
    }

    var values = text.split(',');
    for (var i = 0, cnt = values.length; i < cnt; i++) {
        values[i] = valueConverter(values[i]);
    }
    return values;
}

export default StringToValues;