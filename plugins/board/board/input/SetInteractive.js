var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    if (!this.input) {
        this.input = {
            enable: true,
            pointer: null,
            tilePosition: {
                x: undefined,
                y: undefined
            },
        };
        this.scene.input.on('pointerdown', onPointerDown, this);
        this.scene.input.on('pointerup', onPointerUp, this);
        this.scene.input.on('pointermove', onPointerMove, this);

        this.on('destroy', function () {
            if (this.scene) {
                this.scene.input.off('pointerdown', onPointerDown, this);
                this.scene.input.off('pointerup', onPointerUp, this);
                this.scene.input.off('pointermove', onPointerMove, this);
            }
        }, this);
    }

    this.input.enable = enable;
    if (!enable) {
        this.input.pointer = null;
    }
    return this;
};

var onPointerDown = function (pointer) {
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
    var tileX = this.worldXYToTileX(pointer.worldX, pointer.worldY),
        tileY = this.worldXYToTileY(pointer.worldX, pointer.worldY);
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('tiledown', pointer, this.input.tilePosition);

    // Get touched chess
    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointerdown', pointer);
        }
        this.emit('gameobjectdown', pointer, gameObject);
    }
    tmpChessArray.length = 0;
};

var onPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    // Get touched tileX, tileY
    var tileX = this.worldXYToTileX(pointer.worldX, pointer.worldY),
        tileY = this.worldXYToTileY(pointer.worldX, pointer.worldY);
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('tileup', pointer, this.input.tilePosition);

    // Get touched chess
    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointerup', pointer);
        }
        this.emit('gameobjectup', pointer, gameObject);
    }
    tmpChessArray.length = 0;

    if (this.input.pointer === pointer) { // Release touch pointer
        this.input.pointer = null;
    }
};

var onPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    // Get touched tileX, tileY
    var tileX = this.worldXYToTileX(pointer.worldX, pointer.worldY),
        tileY = this.worldXYToTileY(pointer.worldX, pointer.worldY);
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
    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointermove', pointer);
        }
        this.emit('gameobjectmove', pointer, gameObject);
    }
    tmpChessArray.length = 0;
};

var tmpChessArray = [];

export default SetInteractive;