var GetTileDirection = function(tileX, tileY) {
    var board = this.board;
    if (board === null) {
        return null;
    }
    tmpTileXYZ.x = tileX;
    tmpTileXYZ.y = tileY;
    return board.getNeighborTileDirection(this.tileXYZ, tmpTileXYZ);
}

var tmpTileXYZ = {
    x: 0,
    y: 0
};
export default GetTileDirection;