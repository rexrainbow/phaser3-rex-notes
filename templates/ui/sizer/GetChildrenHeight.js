var GetChildrenHeight = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, sizerConfig, proportion, padding, childHeight;
    var hasUnknownChildHeight = false;
    var totalProportion = this.childrenProportion; // To update this.hasProportion0Child member

    if (this.orientation === 0) { // x
        // Get maximun height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }

            sizerConfig = child.rexSizer;
            if (sizerConfig.hidden) {
                continue;
            }

            childHeight = this.getChildHeight(child);
            if (childHeight === undefined) {
                hasUnknownChildHeight = true;
            }

            if (hasUnknownChildHeight) {
                continue;
            }

            padding = sizerConfig.padding;
            childHeight += (padding.top + padding.bottom) * this.scaleY;
            result = Math.max(childHeight, result);
        }
    } else {
        // Get summation of minimum height
        var isFirstChild = true;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }

            sizerConfig = child.rexSizer;
            if (sizerConfig.hidden) {
                continue;
            }

            proportion = sizerConfig.proportion;
            if ((proportion === 0) || minimumMode) {
                childHeight = this.getChildHeight(child);
                if ((sizerConfig.fitRatio > 0) && (!sizerConfig.resolved)) {
                    childHeight = undefined;
                }

                if (childHeight === undefined) {
                    if ((proportion !== 0) && (!this.hasProportion0Child)) {
                        childHeight = 0;
                    } else {
                        hasUnknownChildHeight = true;
                    }
                }
            } else {
                childHeight = 0;
            }

            if (hasUnknownChildHeight) {
                continue;
            }

            padding = sizerConfig.padding;
            childHeight += (padding.top + padding.bottom) * this.scaleY;

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                childHeight += (this.space.item * this.scaleY);
            }

            result += childHeight;
        }
    }

    if (hasUnknownChildHeight) {
        return undefined;
    }

    return result + (this.space.top + this.space.bottom) * this.scaleY;
}

export default GetChildrenHeight;