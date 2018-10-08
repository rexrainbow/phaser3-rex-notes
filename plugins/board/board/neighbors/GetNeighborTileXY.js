var GetNeighborTileXY = function (srcTileXY, directions, out) {
    var dir, neighborTileXY;

    if (typeof (directions) === 'number') {
        dir = directions;
        if (out === undefined) {
            out = tmpTileXY;
        }
        var tileX = this.grid.getNeighborTileX(srcTileXY.x, srcTileXY.y, dir);
        var tileY = this.grid.getNeighborTileY(srcTileXY.x, srcTileXY.y, dir);
        var wrapTileX = this.getWrapTileX(tileX, tileY);
        var wrapTileY = this.getWrapTileY(tileX, tileY);
        if ((wrapTileX == null) || (wrapTileY == null)) {
            out = null;
        } else {
            out.x = wrapTileX;
            out.y = wrapTileY;
        }
        return out;

    } else {
        // directions array
        if (directions == null) {
            directions = this.grid.allDirections;
        }
        if (out === undefined) {
            out = [];
        }
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
            dir = directions[i];
            neighborTileXY = this.getNeighborTileXY(srcTileXY, dir);
            if (neighborTileXY === null) {
                continue;
            }
            out.push({
                x: neighborTileXY.x,
                y: neighborTileXY.y
            });
        }
        return out;
    }
};

var tmpTileXY = {
    x: 0,
    y: 0
}
export default GetNeighborTileXY;