var StringToNumber = function (value) {
    if (typeof (value) !== 'string') {
        return value;
    }

    var text = value.trim();
    if (text === '') {
        return value;
    }

    var numberValue = Number(text);
    return Number.isFinite(numberValue) ? numberValue : value;
}

export default StringToNumber;