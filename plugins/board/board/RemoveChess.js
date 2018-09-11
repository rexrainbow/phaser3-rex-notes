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
    } else {
        gameObject = this.tileXYZToChess(tileX, tileY, tileZ);
        if (!gameObject) {
            // chess is not in this board
            return this;
        }
    }

    this.boardData.removeUID(tileX, tileY, tileZ);
    this.getChessData(gameObject).setBoard(null);

    return this;
}

export default RemoveChess;