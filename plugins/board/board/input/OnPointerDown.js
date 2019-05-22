import EmitChessEvent from './EmitChessEvent.js';

var OnPointerDown = function (pointer) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    var board = this.board;
    if (this.pointer === null) { // Catch new touch pointer
        this.pointer = pointer;
    }
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        return;
    }
    board.emit('tiledown', pointer, this.tilePosition);

    EmitChessEvent(
        'gameobjectdown', 'board.pointerdown',
        board, tileX, tileY,
        pointer
    );
};

export default OnPointerDown;