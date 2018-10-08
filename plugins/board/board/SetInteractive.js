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
            this.scene.input.off('pointerdown', onPointerDown, this);
            this.scene.input.off('pointerup', onPointerUp, this);
            this.scene.input.off('pointermove', onPointerMove, this);
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
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        return;
    }
    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    this.emit('tiledown', pointer, this.input.tilePosition);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointerdown', pointer);
        }
        this.emit('gameobjectdown', pointer, gameObject);
    }
};

var onPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        return;
    }
    if (this.input.pointer === pointer) { // Release touch pointer
        this.input.pointer = null;
    }
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    this.emit('tileup', pointer, this.input.tilePosition);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointerup', pointer);
        }
        this.emit('gameobjectup', pointer, gameObject);
    }
};

var onPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    var tileX = this.worldXYToTileX(pointer.x, pointer.y),
        tileY = this.worldXYToTileY(pointer.x, pointer.y);
    if (!this.contains(tileX, tileY)) {
        if (this.input.pointer === pointer) { // Release touch pointer
            this.input.pointer = null;
        }
        return;
    }

    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }

    if ((this.input.tilePosition.x === tileX) && (this.input.tilePosition.y === tileY)) {
        return;
    }
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;
    this.emit('tileup', pointer, this.input.tilePosition);

    tmpChessArray.length = 0;
    var gameObjects = this.tileXYToChessArray(tileX, tileY, tmpChessArray);
    if (gameObjects.length === 0) {
        return;
    }
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (gameObject.emit) {
            gameObject.emit('board.pointermove', pointer);
        }
        this.emit('gameobjectmove', pointer, gameObject);
    }
};

var tmpChessArray = [];

export default SetInteractive;