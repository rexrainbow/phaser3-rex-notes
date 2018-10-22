var IsRectangle = function (roundRectangle) {
    var radius = roundRectangle.cornerRadius;

    return (radius.tl === 0) &&
        (radius.tr === 0) &&
        (radius.bl === 0) &&
        (radius.br === 0);
}

export default IsRectangle;