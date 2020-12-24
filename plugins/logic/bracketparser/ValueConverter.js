import TypeConvert from '../../utils/string/TypeConvert.js';

var ValueConverter = function (value) {
    if (value.indexOf(',')) {
        var values = value.split(',');
        for (var i = 0, cnt = values.length; i < cnt; i++) {
            values[i] = TypeConvert(values[i]);
        }
        return values;
    } else {
        return TypeConvert(value);
    }
}

export default ValueConverter;