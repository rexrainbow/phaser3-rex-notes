var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var height;
    if (this.orientation === 1) {
        height = this.maxChildHeight;
    } else {
        height = (this.wrapResult) ? this.wrapResult.height : undefined;
    }

    if (height === undefined) {
        return undefined;
    }

    return height + this.space.top + this.space.bottom;
}

export default GetChildrenHeight;