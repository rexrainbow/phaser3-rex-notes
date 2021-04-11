import { GetDisplayWidth, GetDisplayHeight } from '../../../plugins/utils/size/GetDisplaySize.js';

var RunChildrenWrap = function (lineWidth, out) {
    if (out === undefined) {
        out = {
            lines: [],
            width: 0,
            height: 0
        }
    } else {
        out.lines.length = 0;
        out.width = 0;
        out.height = 0;
    }

    var children = this.sizerChildren;
    var child, childWidth, childHeight, remainder = 0;
    var lastLine, lines = out.lines, newLine;
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

            childWidth = GetChildWidth(child);
            newLine = (remainder < childWidth);
        }
        // New line
        if (newLine) {
            if (lastLine) {
                lastLine.width = lineWidth - (remainder + this.space.item);
                out.width = Math.max(out.width, lastLine.width);
                out.height += lastLine.height + this.space.line;
            }

            lastLine = {
                children: [],
                // width: 0,
                height: 0
            };
            lines.push(lastLine);
            remainder = lineWidth;
        }

        remainder -= (childWidth + this.space.item);
        if (child) {
            lastLine.children.push(child);
            childHeight = GeChildHeight(child);
            lastLine.height = Math.max(lastLine.height, childHeight);
        }
    }

    if (lastLine) {
        lastLine.width = lineWidth - (remainder + this.space.item);
        out.width = Math.max(out.width, lastLine.width);
        out.height += lastLine.height;
    }
    return out;
}

var GetChildWidth = function (child) {
    var padding = child.rexSizer.padding;
    return GetDisplayWidth(child) + padding.left + padding.right;
}

var GeChildHeight = function (child) {
    var padding = child.rexSizer.padding;
    return GetDisplayHeight(child) + padding.top + padding.bottom;
}

export default RunChildrenWrap;