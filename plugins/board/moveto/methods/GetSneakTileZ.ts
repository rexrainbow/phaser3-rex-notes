var GetSneakTileZ = function(moveTo?: any, tileX?: any, tileY?: any, tileZ?: any) {
    var board = moveTo.chessData.board;
    var sneakTileZ = tileZ.toString();
    do {
        sneakTileZ += '.';
    } while (board.contains(tileX, tileY, sneakTileZ))
    return sneakTileZ;
}

export default GetSneakTileZ;