import ResizeGameObject from '../../../plugins/utils/size/ResizeGameObject.js';
import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

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
        if (this.orientation === 0) { // x, extend width
            var thumbWidth = GetDisplayWidth(thumb);
            var thumbRight = (thumb.x - (thumbWidth * thumb.originX)) + thumbWidth;
            newWidth = thumbRight - this.left;
        } else { // y, extend height
            var thumbHeight = GetDisplayHeight(thumb);
            var thumbBottom = (thumb.y - (thumbHeight * thumb.originY)) + thumbHeight;
            newHeight = thumbBottom - this.top;
        }
    } else {
        if (this.orientation === 0) { // x, extend width
            newWidth = this.width * t;
        } else { // y, extend eight
            newHeight = this.height * t;
        }
    }
    ResizeGameObject(indicator, newWidth, newHeight);
    var align = (this.orientation === 0) ? AlignLeft : AlignTop;
    AlignIn(indicator, this, align);
    this.resetChildPositionState(indicator);
}

export default UpdateIndicator;