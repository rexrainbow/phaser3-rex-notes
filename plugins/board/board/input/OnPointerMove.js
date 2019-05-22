import AreTileXYEqual from '../../utils/AreTileXYEqual.js';
import EmitChessEvent from './EmitChessEvent.js';

var OnPointerMove = function (pointer) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    if (AreTileXYEqual(this.tilePosition, out)) {
        // Tile position dose not change
        return;
    }

    var tileX = out.x,
        tileY = out.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        // Move outside
        if (this.pointer === pointer) { // Release touch pointer
            this.pointer = null;
        }
        return;
    }
    if (this.pointer === null) { // Catch new touch pointer
        this.pointer = pointer;
    }
    board.emit('tilemove', pointer, this.tilePosition);

    EmitChessEvent(
        'gameobjectmove', 'board.pointermove',
        board, tileX, tileY,
        pointer
    );
};

export default OnPointerMove;