import { HAlign, VAlign } from '../AlignConst.js';

var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    if (typeof (hAlign) === 'string') {
        hAlign = HAlign[hAlign];
        result.hAlign = hAlign;
    }
    if (typeof (vAlign) === 'string') {
        vAlign = VAlign[vAlign];
        result.vAlign = vAlign;
    }

    var rtl = result.rtl;
    var lines = result.lines,
        lineWidth = result.lineWidth,
        linesWidth = result.linesWidth;
    var xOffset;
    switch (hAlign) {
        case 0:  // left
            xOffset = 0;
            break;
        case 1:  // center
            xOffset = (width - linesWidth) / 2
            break;
        case 2:  // right
            xOffset = width - linesWidth;
            break;
    }
    if (rtl) {
        xOffset += lineWidth;
    }
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[(rtl) ? (lcnt - li - 1) : li];
        var children = line.children;
        var lineHeight = line.height;

        var yOffset;
        switch (vAlign) {
            case 0: // top
                yOffset = 0;
                break;
            case 1: // center
                yOffset = (height - lineHeight) / 2;
                break;
            case 2: // bottom
                yOffset = height - lineHeight;
                break;
        }

        for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
            var child = children[ci];
            child.x += xOffset;
            child.y += yOffset;
        }

        xOffset += lineWidth;
    }
}

export default AlignLines;