const RotateAround = Phaser.Math.RotateAround;
const Rectangle = Phaser.Geom.Rectangle;


var Contains = function (x, y) {
    if (globPoint === undefined) {
        globPoint = {};
    }
    globPoint.x = x - this.drawX;
    globPoint.y = y - this.drawY;
    RotateAround(globPoint, 0, 0, -this.rotation);

    return GetBounds(this).contains(globPoint.x, globPoint.y);
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

var globPoint;
var globBounds;

export default Contains;