var GetNeighborTileXY = function (srcTileXY, directions, out) {
    var dir, neighborTileXY;

    if (isNaN(parseInt(directions)) === false) {
        dir = directions;
        if (out === undefined) {
            out = {};
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

    } else if (Array.isArray(directions) || directions == null) {
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
    } else
        throw "Error: unsupported 'directions' argument type: must be integer, array or null!";
};
export default GetNeighborTileXY;
