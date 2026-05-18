var TileXYZToChess = function(tileX?: any, tileY?: any, tileZ?: any) {
    var uid = this.boardData.getUID(tileX, tileY, tileZ);
    return this.uidToChess(uid);
}
export default TileXYZToChess;