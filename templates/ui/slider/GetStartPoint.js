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
            out.y = this.top;
            out.x = (this.left + this.right) / 2;
        } else {
            out.x = this.left;
            out.y = (this.top + this.bottom) / 2;
        }
    }
    return out;
}

var tmpPoint = {};

export default GetStartPoint;