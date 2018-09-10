'use strict'

var MoveChess = function (gameObject, toTileX, toTileY, toTileZ) {
    if (typeof (toTileX) !== 'number') {
        var toChess = toTileX;
        var toTileXYZ = this.getChessXYZ(toChess);
        if (toTileXYZ) {
            toTileX = toTileXYZ.x;
            toTileY = toTileXYZ.y;
            toTileZ = toTileXYZ.z;
        } else {
            return this;
        }
    }
    var fromTileXYZ = this.getChessXYZ(gameObject);
    if (fromTileXYZ &&
        (fromTileXYZ.x === toTileX) && (fromTileXYZ.y === toTileY) && (fromTileXYZ.z === toTileZ)) {
        // move to current position
        return this;
    }
    this.removeChess(gameObject);
    this.addChess(gameObject, toTileX, toTileY, toTileZ);
    return this;
};

export default MoveChess;