var GetSneakTileZ = function (originTileZ) {
    var board = this.chessData.board;
    var myTileXYZ = this.chessData.tileXYZ;
    var myTileX = myTileXYZ.x,
        myTileY = myTileXYZ.y;
    var sneakTileZ = originTileZ.toString();
    do {
        sneakTileZ += '.';
    } while (board.contains(myTileX, myTileY, sneakTileZ))
    return sneakTileZ;
}

export default GetSneakTileZ;