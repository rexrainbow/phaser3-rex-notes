import PositionToPercent from '../PositionToPercent.js';

var GetValueByPosition = function (x, y) {
    tmpPoint.x = x;
    tmpPoint.y = y;
    var startPoint, endPoint;
    if (!this.reverseAxis) {
        startPoint = this.getStartPoint();
        endPoint = this.getEndPoint();
    } else {
        startPoint = this.getEndPoint();
        endPoint = this.getStartPoint();
    }
    var value = PositionToPercent(startPoint, endPoint, tmpPoint);
    return value;
}
var tmpPoint = {};

export default GetValueByPosition;