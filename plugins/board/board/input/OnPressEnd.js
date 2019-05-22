import EmitChessEvent from './EmitChessEvent.js';

var OnPressEnd = function (press) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    board.worldXYToTileXY(press.worldX, press.worldY, globTileXY);
    var tileX = globTileXY.x,
        tileY = globTileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    board.emit('tilepressend', press, globTileXY);

    EmitChessEvent(
        'gameobjectpressend', 
        'board.pressend',
        board, tileX, tileY, press
    );
}

var globTileXY = {};

export default OnPressEnd;