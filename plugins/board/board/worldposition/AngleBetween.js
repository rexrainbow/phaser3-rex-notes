import GetAngle from '../../../utils/math/angle/Between.js';

var AngleBetween = function (tileXY0, tileXY1) {
    var x0 = this.tileXYToWorldX(tileXY0.x, tileXY0.y);
    var y0 = this.tileXYToWorldY(tileXY0.x, tileXY0.y);
    var x1 = this.tileXYToWorldX(tileXY1.x, tileXY1.y);
    var y1 = this.tileXYToWorldY(tileXY1.x, tileXY1.y);
    return GetAngle(x0, y0, x1, y1);
}

export default AngleBetween;