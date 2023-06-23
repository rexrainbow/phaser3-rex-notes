var ResolveWidth = function (width) {
    var childrenWidth = this.childrenWidth;
    if (width === undefined) {
        if (childrenWidth > this.minWidth) {
            width = childrenWidth;
            console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) < childrenWidth (${childrenWidth})`);
        } else {
            width = this.minWidth;
        }
    } else {
        var minWidth = Math.max(childrenWidth, this.minWidth);
        if (minWidth > width) {
            console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) or childrenWidth (${childrenWidth} > targetWidth ${width}`);
        }
    }

    return width;
}

export default ResolveWidth;