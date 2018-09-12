import Clone from 'rexPlugins/utils/object/Clone.js';

var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    if (!this.input) {
        this.input = {
            enable: true,
            preTileX: undefined,
            preTileY: undefined
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
    return this;
};

var onPointerDown = function (pointer) {
    var tmpTileXY = this.worldXYToTileXY(pointer.x, pointer.y);
    if (!tmpTileXY) {
        return;
    }
    var tileX = tmpTileXY.x,
        tileY = tmpTileXY.y;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('tiledown', pointer, tmpTileXY);

    tmpChess.length = 0;
    var gameObjects = this.tileXYToChess(tileX, tileY, tmpChess);
    if (gameObjects.length === 0) {
        return;
    }
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.emit('gameobjectdown', pointer, gameObjects[i]);
    }

    var inputData = this.input;
    inputData.preTileX = tileX;
    inputData.preTileY = tileY;
};

var onPointerUp = function (pointer) {
    var tmpTileXY = this.worldXYToTileXY(pointer.x, pointer.y);
    if (!tmpTileXY) {
        return;
    }
    var tileX = tmpTileXY.x,
        tileY = tmpTileXY.y;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('tileup', pointer, tmpTileXY);

    tmpChess.length = 0;
    var gameObjects = this.tileXYToChess(tileX, tileY, tmpChess);
    if (gameObjects.length === 0) {
        return;
    }
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.emit('gameobjectup', pointer, gameObjects[i]);
    }
};

var onPointerMove = function (pointer) {
    var tmpTileXY = this.worldXYToTileXY(pointer.x, pointer.y);
    if (!tmpTileXY) {
        return;
    }
    var tileX = tmpTileXY.x,
        tileY = tmpTileXY.y;
    if (!this.contains(tileX, tileY)) {
        return;
    }

    var inputData = this.input;
    if ((inputData.preTileX === tileX) && (inputData.preTileY === tileY)) {
        return;
    }
    this.emit('tilemove', pointer, tmpTileXY);

    tmpChess.length = 0;
    var gameObjects = this.tileXYToChess(tileX, tileY, tmpChess);
    if (gameObjects.length === 0) {
        return;
    }
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.emit('gameobjectmove', pointer, gameObjects[i]);
    }

    var inputData = this.input;
    inputData.preTileX = tileX;
    inputData.preTileY = tileY;
};

var tmpChess = [];

export default SetInteractive;