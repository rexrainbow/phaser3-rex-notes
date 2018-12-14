import GetThumbAlignPoint from './GetThumbAlignPoint.js';

const AlignLeft = Phaser.Display.Align.LEFT_CENTER;
const AlignTop = Phaser.Display.Align.TOP_CENTER;

var GetStartPoint = function (out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    if (this.childrenMap.thumb) {
        var align = (this.orientation === 0) ? AlignTop : AlignLeft;
        GetThumbAlignPoint.call(this, align, out);
    } else {
        if (this.orientation === 0) {
            out.x = this.centerX;
            out.y = this.top + 1; // Add 1 pixel margin
        } else {
            out.x = this.left + 1; // Add 1 pixel margin
            out.y = this.centerY;
        }
    }
    return out;
}

var tmpPoint = {};

export default GetStartPoint;