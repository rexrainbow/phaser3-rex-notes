var Round = function (value, digits) {
    value = Number(value);
    if (digits === undefined) {
        return Math.round(value);
    }

    var scale = Math.pow(10, digits);
    return Math.round(value * scale) / scale;
}

export default Round;
