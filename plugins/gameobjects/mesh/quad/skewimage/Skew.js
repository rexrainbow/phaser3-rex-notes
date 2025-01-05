var Skew = function (gameObject, skewX, skewY) {
    if (skewX === undefined) {
        skewX = 0;
    }
    if (skewY === undefined) {
        skewY = 0;
    }

    var ox = gameObject.displayOriginX;
    var oy = gameObject.displayOriginY;
    var xOffset = Math.tan(skewX) * oy;
    var yOffset = Math.tan(skewY) * ox;
    var vertices = gameObject.vertices;
    for (var i = 0, cnt = vertices.length; i < cnt; i++) {
        var vertex = vertices[i];
        var frameX = vertex.frameX;
        var frameY = vertex.frameY;

        if (frameY > oy) {
            vertex.localX = frameX + xOffset;
        } else if (frameY < oy) {
            vertex.localX = frameX - xOffset;
        }

        if (frameX > ox) {
            vertex.localY = frameY + yOffset;
        } else if (frameX < ox) {
            vertex.localY = frameY - yOffset;
        }
    }
}

export default Skew;