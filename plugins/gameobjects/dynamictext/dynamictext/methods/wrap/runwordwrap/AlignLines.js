import GetChildrenAlign from '../GetChildrenAlign.js';
import OffsetChildren from '../OffsetChildren.js';

var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign,
        justifyPercentage = result.justifyPercentage;

    var lines = result.lines;
    var offsetX, offsetY;
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var line = lines[li];
        var lineWidth = line.width,
            children = line.children;

        var lineHAlign = GetChildrenAlign(children);
        if (lineHAlign === undefined) {
            lineHAlign = hAlign;
        }

        switch (lineHAlign) {
            case 0:
            case 'left':
                offsetX = 0;
                break;

            case 1:  // center
            case 'center':
                var remainderWidth = width - lineWidth;
                offsetX = remainderWidth / 2
                break;

            case 2:  // right
            case 'right':
                var remainderWidth = width - lineWidth;
                offsetX = remainderWidth;
                break;

            case 3:
            case 'justify':
            case 'justify-left':
                var remainderWidth = width - lineWidth;
                var remainderPercentage = remainderWidth / width;
                if (remainderPercentage < justifyPercentage) {
                    JustifyChildren(children, remainderWidth);
                    offsetX = 0;
                } else {
                    offsetX = 0;
                }
                break;

            case 4:
            case 'justify-center':
                var remainderWidth = width - lineWidth;
                var remainderPercentage = remainderWidth / width;
                if (remainderPercentage < justifyPercentage) {
                    JustifyChildren(children, remainderWidth);
                    offsetX = 0;
                } else {
                    offsetX = remainderWidth / 2;
                }
                break;

            case 5:
            case 'justify-right':
                var remainderWidth = width - lineWidth;
                var remainderPercentage = remainderWidth / width;
                if (remainderPercentage < justifyPercentage) {
                    JustifyChildren(children, remainderWidth);
                    offsetX = 0;
                } else {
                    offsetX = remainderWidth;
                }
                break;

            default:
                offsetX = 0;
                break;
        }

        var linesHeight = result.linesHeight;
        switch (vAlign) {
            case 1: // center
            case 'center':
                offsetY = (height - linesHeight) / 2;
                break;

            case 2: // bottom
            case 'bottom':
                offsetY = height - linesHeight;
                break;

            default:
                offsetY = 0;
                break;
        }

        OffsetChildren(children, offsetX, offsetY);

    }

}

var JustifyChildren = function (children, remainderWidth) {
    var offset = remainderWidth / children.length;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.renderable) {
            continue;
        }

        child.x += offset * i;
    }
}

export default AlignLines;