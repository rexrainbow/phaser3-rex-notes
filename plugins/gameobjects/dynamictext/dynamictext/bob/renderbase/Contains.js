import CanvasPositionToBobPosition from '../../methods/utils/transform/CanvasPositionToBobPosition.js';

var Contains = function (canvasX, canvasY) {
    if ((this.width === 0) || (this.height === 0)) {
        return false;
    }

    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
}

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

export default Contains;