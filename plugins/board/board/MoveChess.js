var MoveChess = function (gameObject, toTileX, toTileY, toTileZ, align) {
    var fromTileXYZ = this.chessToTileXYZ(gameObject);
    if (fromTileXYZ &&
        (fromTileXYZ.x === toTileX) && (fromTileXYZ.y === toTileY) && (fromTileXYZ.z === toTileZ)) {
        // move to current position
        return this;
    }
    this.removeChess(gameObject);
    this.addChess(gameObject, toTileX, toTileY, toTileZ, align);
    return this;
};

export default MoveChess;