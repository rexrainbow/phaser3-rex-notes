const RotateAround = Phaser.Math.RotateAround;

var LocalXYToWorldXY = function (gameObject, localX, localY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobalXY;
    }

    var ox = gameObject.displayOriginX;
    var oy = gameObject.displayOriginY;

    out.x = localX - ox;
    out.y = localY - oy;
    RotateAround(out, 0, 0, gameObject.rotation);
    out.x *= gameObject.scaleX;
    out.y *= gameObject.scaleY;
    out.x += gameObject.x;
    out.y += gameObject.y;

    return out;
}

var WorldXYToLocalXY = function (gameObject, worldX, worldY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = GlobalXY;
    }

    var ox = gameObject.displayOriginX;
    var oy = gameObject.displayOriginY;

    out.x = worldX - gameObject.x;
    out.y = worldY - gameObject.y;
    out.x /= gameObject.scaleX;
    out.y /= gameObject.scaleY;
    RotateAround(out, 0, 0, -gameObject.rotation);
    out.x += ox;
    out.y += oy;

    return out;
}

var GlobalXY = {};

export {
    LocalXYToWorldXY, WorldXYToLocalXY
}