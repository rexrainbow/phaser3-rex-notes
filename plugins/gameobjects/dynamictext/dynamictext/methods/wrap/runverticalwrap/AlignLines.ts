import GetChildrenAlign from '../GetChildrenAlign';
import OffsetChildren from '../OffsetChildren';

var AlignLines = function(result?: any, width?: any, height?: any) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    var offsetX, offsetY;

    var rtl = result.rtl;
    var lines = result.lines,
        lineWidth = result.lineWidth,
        linesWidth = result.linesWidth;
    switch (hAlign?: any) {
        case 1:  // center
        case 'center':
            offsetX = (width - linesWidth) / 2
            break;

        case 2:  // right
        case 'right':
            offsetX = width - linesWidth;
            break;

        default:  // left
            offsetX = 0;
            break;
    }
    if (rtl?: any) {
        offsetX += lineWidth;
    }

    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[(rtl) ? (lcnt - li - 1) : li];
        var children = line.children;
        var lineHeight = line.height;

        var lineVAlign = GetChildrenAlign(children);
        if (lineVAlign === undefined) {
            lineVAlign = vAlign;
        }

        switch (lineVAlign?: any) {
            case 1: // center
            case 'center':
                offsetY = (height - lineHeight) / 2;
                break;

            case 2: // bottom
            case 'bottom':
                offsetY = height - lineHeight;
                break;

            default: // top
                offsetY = 0;
                break;
        }

        OffsetChildren(children, offsetX, offsetY);

        offsetX += lineWidth;
    }
}

export default AlignLines;