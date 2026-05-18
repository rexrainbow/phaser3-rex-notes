import EmitChessEvent from './EmitChessEvent';

var OnPointerUp = function(pointer?: any) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        return;
    }
    board.emit('tileup', pointer, this.tilePosition);
    board.emit('tileout', pointer, this.prevTilePosition);

    var boardEventCallback = function(gameObject?: any) {
        board.emit('gameobjectup', pointer, gameObject);
        board.emit('gameobjectout', pointer, gameObject);
    }
    var chessEventCallback = function(gameObject?: any) {
        gameObject.emit('board.pointerup', pointer);
        gameObject.emit('board.pointerout', pointer);
    }

    EmitChessEvent(
        boardEventCallback,
        chessEventCallback,
        board, tileX, tileY,
        pointer
    );

    if (this.pointer === pointer) { // Release touch pointer
        this.pointer = null;
    }
};

export default OnPointerUp;