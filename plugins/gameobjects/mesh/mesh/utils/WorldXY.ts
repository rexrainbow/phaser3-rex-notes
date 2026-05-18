import { Math as PhaserMath } from 'phaser';
const RotateAround = PhaserMath.RotateAround;

var LocalXYToWorldXY = function(gameObject?: any, localX?: any, localY?: any, out?: any) {
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

var WorldXYToLocalXY = function(gameObject?: any, worldX?: any, worldY?: any, out?: any) {
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