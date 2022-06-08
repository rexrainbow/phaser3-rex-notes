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
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentOdd = this.space.indentOdd,
        indentEven = this.space.indentEven;
    var child, childWidth, childHeight, remainder = 0, indent;
    var lines = out.lines,
        lastLine = undefined,
        newLine;
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
            newLine = (remainder < childWidth) || (lastLine === undefined);
        }
        // New line
        if (newLine) {
            if (lastLine) {
                lastLine.width = lineWidth - (remainder + itemSpace);
                out.width = Math.max(out.width, lastLine.width);
                out.height += lastLine.height + lineSpace;
            }

            lastLine = {
                children: [],
                // width: 0,
                height: 0
            };
            lines.push(lastLine);

            var indent = (lines.length % 2) ? indentOdd : indentEven;
            remainder = lineWidth - indent;
        }

        remainder -= (childWidth + itemSpace);
        if (child) {
            lastLine.children.push(child);
            childHeight = GeChildHeight(child);
            lastLine.height = Math.max(lastLine.height, childHeight);
        }
    }

    if (lastLine) {
        lastLine.width = lineWidth - (remainder + itemSpace);
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