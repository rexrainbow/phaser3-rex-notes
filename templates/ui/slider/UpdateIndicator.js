import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';

const AlignLeft = Phaser.Display.Align.LEFT_CENTER;
const AlignTop = Phaser.Display.Align.TOP_CENTER;

var UpdateIndicator = function (t) {
    var indicator = this.childrenMap.indicator;
    if (indicator === undefined) {
        return this;
    }

    if (t === undefined) {
        t = this.value;
    }

    var newWidth, newHeight;
    var thumb = this.childrenMap.thumb;
    if (thumb) {
        if (this.orientation === 0) { // x, extend height
            var thumbBottom = (thumb.y - (thumb.displayHeight * thumb.originY)) + thumb.displayHeight;
            newHeight = thumbBottom - this.top;
        } else { // y, extend width
            var thumbRight = (thumb.x - (thumb.displayWidth * thumb.originX)) + thumb.displayWidth;
            newWidth = thumbRight - this.left;
        }
    } else {
        if (this.orientation === 0) { // x, extend height
            newHeight = this.height * t;
        } else { // y, extend width
            newWidth = this.width * t;
        }
    }
    ResizeGameObject(indicator, newWidth, newHeight);
    var align = (this.orientation === 1) ? AlignLeft : AlignTop;
    AlignIn(indicator, this, align);
    this.resetChildPositionState(indicator);
}

export default UpdateIndicator;