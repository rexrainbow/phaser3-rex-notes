var SetPosition = function (x, y) {
    var parent = this.parent;
    if (x === undefined) {
        x = parent.x;
    }
    if (y === undefined) {
        y = parent.y;
    }

    this._maskX = x;
    this._maskY = y;

    if (this._updateMaskPosition) {
        this._updateMaskPosition();
    } else {
        this.x = x;
        this.y = y;
    }

    return this;
}

export default SetPosition;
