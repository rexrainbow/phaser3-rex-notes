var AddChess = function (gameObject, tileX, tileY, tileZ, align) {
    if (!this.contains(tileX, tileY)) {
        return this;
    }

    var curTileXYZ = this.chessToTileXYZ(gameObject);
    if (tileZ === undefined) {
        if (curTileXYZ) {
            tileZ = curTileXYZ.z;
        } else {
            tileZ = 0;
        }
    }
    if (curTileXYZ &&
        (curTileXYZ.x === tileX) && (curTileXYZ.y === tileY) && (curTileXYZ.z === tileZ)) {
        // move to current position
        return this;
    }
    var occupiedChess = this.tileXYZToChess(tileX, tileY, tileZ);
    if (occupiedChess) {
        // TODO
    }

    this.removeChess(gameObject);
    if (occupiedChess) {
        this.removeChess(occupiedChess, tileX, tileY, tileZ);
    }
    this.boardData.addUID(this.getChessUID(gameObject), tileX, tileY, tileZ);
    this.getChessData(gameObject).setBoard(this);

    if (align) {
        this.gridAlign(gameObject, tileX, tileY);
    }

    return this;
};

export default AddChess;