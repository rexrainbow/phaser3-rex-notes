const Percent = Phaser.Math.Percent;

var PositionToPercent = function (startPoint, endPoint, currentPoint) {
    var min, max, value;
    if (startPoint.y === endPoint.y) {
        min = Math.min(startPoint.x, endPoint.x);
        max = Math.max(startPoint.x, endPoint.x);
        value = Percent(currentPoint.x, min, max);
    } else if (startPoint.x === endPoint.x) {
        min = Math.min(startPoint.y, endPoint.y);
        max = Math.max(startPoint.y, endPoint.y);
        value = Percent(currentPoint.y, min, max);
    }
    return value
}

export default PositionToPercent;