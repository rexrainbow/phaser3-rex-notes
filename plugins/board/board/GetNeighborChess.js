var GetNeighborChess = function (chess, directions, neighborTileZ, out) {
    var tileXYZ = this.chessToTileXYZ(chess);
    if (tileXYZ === null) {
        return null;
    }
    var dir, neighborTileXY;
    if (neighborTileZ == null) {
        neighborTileZ = tileXYZ.z;
    }

    if (typeof (directions) === 'number') {
        // 1 direction
        dir = directions;
        neighborTileXY = this.getNeighborTileXY(tileXYZ, dir);
        if (neighborTileXY === null) {
            return null;
        }
        return this.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, neighborTileZ);
    } else {
        // directions
        if (!directions) {
            directions = this.grid.allDirections;
        }
        if (out === undefined) {
            out = [];
        }
        var neighborChess;
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
            dir = directions[i];
            neighborTileXY = this.getNeighborTileXY(tileXYZ, dir);
            if (neighborTileXY === null) {
                continue;
            }
            neighborChess = this.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, neighborTileZ);
            if (neighborChess == null) {
                continue;
            }
            out.push(neighborChess);
        }
        return out;
    }
}
export default GetNeighborChess;