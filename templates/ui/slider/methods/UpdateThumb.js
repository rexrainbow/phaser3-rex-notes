import PercentToPosition from './PercentToPosition.js';

var UpdateThumb = function (t) {
    var thumb = this.childrenMap.thumb;
    if (thumb === undefined) {
        return this;
    }

    if (t === undefined) {
        t = this.value;
    }

    var startPoint, endPoint;
    if (!this.reverseAxis) {
        startPoint = this.getStartPoint();
        endPoint = this.getEndPoint();
    } else {
        startPoint = this.getEndPoint();
        endPoint = this.getStartPoint();
    }
    PercentToPosition(t, startPoint, endPoint, thumb);
    thumb.x += this.thumbOffsetX;
    thumb.y += this.thumbOffsetY;
    this.resetChildPositionState(thumb);
    return this;
}

export default UpdateThumb;