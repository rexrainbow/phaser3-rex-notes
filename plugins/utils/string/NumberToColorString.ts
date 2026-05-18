var NumberToColorString = function(value?: any) {
    if (typeof (value) === 'number') {
        value = `#${value.toString(16)}`;
    }
    return value;
}

export default NumberToColorString;