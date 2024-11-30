var OnPointerMove = function (pointer) {
    if (!this.miniboardInput.enable) {
        return;
    }

    OnTouchTileMove.call(this, pointer);
    OnDrag.call(this, pointer);
}

var OnTouchTileMove = function (pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
        tileY = out.y;
    grid.restoreOrigin();

    if ((this.miniboardInput.tilePosition.x === tileX) && (this.miniboardInput.tilePosition.y === tileY)) {
        // Tile position dose not change
        return;
    }
    this.miniboardInput.tilePosition.x = tileX;
    this.miniboardInput.tilePosition.y = tileY;

    // Get touched chess
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray);
    var hitChess = (gameObjects.length > 0);
    if (hitChess) {
        // Fire events
        var gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (gameObject.emit) {
                gameObject.emit('miniboard.pointermove', pointer);
            }
            this.emit('gameobjectmove', pointer, gameObject);
        }
        this.emit('pointermove', pointer, this);
    } else {
        // Move outside
        if (this.miniboardInput.pointer === pointer) { // Release touch pointer
            this.miniboardInput.pointer = null;
        }
    }
    globChessArray.length = 0;

    // Not dragging
    if (this.miniboardInput.drag.state === 0) {
        if (this.miniboardInput.pointer === pointer) {
            if (!hitChess) {
                this.miniboardInput.pointer = null; // Release touch pointer
            }
        } else if (this.miniboardInput.pointer === null) {
            this.miniboardInput.pointer = pointer; // Catch new touch pointer
        }
    }
}

var OnDrag = function (pointer) {
    var dragData = this.miniboardInput.drag;
    // Not dragging
    if (dragData.state === 0) {
        return;
    }

    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    this.emit('drag', pointer, dragX, dragY);
}

var globChessArray = [];

export default OnPointerMove;