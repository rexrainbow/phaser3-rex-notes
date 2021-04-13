var ResolveWidth = function (width) {
    var minWidth = Math.max(this.childrenWidth, this.minWidth);
    if (width === undefined) {
        width = minWidth;
    } else {
        if (minWidth > width) {
            // Warning
        }
    }

    return width;
}

export default ResolveWidth;