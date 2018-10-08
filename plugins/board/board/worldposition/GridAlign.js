import IsUID from '../../chess/IsUID.js';

var GridAlign = function (gameObject, tileX, tileY) {
    if (gameObject === undefined) {
        var chess = this.getAllChess();
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            this.gridAlign(chess[i]);
        }
    } else {
        if (IsUID(gameObject)) {
            gameObject = this.uidToChess(gameObject);
        }
        if (tileX === undefined) {
            var tileXYZ = this.chessToTileXYZ(gameObject);
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
        }

        gameObject.x = this.tileXYToWorldX(tileX, tileY);
        gameObject.y = this.tileXYToWorldY(tileX, tileY);
    }
    return this;
};

export default GridAlign;