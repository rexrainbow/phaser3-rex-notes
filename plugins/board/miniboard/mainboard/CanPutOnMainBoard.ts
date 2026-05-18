var CanPutOnMainBoard = function(mainBoard?: any, tileX?: any, tileY?: any, chessTileXYMap?: any) {
    if (!mainBoard) {
        return false;
    }
    if (chessTileXYMap === undefined) {
        chessTileXYMap = this.tileXYZMap; // {uid:{x,y,z}}
    }

    var chessTileXYZ, mappedTileXY, isOccupied;
    for (var uid in chessTileXYMap) {
        chessTileXYZ = chessTileXYMap[uid];
        mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY, true);
        if (!mainBoard.contains(mappedTileXY.x, mappedTileXY.y)) {
            return false;
        }

        if (this.putTestCallback) {
            // Custom test function
            targetTileXY.x = mappedTileXY.x;
            targetTileXY.y = mappedTileXY.y;
            targetTileXY.z = chessTileXYZ.z;
            var chess = this.board.uidToChess(uid);
            if (this.putTestCallbackScpe) {
                isOccupied = this.putTestCallback.call(this.putTestCallbackScpe, targetTileXY, mainBoard, chess);
            } else {
                isOccupied = this.putTestCallback(targetTileXY, mainBoard, chess);
            }
        } else {
            // Default test function
            isOccupied = mainBoard.contains(mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z);
        }
        if (isOccupied?: any) {
            return false;
        }
    }
    return true;
}

var targetTileXY = { x: 0, y: 0, z: 0, };

export default CanPutOnMainBoard;