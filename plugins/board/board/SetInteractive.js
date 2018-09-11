'use strict'

import Clone from 'rexPlugins/utils/object/Clone.js';

var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }
    if (!this.input) {
        this.input = {
            enable: true,
            preTouchedChess: [],
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
};

var onPointerDown = function (pointer) {
    if (this.grid === undefined) {
        return;
    }

    var tmpTileXY = this.pointerToTileXY(pointer);
    var tileX = tmpTileXY.x,
        tileY = tmpTileXY.y;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('celldown', this, tileX, tileY);

    tmpChess.length = 0;
    var chess = this.tileXYToChess(tileX, tileY, tmpChess);
    if (chess.length === 0) {
        return;
    }
    Clone(chess, this.input.preTouchedChess);
    for (var i = 0, cnt = chess.length; i < cnt; i++) {
        this.emit('chessdown', this, chess[i]);
        this.emit('chessover', this, chess[i]);
    }
};

var onPointerUp = function (pointer) {
    if (this.grid === undefined) {
        return;
    }

    var tmpTileXY = this.pointerToTileXY(pointer);
    var tileX = tmpTileXY.x,
        tileY = tmpTileXY.y;
    if (!this.contains(tileX, tileY)) {
        return;
    }
    this.emit('cellup', this, tileX, tileY);

    tmpChess.length = 0;
    var chess = this.tileXYToChess(tileX, tileY, tmpChess);
    if (chess.length === 0) {
        return;
    }
    for (var i = 0, cnt = chess.length; i < cnt; i++) {
        this.emit('chessup', this, chess[i]);
        this.emit('chessout', this, chess[i]);
    }
    this.input.preTouchedChess.length = 0;
};

var onPointerMove = function (pointer) {};

var tmpChess = [];

export default SetInteractive;