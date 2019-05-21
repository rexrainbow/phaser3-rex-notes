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

    // Get touched tileX, tileY
    var out = this.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('tiledown', pointer, this.input.tilePosition);

    // Get touched chess
    globChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, globChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointerdown', pointer);
        }
        this.emit('gameobjectdown', pointer, gameObject);
    }
    globChessArray.length = 0;
};

var globChessArray = [];

export default OnPointerDown;