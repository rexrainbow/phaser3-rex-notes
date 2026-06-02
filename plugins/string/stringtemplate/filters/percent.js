var Percent = function (value, digits) {
    if (digits === undefined) {
        digits = 0;
    }
    return (Number(value) * 100).toFixed(digits) + '%';
}

export default Percent;
