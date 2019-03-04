import GetSneakTileZ from './GetSneakTileZ.js';

var CanMoveToTile = function (tileX, tileY, direction) {
    var board = this.chessData.board;
    // Chess is not in a board
    if (board == null) {
        return false;
    }
    var myTileXYZ = this.chessData.tileXYZ;
    var myTileX = myTileXYZ.x,
        myTileY = myTileXYZ.y,
        myTileZ = myTileXYZ.z;
    // Move to current position
    if ((tileX === myTileX) && (tileY === myTileY)) {
        return true;
    }
    // Target position is not in board
    if (!board.contains(tileX, tileY)) {
        return false;
    }

    if (direction === undefined) {
        direction = this.chessData.getTileDirection(tileX, tileY);
    }

    if (this.sneakMode) {
        if (this.tileZSave === undefined) {
            if (board.contains(tileX, tileY, myTileZ)) {
                // Sneak
                this.tileZSave = myTileZ;
                var sneakTileZ = GetSneakTileZ.call(this, this.tileZSave);
                board.moveChess(this.gameObject, tileX, tileY, sneakTileZ, false);
                myTileZ = sneakTileZ;
            }
        } else {
            if (board.contains(tileX, tileY, this.tileZSave)) {
                // Sneak
                var sneakTileZ = GetSneakTileZ.call(this, this.tileZSave);
                board.moveChess(this.gameObject, tileX, tileY, sneakTileZ, false);
                myTileZ = sneakTileZ;
            } else {
                // Go back
                board.moveChess(this.gameObject, tileX, tileY, this.tileZSave, false);
                myTileZ = this.tileZSave;
                this.tileZSave = undefined;
            }
        }
    }

    // Occupied test
    if (this.occupiedTest && !this.sneakMode) {
        if (board.contains(tileX, tileY, myTileZ)) {
            return false;
        }
    }

    // Blocker test
    if (this.blockerTest) {
        if (board.hasBlocker(tileX, tileY)) {
            return false;
        }
    }

    // Edge-blocker test
    if (this.edgeBlockerTest) {
        var chess = this.TileXYToChessArray(myTileX, myTileY, globChessArray);
        if (chess.length > 1) {
            for (var i = 0, cnt = chess.length; i < cnt; i++) {
                if (chess[i] === this.gameObject) {
                    continue;
                }
                if (board.hasEdgeBlocker(myTileX, myTileY, this.chessToTileXYZ(chess[i]).z, direction)) {
                    globChessArray.length = 0;
                    return false;
                }
            }
        }
        globChessArray.length = 0;

        // TODO
    }

    // Custom moveable test
    if (this.moveableTestCallback) {
        globTileXYZ.x = tileX;
        globTileXYZ.y = tileY;
        globTileXYZ.direction = direction;
        if (this.moveableTestScope) {
            var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, globTileXYZ, board);
        } else {
            var moveable = this.moveableTestCallback(myTileXYZ, globTileXYZ, board);
        }
        if (!moveable) {
            return false;
        }
    }

    return true;
}

var globTileXYZ = {
    x: 0,
    y: 0,
    direction: null
};

var globChessArray = [];

export default CanMoveToTile;