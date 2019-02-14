import GetWidth from './GetChildWidth.js';
import GetHeight from './GetChildHeight.js';

var RunChildrenWrap = function (out) {
    if (out === undefined) {
        out = [];
    }
    var children = this.sizerChildren;
    var child, childWidth, remainder, lastRow;
    var parentWidth = GetParentWidth(this, this.orientation);
    remainder = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        // Skip invisible child
        if (!child.visible) {
            continue;
        }

        childWidth = GetChildWidth(child, this.orientation);
        // New line
        if (remainder < childWidth) {
            lastRow = {
                children: [],
                remainder: 0,
                height: 0
            };
            out.push(lastRow);
            remainder = parentWidth;
        }

        remainder -= childWidth + this.itemSpacing;
        lastRow.children.push(child);
        lastRow.remainder = remainder;
        lastRow.height = Math.max(lastRow.height, GeChildHeight(child, this.orientation));
    }
    return out;
}

var GetParentWidth = function (parent, orientation) {
    var padding = parent.padding;
    return (orientation === 0) ?
        (parent.width - padding.left - padding.right) :
        (parent.height - padding.top - padding.bottom);
}

var GetChildWidth = function (child, orientation) {
    return (orientation === 0) ? GetWidth(child) : GetHeight(child);
}

var GeChildHeight = function (child, orientation) {
    return (orientation === 0) ? GetHeight(child) : GetWidth(child);
}

export default RunChildrenWrap;