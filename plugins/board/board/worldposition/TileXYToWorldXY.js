var TileXYToWorldXY = function (tileX, tileY, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globWorldXY;
    }

    out.x = this.grid.getWorldX(tileX, tileY);
    out.y = this.grid.getWorldY(tileX, tileY);
    return out;
}

var globWorldXY = {};
export default TileXYToWorldXY;