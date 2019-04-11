import PercentToPosition from './PercentToPosition.js';

var UpdateThumb = function (t) {
    var thumb = this.childrenMap.thumb;
    if (thumb === undefined) {
        return this;
    }

    if (t === undefined) {
        t = this.value;
    }
    PercentToPosition(t, this.getStartPoint(), this.getEndPoint(), thumb);
    this.resetChildPositionState(thumb);
    return this;
}

export default UpdateThumb;