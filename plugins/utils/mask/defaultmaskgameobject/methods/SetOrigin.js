var SetOrigin = function (originX, originY) {
    if (originY === undefined) {
        originY = originX;
    }

    var parent = this.parent;
    if (originX === undefined) {
        originX = parent.originX;
    }
    if (originY === undefined) {
        originY = parent.originY;
    }
    if ((this._maskOriginX === originX) && (this._maskOriginY === originY)) {
        return this;
    }

    this._maskOriginX = originX;
    this._maskOriginY = originY;

    this._updateMaskGeometry();
    return this;
}

export default SetOrigin;
