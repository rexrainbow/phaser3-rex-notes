var PutOnMainBoard = function (mainBoard, tileX, tileY, align) {
    if (!mainBoard) {
        return this;
    }

    this.pullOutFromMainBoard();
    if (!this.canPutOnMainBoard(mainBoard, tileX, tileY)) {
        return this;
    }

    this.setMainBoard(mainBoard, tileX, tileY);
    var tileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    var chessTileXYZ, mappedTileXY;
    for (var uid in tileXYZMap) {
        chessTileXYZ = tileXYZMap[uid];
        uid = parseInt(uid);

        mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY);
        mainBoard.addChess(uid, mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z);
    }
    if (align) {
        mainBoard.gridAlign(this, tileX, tileY);
    }

    return this;
}
export default PutOnMainBoard;