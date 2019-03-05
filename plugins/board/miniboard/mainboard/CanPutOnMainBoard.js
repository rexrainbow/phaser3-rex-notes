var CanPutOnMainBoard = function (mainBoard, tileX, tileY, chessTileXYMap) {
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
            if (this.putTestCallbackScpe) {
                isOccupied = this.putTestCallback.call(this.putTestCallbackScpe, mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z, mainBoard);
            } else {
                isOccupied = this.putTestCallback(mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z, mainBoard);
            }
        } else {
            // Default test function
            isOccupied = mainBoard.contains(mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z);
        }
        if (isOccupied) {
            return false;
        }
    }
    return true;
}

export default CanPutOnMainBoard;