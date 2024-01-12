var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var width;
    if (this.orientation === 0) {
        width = this.maxChildWidth;
    } else {
        width = (this.wrapResult) ? this.wrapResult.width : undefined;
    }

    if (width === undefined) {
        return undefined;
    }

    return width + this.space.left + this.space.right;
}

export default GetChildrenWidth;