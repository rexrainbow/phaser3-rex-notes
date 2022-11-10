var ResolveHeight = function (height, forceResolving) {
    var minHeight = Math.max(this.childrenHeight, this.minHeight);
    if (height === undefined) {
        height = minHeight;
    } else {
        if (minHeight > height) {
            // Warning
        }
    }

    return height;
}

export default ResolveHeight;