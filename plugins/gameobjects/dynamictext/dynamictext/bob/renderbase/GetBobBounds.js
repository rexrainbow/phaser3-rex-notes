const Rectangle = Phaser.Geom.Rectangle;

var GetBobBounds = function (bob, out) {
    if (out === undefined) {
        if (globBounds === undefined) {
            globBounds = new Rectangle();
        }
        out = globBounds;
    }

    var x = bob.drawTLX,
        y = bob.drawTLY;
    out.setTo(x, y, (bob.drawTRX - x), (bob.drawBLY - y));

    return out;
}

var globBounds;

export default GetBobBounds;