import EmitChessEvent from './EmitChessEvent.js';

var OnPointerUp = function (pointer) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        return;
    }
    board.emit('tileup', pointer, this.tilePosition);

    EmitChessEvent(
        'gameobjectup', 'board.pointerup',
        board, tileX, tileY,
        pointer
    );

    if (this.pointer === pointer) { // Release touch pointer
        this.pointer = null;
    }
};

export default OnPointerUp;