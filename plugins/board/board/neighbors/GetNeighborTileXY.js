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

        this.grid.getNeighborTileXY(srcTileXY.x, srcTileXY.y, dir, out);
        this.getWrapTileXY(out.x, out.y, out);
        if ((out.x == null) || (out.y == null)) {
            out = null;
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