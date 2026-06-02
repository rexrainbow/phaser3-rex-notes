var DefaultValue = function (value, fallback) {
    return ((value === undefined) || (value === null) || (value === '')) ? fallback : value;
}

export default DefaultValue;
