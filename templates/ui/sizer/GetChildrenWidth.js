var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, sizerConfig, proportion, padding, childWidth;
    var hasUnknownChildWidth = false;
    var totalProportion = this.childrenProportion; // To update this.hasProportion0Child member

    if (this.orientation === 0) { // x
        // Get summation of minimum width
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
                childWidth = this.getChildWidth(child);
                if ((sizerConfig.fitRatio > 0) && (!sizerConfig.resolved)) {
                    childWidth = undefined;
                }

                if (childWidth === undefined) {
                    if ((proportion !== 0) && (!this.hasProportion0Child)) {
                        childWidth = 0;
                    } else {
                        hasUnknownChildWidth = true;
                    }
                }
            } else {
                childWidth = 0;
            }

            if (hasUnknownChildWidth) {
                continue;
            }

            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right) * this.scaleX;

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                childWidth += (this.space.item * this.scaleX);
            }

            result += childWidth;
        }
    } else {
        // Get maximun width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }

            sizerConfig = child.rexSizer;
            if (sizerConfig.hidden) {
                continue;
            }

            childWidth = this.getChildWidth(child);
            if (childWidth === undefined) {
                hasUnknownChildWidth = true;
            }

            if (hasUnknownChildWidth) {
                continue;
            }

            padding = sizerConfig.padding;
            childWidth += (padding.left + padding.right) * this.scaleX;

            result = Math.max(childWidth, result);
        }
    }

    if (hasUnknownChildWidth) {
        return undefined;
    }

    return result + (this.space.left + this.space.right) * this.scaleX;
}

export default GetChildrenWidth;