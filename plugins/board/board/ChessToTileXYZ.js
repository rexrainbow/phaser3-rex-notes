var ChessToTileXYZ = function (chess) {
    // game object or uid
    return this.boardData.getXYZ(this.getChessUID(chess));
}
export default ChessToTileXYZ;