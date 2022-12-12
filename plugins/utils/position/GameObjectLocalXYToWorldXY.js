const RotateAround = Phaser.Math.RotateAround;

var GameObjectLocalXYToWorldXY = function (gameObject, localX, localY, out) {
    if (out === undefined) {
        out = {}
    } else if (out === true) {
        out = globOut;
    }

    out.x = localX - (gameObject.width * gameObject.originX);
    out.y = localY - (gameObject.height * gameObject.originY);
    // Scale
    out.x *= gameObject.scaleX;
    out.y *= gameObject.scaleY;
    // Rotate
    RotateAround(out, 0, 0, gameObject.rotation);
    // Transform
    out.x += gameObject.x;
    out.y += gameObject.y;

    return out;
}

var globOut = {};

export default GameObjectLocalXYToWorldXY