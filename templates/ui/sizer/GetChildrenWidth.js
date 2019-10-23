var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    if (this.orientation === 0) { // x
        // Get summation of minimum width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer.hidden) {
                continue;
            }

            if (
                (child.rexSizer.proportion === 0) ||
                (minimumMode && (child.rexSizer.proportion > 0))
            ) {
                childWidth = (child.isRexSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    child.displayWidth;
            } else {
                childWidth = 0;
            }
            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right);
            result += childWidth;
        }
    } else {
        // Get maximun width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            if (child.rexSizer.hidden) {
                continue;
            }

            childWidth = (child.isRexSizer) ?
                Math.max(child.minWidth, child.childrenWidth) :
                child.displayWidth;

            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right);
            result = Math.max(childWidth, result);
        }
    }
    return result;
}

export default GetChildrenWidth;