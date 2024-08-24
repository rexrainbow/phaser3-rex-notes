var GetString = function (value) {
    if (value == null) {
        value = '';
    } else if (Array.isArray(value)) {
        value = value.join('\n');
    } else if (typeof (value) === 'number') {
        value = value.toString();
    }
    return value;
}

export default GetString;