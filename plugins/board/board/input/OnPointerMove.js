
var OnPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    // Get touched tileX, tileY
    var out = this.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    if ((this.input.tilePosition.x === tileX) && (this.input.tilePosition.y === tileY)) {
        // Tile position dose not change
        return;
    }
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    if (!this.contains(tileX, tileY)) {
        // Move outside
        if (this.input.pointer === pointer) { // Release touch pointer
            this.input.pointer = null;
        }
        return;
    }
    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }
    this.emit('tilemove', pointer, this.input.tilePosition);

    // Get touched chess
    globChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, globChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointermove', pointer);
        }
        this.emit('gameobjectmove', pointer, gameObject);
    }
    globChessArray.length = 0;
};

var globChessArray = [];

export default OnPointerMove;