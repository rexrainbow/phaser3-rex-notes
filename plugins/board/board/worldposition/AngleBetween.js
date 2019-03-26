import GetAngle from '../../../utils/math/angle/Between.js';

var AngleBetween = function (tileA, tileB) {
    var out = this.tileXYToWorldX(tileA.x, tileA.y, true);
    var x0 = out.x;
    var y0 = out.y;
    out = this.tileXYToWorldX(tileB.x, tileB.y, true);
    var x1 = out.x;
    var y1 = out.y;
    return GetAngle(x0, y0, x1, y1); // -PI~PI
}

export default AngleBetween;