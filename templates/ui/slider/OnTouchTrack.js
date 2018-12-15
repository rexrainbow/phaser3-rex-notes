import PositionToPercent from './PositionToPercent.js';

var OnTouchTrack = function (pointer, localX, localY) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }
    tmpPoint.x = pointer.worldX;
    tmpPoint.y = pointer.worldY;
    this.value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint);
}
var tmpPoint = {};

export default OnTouchTrack;