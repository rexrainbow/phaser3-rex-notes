var OnPointerDown = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }

    OnTouchTileStart.call(this, pointer);
    OnDragStart.call(this, pointer);
}

var OnTouchTileStart = function (pointer) {
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
            gameObject.emit('miniboard.pointerdown', pointer);
        }
        this.emit('gameobjectdown', pointer, gameObject);
    }
    tmpChessArray.length = 0;
}

var OnDragStart = function (pointer) {
    var dragData = this.input.drag;
    // Drag by another pointer
    if (dragData.state === 1) {
        return;
    }

    var dragPosition = dragData.position;
    dragPosition.x = pointer.x - this.x;
    dragPosition.y = pointer.y - this.y;
    dragData.state = 1;
    this.emit('dragstart', pointer, dragPosition.x, dragPosition.y);
}

var tmpChessArray = [];

export default OnPointerDown;