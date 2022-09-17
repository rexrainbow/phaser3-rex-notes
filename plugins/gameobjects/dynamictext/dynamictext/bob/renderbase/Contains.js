import CanvasPositionToBobPosition from '../../methods/transform/CanvasPositionToBobPosition.js';

const Rectangle = Phaser.Geom.Rectangle;

var Contains = function (canvasX, canvasY) {
    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBounds(this).contains(bobPosition.x, bobPosition.y);
}

var GetBounds = function (bob) {
    if (globBounds === undefined) {
        globBounds = new Rectangle();
    }

    var x = bob.drawTLx,
        y = bob.drawTLy;
    globBounds.setTo(x, y, (bob.drawTRx - x), (bob.drawBLy - y));

    return globBounds;
}

var globBounds;

export default Contains;