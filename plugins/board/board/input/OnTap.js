import EmitChessEvent from './EmitChessEvent.js';

var OnTap = function (tap) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    board.worldXYToTileXY(tap.worldX, tap.worldY, globTileXY);
    var tileX = globTileXY.x,
        tileY = globTileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    var eventName = `${tap.tapsCount}tap`;
    board.emit('tiletap', tap, globTileXY);
    board.emit('tile' + eventName, tap, globTileXY);

    var boardEventCallback = function(gameObject) {
        board.emit('gameobjecttap', tap, gameObject);
        board.emit('gameobject' + eventName, tap, gameObject);
    }
    var chessEventCallback = function(gameObject) {
        gameObject.emit('board.tap', tap);
        gameObject.emit('board.' + eventName, tap);
    }
    EmitChessEvent(
        boardEventCallback, 
        chessEventCallback,
        board, tileX, tileY
    );
}

var globTileXY = {};

export default OnTap;