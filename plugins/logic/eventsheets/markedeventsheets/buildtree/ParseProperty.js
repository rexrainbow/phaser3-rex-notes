import TypeConvert from '../../../../utils/string/TypeConvert.js';

var ParseProperty = function (s, out) {
    var index = s.indexOf('=');
    if (index === -1) {
        out[s] = true;
    } else {
        var name = s.substring(0, index).trimRight();
        var expression = s.substring(index + 1);
        var value = TypeConvert(expression);

        // String post-processor
        // Replace '\n' (2 characters) by '\n' (newline character, 1 character)
        if (typeof (value) === 'string') {
            value = value.replace(/\\n/g, '\n')
        }

        out[name] = value;
    }

    return out;
}

export default ParseProperty;