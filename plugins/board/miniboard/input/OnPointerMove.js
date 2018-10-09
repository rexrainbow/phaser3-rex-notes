var OnPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    OnTouchTileMove.call(this, pointer);
    OnDrag.call(this, pointer);
}

var OnTouchTileMove = function (pointer) {
    // Get touched tileX, tileY
    var gird = this.grid;
    gird.saveOrigin();
    gird.setOriginPosition(this.x, this.y);
    var tileX = this.board.worldXYToTileX(pointer.x, pointer.y);
    var tileY = this.board.worldXYToTileY(pointer.x, pointer.y);
    gird.restoreOrigin();

    if ((this.input.tilePosition.x === tileX) && (this.input.tilePosition.y === tileY)) {
        // Tile position dose not change
        return;
    }
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
            gameObject.emit('miniboard.pointermove', pointer);
        }
        this.emit('gameobjectmove', pointer, gameObject);
    }
    var isOutside = (gameObjects.length === 0);
    if (gameObjects.length === 0) {
        // Move outside
        if (this.input.pointer === pointer) { // Release touch pointer
            this.input.pointer = null;
        }
    }
    tmpChessArray.length = 0;

    // Not dragging
    if (this.input.drag.state === 0) {
        if (this.input.pointer === pointer) {
            if (isOutside) {
                this.input.pointer = null; // Release touch pointer
            }
        } else if (this.input.pointer === null) {
            this.input.pointer = pointer; // Catch new touch pointer
        }
    }
}

var OnDrag = function (pointer) {
    var dragData = this.input.drag;
    // Not dragging
    if (dragData.state === 0) {
        return;
    }

    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    this.emit('drag', pointer, dragX, dragY);
}

var tmpChessArray = [];

export default OnPointerMove;