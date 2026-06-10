var FormatValue = function (value) {
    if (value === undefined) {
        return '';
    }

    if (typeof (value) === 'string') {
        return value;
    }

    return JSON.stringify(value);
}

export default FormatValue;
