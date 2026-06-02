var Currency = function (value, currency, locale) {
    if (currency === undefined) {
        currency = 'USD';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(Number(value));
}

export default Currency;
