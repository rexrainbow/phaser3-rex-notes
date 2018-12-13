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
            out.y = this.bottom;
            out.x = (this.left + this.right) / 2;
        } else {
            out.x = this.right;
            out.y = (this.top + this.bottom) / 2;
        }
    }
    return out;
}

var tmpPoint = {};

export default GetEndoint;