var IsCircle = function (roundRectangle) {
    var width = roundRectangle.width;
    var height = roundRectangle.height;
    var radius = roundRectangle.cornerRadius;

    if (width !== height) {
        return false;
    }

    // width === height    
    var halfWidth = width / 2;
    return (radius.tl === halfWidth) &&
        (radius.tr === halfWidth) &&
        (radius.bl === halfWidth) &&
        (radius.br === halfWidth);
}

export default IsCircle;