var Contains = function (x, y) {
    x -= this.x;
    y -= this.y;
    return this.geom.contains(x, y);
}

export default Contains;