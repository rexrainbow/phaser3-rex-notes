var GetNeighborChess = function (chess, directions, neighborTileZ, out) {
    var tileXYZ = this.chessToTileXYZ(chess);
    var dir, neighborTileX, neighborTileY;
    if (neighborTileZ == null) {
        neighborTileZ = tileXYZ.z;
    }

    if (typeof (directions) === 'number') {
        // 1 direction
        dir = directions;
        neighborTileX = this.getNeighborTileX(tileX, tileY, dir);
        neighborTileY = this.getNeighborTileY(tileX, tileY, dir);
        if ((neighborTileX === null) || (neighborTileY === null)) {
            return null;
        }
        return this.tileXYZToChess(neighborTileX, neighborTileY, neighborTileZ);
    } else {
        // directions
        if (!directions) {
            directions = this.grid.allDirections;
        }
        if (out === undefined) {
            out = [];
        }
        for (var i = 0, cnt = directions.length; i < cnt; i++) {
            dir = directions[i];
            neighborTileX = this.getNeighborTileX(tileX, tileY, dir);
            neighborTileY = this.getNeighborTileY(tileX, tileY, dir);
            if ((neighborTileX === null) || (neighborTileY === null)) {
                continue;
            }
            out.push(this.tileXYZToChess(neighborTileX, neighborTileY, neighborTileZ));
        }
        return out;
    }
}
export default GetNeighborChess;