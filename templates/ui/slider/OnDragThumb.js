import PositionToPercent from './PositionToPercent.js';

var OnDragThumb = function (pointer, dragX, dragY) {
    if (!this.enable) {
        return;
    }
    tmpPoint.x = dragX;
    tmpPoint.y = dragY;
    this.value = PositionToPercent(this.getStartPoint(), this.getEndPoint(), tmpPoint);
}
var tmpPoint = {};

export default OnDragThumb;