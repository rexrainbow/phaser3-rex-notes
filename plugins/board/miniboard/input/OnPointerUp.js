import OnDragEnd from './DragEnd.js';

var OnPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    OnTouchTileEnd.call(this, pointer);
    OnDragEnd.call(this, pointer);

    if (this.input.pointer === pointer) { // Release touch pointer
        this.input.pointer = null;
    }
}

var OnTouchTileEnd = function (pointer) {
    // Get touched tileX, tileY
    var gird = this.grid;
    gird.saveOrigin();
    gird.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
        tileY = out.y;
    gird.restoreOrigin();
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    globChessArray.length = 0;
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('miniboard.pointerup', pointer);
        }
        this.emit('gameobjectup', pointer, gameObject);
    }
    globChessArray.length = 0;
}

var globChessArray = [];

export default OnPointerUp;