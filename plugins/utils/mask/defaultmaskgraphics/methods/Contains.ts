var Contains = function(x?: any, y?: any) {
    x -= this.x;
    y -= this.y;
    return this.geom.contains(x, y);
}

export default Contains;