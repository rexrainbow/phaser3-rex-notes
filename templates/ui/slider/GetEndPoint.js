import GetThumbAlignPoint from './GetThumbAlignPoint.js';

const AlignRight = Phaser.Display.Align.RIGHT_CENTER;
const AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

var GetEndoint = function (out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    var align = (this.orientation === 1) ? AlignRight : AlignBottom;
    return GetThumbAlignPoint.call(this, align, out);
}

var tmpPoint = {};

export default GetEndoint;