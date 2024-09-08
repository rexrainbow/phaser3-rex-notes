var ResolveHeight = function (height) {
    var childrenHeight = this.childrenHeight;
    if (childrenHeight === undefined) {  // Can't resolve child height
        return undefined;
    }

    var minHeight = (this.minHeight !== undefined) ? (this.minHeight * this.scaleY) : 0;
    if (height === undefined) {
        height = Math.max(minHeight, childrenHeight);

        if (this.layoutWarnEnable) {
            if ((minHeight > 0) && (childrenHeight > minHeight)) {
                console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${minHeight}) < childrenHeight (${childrenHeight})`);
            }
        }
    } else {
        if (this.layoutWarnEnable) {
            if ((minHeight > height) || (childrenHeight > height)) {
                console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${minHeight}) or childrenHeight (${childrenHeight}) > targetHeight (${height})`);
            }
        }
    }

    return height;
}

export default ResolveHeight;