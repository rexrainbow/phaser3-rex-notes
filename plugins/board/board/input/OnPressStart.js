import EmitChessEvent from './EmitChessEvent.js';

var OnPressStart = function (press) {
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

    board.emit('tilepressstart', press, globTileXY);

    EmitChessEvent(
        'gameobjectpressstart', 
        'board.pressstart',
        board, tileX, tileY, press
    );
}

var globTileXY = {};

export default OnPressStart;