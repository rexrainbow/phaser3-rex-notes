var TileXYToChessArray = function(tileX?: any, tileY?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }
    var tileZToUIDs = this.boardData.getUID(tileX, tileY);
    if (tileZToUIDs == null) {
        return out;
    }

    for (var tileZ in tileZToUIDs) {
        out.push(this.uidToChess(tileZToUIDs[tileZ]));
    }
    return out;
}
export default TileXYToChessArray;