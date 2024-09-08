var ResolveWidth = function (width) {
    var childrenWidth = this.childrenWidth;
    if (childrenWidth === undefined) {  // Can't resolve child width
        return undefined;
    }

    var minWidth = (this.minWidth !== undefined) ? (this.minWidth * this.scaleX) : 0;
    if (width === undefined) {
        width = Math.max(minWidth, childrenWidth);

        if (this.layoutWarnEnable) {
            if ((minWidth > 0) && (childrenWidth > minWidth)) {
                console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) < childrenWidth (${childrenWidth})`);
            }
        }
    } else {
        if (this.layoutWarnEnable) {
            if ((minWidth > width) || (childrenWidth > width)) {
                console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) or childrenWidth (${childrenWidth} > targetWidth ${width})`);
            }
        }
    }

    return width;
}

export default ResolveWidth;