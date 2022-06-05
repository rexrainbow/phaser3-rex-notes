var Skew = function (gameObject, xRad, yRad) {
    if (xRad === undefined) {
        xRad = 0;
    }
    if (yRad === undefined) {
        yRad = 0;
    }

    var width = gameObject.width,
        height = gameObject.height;
    var ox = width * 0.5;
    var oy = height * 0.5;
    var xOffset = Math.tan(xRad) * oy;
    var yOffset = Math.tan(yRad) * ox;
    var controlPoints = gameObject.controlPoints;
    for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
        var controlPoint = controlPoints[i];
        var x = controlPoint.localXOrigin;
        var y = controlPoint.localYOrigin;
        controlPoint.localX = x + ((y > oy) ? xOffset : -xOffset);
        controlPoint.localY = y + ((x > ox) ? yOffset : -yOffset);
    }
}

export default Skew;