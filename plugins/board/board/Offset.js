var Offset = function (tileXY, offsetX, offsetY, out) {
    if (out === undefined) {
        out = tmp;
    }
    if ((offsetX === 0) && (offsetY === 0)) {
        out.x = tileXY.x;
        out.y = tileXY.y;
    } else {
        out = this.grid.offset(tileXY, offsetX, offsetY, out);
    }
    return out;
};

var tmp = {
    x: 0,
    y: 0
}
export default Offset;