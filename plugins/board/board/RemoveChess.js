'use strict'

var RemoveChess = function (gameObject, tileX, tileY, tileZ) {
    if (gameObject) {
        var tileXYZ = this.getChessXYZ(gameObject);
        if (tileXYZ) {
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
            tileZ = tileXYZ.z;
        } else {
            // chess is not in this board
            return this;
        }
    }
    this.boardData.removeChess(tileX, tileY, tileZ);
    return this;
}

export default RemoveChess;