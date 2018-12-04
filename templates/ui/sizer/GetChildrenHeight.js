var GetChildrenHeight = function (minimumMode) {
    if (!this.visible) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    if (this.orientation === 0) { // x
        // Get maximun height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            // Skip invisible child
            if (!child.visible) {
                continue;
            }

            if (child.rexSizer.proportion === -1) { // Background
                childHeight = 0;
            } else {
                childHeight = (child.isRexSizer) ?
                    Math.max(child.minHeight, child.childrenHeight) :
                    child.height;
            }
            padding = child.rexSizer.padding;
            childHeight += (padding.top + padding.bottom);
            result = Math.max(childHeight, result);
        }
    } else {
        // Get summation of minimum height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            // Skip invisible child
            if (!child.visible) {
                continue;
            }

            if (
                (child.rexSizer.proportion === 0) ||
                (minimumMode && (child.rexSizer.proportion > 0))
            ) {
                childHeight = (child.isRexSizer) ?
                    Math.max(child.minHeight, child.childrenHeight) :
                    child.height;
            } else {
                childHeight = 0;
            }
            padding = child.rexSizer.padding;
            childHeight += (padding.top + padding.bottom);
            result += childHeight;
        }
    }
    return result;
}

export default GetChildrenHeight;