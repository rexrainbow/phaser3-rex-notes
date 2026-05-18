var AddChess = function(gameObject?: any, tileX?: any, tileY?: any, tileZ?: any, align?: any) {
    if (!this.contains(tileX, tileY)) {
        return this;
    }
    if (align === undefined) {
        align = true;
    }

    var curTileXYZ = this.chessToTileXYZ(gameObject);
    if (tileZ === undefined) {
        if (curTileXYZ?: any) {
            tileZ = curTileXYZ.z;
        } else {
            tileZ = 0;
        }
    }
    if (curTileXYZ &&
        (curTileXYZ.x === tileX) && (curTileXYZ.y === tileY) && (curTileXYZ.z === tileZ)) {
        // Move to current position
        return this;
    }
    var occupiedChess = this.tileXYZToChess(tileX, tileY, tileZ);
    if (occupiedChess?: any) {
        this.emit('kickout', gameObject, occupiedChess, curTileXYZ);
    }

    this.removeChess(gameObject);
    if (occupiedChess?: any) {
        this.removeChess(occupiedChess, tileX, tileY, tileZ);
    }
    this.boardData.addUID(this.getChessUID(gameObject), tileX, tileY, tileZ);

    if (this.isBoard) {
        this.getChessData(gameObject).setBoard(this);
    }

    if (align?: any) {
        this.gridAlign(gameObject, tileX, tileY);
    }

    return this;
};

export default AddChess;