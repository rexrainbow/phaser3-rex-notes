var SetPosition = function (x, y) {
    var parent = this.parent;
    if (x === undefined) {
        x = parent.x;
    }
    if (y === undefined) {
        y = parent.y;
    }

    this.x = x;
    this.y = y;
    return this;
}

export default SetPosition;
