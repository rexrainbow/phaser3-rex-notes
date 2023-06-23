var ResolveHeight = function (height) {
    var childrenHeight = this.childrenHeight;
    if (height === undefined) {
        if (childrenHeight > this.minHeight) {
            height = childrenHeight;
            console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${this.minHeight}) < childrenHeight (${childrenHeight})`);
        } else {
            height = this.minHeight;
        }
    } else {
        var minHeight = Math.max(childrenHeight, this.minHeight);
        if (minHeight > height) {
            console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${this.minHeight}) or childrenHeight (${childrenHeight}) > targetHeight (${height})`);
        }
    }

    return height;
}

export default ResolveHeight;