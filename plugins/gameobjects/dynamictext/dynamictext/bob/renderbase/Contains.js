import CanvasPositionToBobPosition from '../../methods/utils/transform/CanvasPositionToBobPosition.js';

const Rectangle = Phaser.Geom.Rectangle;

var Contains = function (canvasX, canvasY) {
    if ((this.width === 0) || (this.height === 0)) {
        return false;
    }

    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
}

var GetBobBounds = function (bob) {
    if (bobBounds === undefined) {
        bobBounds = new Rectangle();
    }

    var x = bob.drawTLX,
        y = bob.drawTLY;
    bobBounds.setTo(x, y, (bob.drawTRX - x), (bob.drawBLY - y));

    return bobBounds;
}

var bobBounds;

export default Contains;