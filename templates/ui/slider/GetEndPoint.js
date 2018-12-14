import GetThumbAlignPoint from './GetThumbAlignPoint.js';

const AlignRight = Phaser.Display.Align.RIGHT_CENTER;
const AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

var GetEndoint = function (out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    if (this.childrenMap.thumb) {
        var align = (this.orientation === 1) ? AlignRight : AlignBottom;
        GetThumbAlignPoint.call(this, align, out);
    } else {
        if (this.orientation === 0) {
            out.x = this.centerX;
            out.y = this.bottom - 1; // Add 1 pixel margin
        } else {
            out.x = this.right - 1; // Add 1 pixel margin
            out.y = this.centerY;
        }
    }
    return out;
}

var tmpPoint = {};

export default GetEndoint;