var GetChildrenWidth = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var childrenWidth;
    if (this.orientation === 0) {
        if (minimumMode) {
            childrenWidth = this.maxChildWidth;
        } else {
            childrenWidth = (this.rexSizer.resolved) ? this.wrapResult.width : undefined;
        }
    } else {
        childrenWidth = (this.rexSizer.resolved) ? this.wrapResult.width : undefined;
    }

    if (childrenWidth === undefined) {
        return undefined;
    }

    return childrenWidth + ((this.space.left + this.space.right) * this.scaleX);
}

export default GetChildrenWidth;