var Rotate = function(tileXY?: any, direction?: any, originTileXY?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    if (originTileXY !== undefined) {
        this.offset(tileXY, -originTileXY.x, -originTileXY.y, out);
    } else {
        out.x = tileXY.x;
        out.y = tileXY.y;
    }
    this.grid.rotate(out, direction, out);
    if (originTileXY !== undefined) {
        this.offset(out, originTileXY.x, originTileXY.y, out);
    }
    return out;
};

var globTileXY = {};
export default Rotate;