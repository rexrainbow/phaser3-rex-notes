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
    var tileX = this.board.worldXYToTileX(pointer.x, pointer.y);
    var tileY = this.board.worldXYToTileY(pointer.x, pointer.y);
    gird.restoreOrigin();
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    tmpChessArray.length = 0;
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, tmpChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('miniboard.pointerup', pointer);
        }
        this.emit('gameobjectup', pointer, gameObject);
    }
    tmpChessArray.length = 0;
}

var tmpChessArray = [];

export default OnPointerUp;