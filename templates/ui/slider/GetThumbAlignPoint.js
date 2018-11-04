const AlignIn = Phaser.Display.Align.In.QuickSet;

var GetThumbAlignPoint = function (align, out) {
    if (out === undefined) {
        out = tmpPoint;
    }
    var thumb = this.childrenMap.thumb;
    var currentX = thumb.x;
    var currentY = thumb.y;

    AlignIn(thumb, this, align);
    out.x = thumb.x;
    out.y = thumb.y;

    thumb.x = currentX;
    thumb.y = currentY;

    return out;
}

var tmpPoint = {};

export default GetThumbAlignPoint;