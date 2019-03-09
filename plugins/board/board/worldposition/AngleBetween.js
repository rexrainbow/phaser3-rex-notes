import GetAngle from '../../../utils/math/angle/Between.js';

var AngleBetween = function (tileA, tileB) {
    var x0 = this.tileXYToWorldX(tileA.x, tileA.y);
    var y0 = this.tileXYToWorldY(tileA.x, tileA.y);
    var x1 = this.tileXYToWorldX(tileB.x, tileB.y);
    var y1 = this.tileXYToWorldY(tileB.x, tileB.y);
    return GetAngle(x0, y0, x1, y1); // -PI~PI
}

export default AngleBetween;