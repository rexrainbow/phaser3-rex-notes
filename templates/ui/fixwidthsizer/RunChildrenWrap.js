import GetWidth from './GetChildWidth.js';
import GetHeight from './GetChildHeight.js';

var RunChildrenWrap = function (lineWidth) {
    var result = {
        lines: [],
        width: 0,
        height: 0
    };
    var children = this.sizerChildren;
    var child, childWidth, remainder = 0;
    var lastLine, lines = result.lines, newLine;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            child = undefined;
            childWidth = 0;
            newLine = true;
        } else {
            if (child.rexSizer.hidden) {
                continue;
            }

            if (child.isRexSizer) {
                child.layout(); // Use original size
            }

            childWidth = GetChildWidth(child, this.orientation);
            newLine = (remainder < childWidth);
        }
        // New line
        if (newLine) {
            if (lastLine) {
                var curLineWidth = lineWidth - (remainder + this.itemSpacing);
                result.width = Math.max(result.width, curLineWidth);
                result.height += lastLine.height + this.lineSpacing;
            }

            lastLine = {
                children: [],
                remainder: 0,
                height: 0
            };
            lines.push(lastLine);
            remainder = lineWidth;
        }

        remainder -= childWidth + this.itemSpacing;
        lastLine.remainder = remainder;
        if (child) {
            lastLine.children.push(child);
            lastLine.height = Math.max(lastLine.height, GeChildHeight(child, this.orientation));
        }
    }

    if (lastLine) {
        result.height += lastLine.height;
    }
    return result;
}

var GetChildWidth = function (child, orientation) {
    return (orientation === 0) ? GetWidth(child) : GetHeight(child);
}

var GeChildHeight = function (child, orientation) {
    return (orientation === 0) ? GetHeight(child) : GetWidth(child);
}

export default RunChildrenWrap;