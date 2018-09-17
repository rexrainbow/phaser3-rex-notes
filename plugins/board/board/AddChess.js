var AddChess = function (gameObject, tileX, tileY, tileZ, align) {
    if (tileZ === undefined) {
        tileZ = 0;
    }

    if (!this.contains(tileX, tileY)) {
        return this;
    }

    var curTileXYZ = this.chessToTileXYZ(gameObject);
    if (curTileXYZ &&
        (curTileXYZ.x === tileX) && (curTileXYZ.y === tileY) && (curTileXYZ.z === tileZ)) {
        // move to current position
        return this;
    }
    var occupiedChess = this.tileXYZToChess(tileX, tileY, tileZ);
    if (occupiedChess) {
        //
    }

    this.removeChess(gameObject);
    this.removeChess(occupiedChess, tileX, tileY, tileZ);
    this.boardData.addUID(this.getChessUID(gameObject), tileX, tileY, tileZ);
    this.getChessData(gameObject).setBoard(this);

    if (align) {
        this.gridAlign(gameObject, tileX, tileY, tileZ);
    }

    return this;
};

export default AddChess;