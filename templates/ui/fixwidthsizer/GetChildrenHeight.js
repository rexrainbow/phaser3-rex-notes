var GetChildrenHeight = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var childrenHeight;
    if (this.orientation === 1) {
        if (minimumMode) {
            childrenHeight = this.maxChildHeight;
        } else {
            childrenHeight = (this.rexSizer.resolved) ? this.wrapResult.height : undefined;
        }
    } else {
        childrenHeight = (this.rexSizer.resolved) ? this.wrapResult.height : undefined;
    }

    if (childrenHeight === undefined) {
        return undefined;
    }

    return childrenHeight + ((this.space.top + this.space.bottom) * this.scaleY);
}

export default GetChildrenHeight;