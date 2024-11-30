import OnDragStart from './DragStart.js';

var OnPointerDown = function (pointer) {
    if (!this.miniboardInput.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    if (this.miniboardInput.pointer === null) { // Catch new touch pointer
        this.miniboardInput.pointer = pointer;
    }

    var isHit = OnTouchTileStart.call(this, pointer);
    if (isHit) {
        OnDragStart.call(this, pointer);
    }
}

var OnTouchTileStart = function (pointer) {
    // Get touched chess
    var gameObjects = this.worldXYToChess(pointer.x, pointer.y, globChessArray);
    var isHit = (globChessArray.length > 0);
    if (isHit) {
        // Fire events
        var gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (gameObject.emit) {
                gameObject.emit('miniboard.pointerdown', pointer);
            }
            this.emit('gameobjectdown', pointer, gameObject);
        }
        this.emit('pointerdown', pointer, this);
    }

    globChessArray.length = 0;
    return isHit;
}

var globChessArray = [];

export default OnPointerDown;