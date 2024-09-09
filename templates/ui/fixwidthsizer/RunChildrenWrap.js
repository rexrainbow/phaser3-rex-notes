
var RunChildrenWrap = function (lineWidth) {
    var out = {
        lines: [],
        width: 0,
        height: 0
    };

    var children = this.sizerChildren;
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
                    child.runLayout(this);
                }

                childWidth = this.getChildWidth(child);
                padding = child.rexSizer.padding;
                childWidth += ((padding.left + padding.right) * this.scaleX);

                newLine = (remainder < childWidth) || (lastLine === undefined);
            }
            // New line
            if (newLine) {
                if (lastLine) {
                    lastLine.width = lineWidth - (remainder + (this.space.item * this.scaleX));
                    out.width = Math.max(out.width, lastLine.width);
                    out.height += lastLine.height + (this.space.line * this.scaleY);
                }

                lastLine = {
                    children: [],
                    width: 0,
                    height: 0
                };
                lines.push(lastLine);

                indentLeft = (lines.length % 2) ? this.space.indentLeftOdd : this.space.indentLeftEven;
                remainder = lineWidth - (indentLeft * this.scaleX);
            }

            remainder -= childWidth + (this.space.item * this.scaleX);
            if (child) {
                lastLine.children.push(child);

                childHeight = this.getChildHeight(child);
                padding = child.rexSizer.padding;
                childHeight += (padding.top + padding.bottom) * this.scaleY;

                lastLine.height = Math.max(lastLine.height, childHeight);
            }
        }

        if (lastLine) {
            lastLine.width = lineWidth - (remainder + (this.space.item * this.scaleX));
            out.width = Math.max(out.width, lastLine.width);
            out.height += lastLine.height;
        }

        out.height += Math.max(this.space.indentTopOdd, this.space.indentTopEven) * this.scaleY;
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
                childHeight += (padding.top + padding.bottom) * this.scaleY;

                newLine = (remainder < childHeight) || (lastLine === undefined);
            }
            // New line
            if (newLine) {
                if (lastLine) {
                    lastLine.height = lineHeight - (remainder + (this.space.item * this.scaleY));
                    out.height = Math.max(out.height, lastLine.height);
                    out.width += lastLine.width + (this.space.line * this.scaleX);
                }

                lastLine = {
                    children: [],
                    width: 0,
                    height: 0
                };
                lines.push(lastLine);

                indentTop = (lines.length % 2) ? this.space.indentTopOdd : this.space.indentTopEven;
                remainder = lineHeight - (indentTop * this.scaleY);
            }

            remainder -= childHeight + (this.space.item * this.scaleY);
            if (child) {
                lastLine.children.push(child);

                childWidth = this.getChildWidth(child);
                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right) * this.scaleX;

                lastLine.width = Math.max(lastLine.width, childWidth);
            }
        }

        if (lastLine) {
            lastLine.height = lineHeight - (remainder + (this.space.item * this.scaleY));
            out.height = Math.max(out.height, lastLine.height);
            out.width += lastLine.width;
        }

        out.width += Math.max(this.space.indentLeftOdd, this.space.indentLeftEven) * this.scaleX;
    }

    return out;
}

export default RunChildrenWrap;