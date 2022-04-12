var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    var xOffset, yOffset;

    var linesHeight = result.linesHeight;
    switch (vAlign) {
        case 1: // center
        case 'center':
            yOffset = (height - linesHeight) / 2;
            break;

        case 2: // bottom
        case 'bottom':
            yOffset = height - linesHeight;
            break;

        default:
            yOffset = 0;
            break;
    }

    var lines = result.lines;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[li];
        var lineWidth = line.width,
            children = line.children;

        switch (hAlign) {
            case 1:  // center
            case 'center':
                xOffset = (width - lineWidth) / 2
                break;

            case 2:  // right
            case 'right':
                xOffset = width - lineWidth;
                break;

            default:
                xOffset = 0;
                break;
        }

        if ((xOffset !== 0) || (yOffset !== 0)) {
            for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
                var child = children[ci];
                child.x += xOffset;
                child.y += yOffset;
            }
        }

    }

}

export default AlignLines;