var NumberFormat = function (value, locale) {
    return new Intl.NumberFormat(locale).format(Number(value));
}

export default NumberFormat;
