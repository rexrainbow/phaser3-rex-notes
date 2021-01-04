import AlignIn from '../../../plugins/utils/align/align/in/QuickSet.js';
import GlobZone from '../../../plugins/utils/actions/GlobZone.js';

var GetThumbAlignPoint = function (align, out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    var thumb = this.childrenMap.thumb;
    var currentX = thumb.x;
    var currentY = thumb.y;

    GlobZone.setPosition(this.innerLeft, this.innerTop).setSize(this.innerWidth, this.innerHeight);
    AlignIn(thumb, GlobZone, align);
    out.x = thumb.x;
    out.y = thumb.y;

    thumb.x = currentX;
    thumb.y = currentY;

    return out;
}

var tmpPoint = {};

export default GetThumbAlignPoint;