import { Math as PhaserMath } from 'phaser';
const Percent = PhaserMath.Percent;

var PositionToPercent = function(startPoint?: any, endPoint?: any, currentPoint?: any) {
    var value;
    if (startPoint.y === endPoint.y) {
        value = Percent(currentPoint.x, startPoint.x, endPoint.x);
    } else if (startPoint.x === endPoint.x) {
        value = Percent(currentPoint.y, startPoint.y, endPoint.y);
    }
    return value
}

export default PositionToPercent;