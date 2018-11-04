import GetThumbAlignPoint from './GetThumbAlignPoint.js';

const AlignLeft = Phaser.Display.Align.LEFT_CENTER;
const AlignTop = Phaser.Display.Align.TOP_CENTER;

var GetStartPoint = function (out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    var align = (this.orientation === 1) ? AlignLeft : AlignTop;
    return GetThumbAlignPoint.call(this, align, out);
}

var tmpPoint = {};

export default GetStartPoint;