var Contains = function (x, y) {
    var localPoint = this.getLocalPoint(x, y, this._maskLocalPoint);
    this._maskLocalPoint = localPoint;

    return this.geom.contains(localPoint.x, localPoint.y);
}

export default Contains;
