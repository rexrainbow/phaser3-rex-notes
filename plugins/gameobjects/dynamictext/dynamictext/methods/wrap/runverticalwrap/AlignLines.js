var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    var xOffset, yOffset;

    var rtl = result.rtl;
    var lines = result.lines,
        lineWidth = result.lineWidth,
        linesWidth = result.linesWidth;
    switch (hAlign) {
        case 1:  // center
        case 'center':
            xOffset = (width - linesWidth) / 2
            break;

        case 2:  // right
        case 'right':
            xOffset = width - linesWidth;
            break;

        default:  // left
            xOffset = 0;
            break;
    }
    if (rtl) {
        xOffset += lineWidth;
    }

    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[(rtl) ? (lcnt - li - 1) : li];
        var children = line.children;
        var lineHeight = line.height;

        switch (vAlign) {
            case 1: // center
            case 'center':
                yOffset = (height - lineHeight) / 2;
                break;

            case 2: // bottom
            case 'bottom':
                yOffset = height - lineHeight;
                break;

            default: // top
                yOffset = 0;
                break;
        }

        if ((xOffset !== 0) || (yOffset !== 0)) {
            for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
                var child = children[ci];
                child.x += xOffset;
                child.y += yOffset;
            }
        }

        xOffset += lineWidth;
    }
}

export default AlignLines;