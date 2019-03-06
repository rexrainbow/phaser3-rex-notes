var GetNeighborTileXY = function (srcTileXY, directions, out) {
    if (typeof (directions) === 'string') {
        if (directions.indexOf(',') === -1) {
            directions = parseInt(directions);
        } else {
            directions = directions.split(',');
        }
    }

    if (typeof (directions) === 'number') {
        var dir = directions;
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globTileXY;
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
        var dir, neighborTileXY;

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
            out.push(neighborTileXY);
        }
        return out;
    }
};

var globTileXY = {};
export default GetNeighborTileXY;