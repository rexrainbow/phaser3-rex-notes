
var RunChildrenWrap = function (lineWidth) {
    var out = {
        lines: [],
        width: 0,
        height: 0
    };

    var children = this.sizerChildren;
    var itemSpace = this.space.item,
        lineSpace = this.space.line,
        indentLeftOdd = this.space.indentLeftOdd,
        indentLeftEven = this.space.indentLeftEven,
        indentTopOdd = this.space.indentTopOdd,
        indentTopEven = this.space.indentTopEven;
    var child, padding, childWidth, childHeight, remainder = 0, indentLeft, indentTop;
    var lines = out.lines,
        lastLine = undefined,
        newLine;

    if (this.orientation === 0) { // x
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

                childWidth = this.getChildWidth(child);
                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right);

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
                    width: 0,
                    height: 0
                };
                lines.push(lastLine);

                indentLeft = (lines.length % 2) ? indentLeftOdd : indentLeftEven;
                remainder = lineWidth - indentLeft;
            }

            remainder -= (childWidth + itemSpace);
            if (child) {
                lastLine.children.push(child);

                childHeight = this.getChildHeight(child);
                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom);

                lastLine.height = Math.max(lastLine.height, childHeight);
            }
        }

        if (lastLine) {
            lastLine.width = lineWidth - (remainder + itemSpace);
            out.width = Math.max(out.width, lastLine.width);
            out.height += lastLine.height;
        }

        out.height += Math.max(indentTopOdd, indentTopEven);
    } else {

        var lineHeight = lineWidth;
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

                childHeight = this.getChildHeight(child);
                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom);

                newLine = (remainder < childHeight) || (lastLine === undefined);
            }
            // New line
            if (newLine) {
                if (lastLine) {
                    lastLine.height = lineHeight - (remainder + itemSpace);
                    out.height = Math.max(out.height, lastLine.height);
                    out.width += lastLine.width + lineSpace;
                }

                lastLine = {
                    children: [],
                    width: 0,
                    height: 0
                };
                lines.push(lastLine);

                indentTop = (lines.length % 2) ? indentTopOdd : indentTopEven;
                remainder = lineHeight - indentTop;
            }

            remainder -= (childHeight + itemSpace);
            if (child) {
                lastLine.children.push(child);

                childWidth = this.getChildWidth(child);
                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right);

                lastLine.width = Math.max(lastLine.width, childWidth);
            }
        }

        if (lastLine) {
            lastLine.height = lineHeight - (remainder + itemSpace);
            out.height = Math.max(out.height, lastLine.height);
            out.width += lastLine.width;
        }

        out.width += Math.max(indentLeftOdd, indentLeftEven);
    }

    return out;
}

export default RunChildrenWrap;