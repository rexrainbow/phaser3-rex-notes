'use strict'

import BoardData from '../data/BoardData.js';
import ChessData from '../data/ChessData.js';

import SetBoardWidth from './SetBoardWidth.js';
import SetBoardHeight from './SetBoardHeight.js';
import AddChess from './AddChess.js';
import GridAlign from './GridAlign.js';
import RemoveChess from './RemoveChess.js';
import MoveChess from './MoveChess.js';
import SwapChess from './SwapChess.js';
import Contains from './Contains.js';
import ForEachTileXY from './ForEachTileXY.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Board {
    constructor(scene, config) {
        this.scene = scene;
        this.boardData = new BoardData();

        this.setGrid(GetValue(config, 'grid', undefined));
        this.setWrapMode(GetValue(config, 'wrap', false));
        this.setInfinityBoard(GetValue(config, 'inifinity', false));
        this.setBoardWidth(GetValue(config, 'width', 8));
        this.setBoardHeight(GetValue(config, 'height', 8));
    }

    setGrid(grid) {
        this.grid = grid;
        return this;
    }

    setWrapMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.wrapMode = mode;
        return this;
    }

    setInfinityBoard(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.infinityMode = mode;
        return this;
    }

    setBoardSize(width, height) {
        this.setBoardWidth(width);
        this.setBoardHeight(height);
        return this;
    }

    exists(gameObject) {
        // game object or uid
        return this.boardData.exists(this.getChessUID(gameObject));
    }

    tileXYZToChess(tileX, tileY, tileZ) {
        return this.boardData.getChess(tileX, tileY, tileZ);
    }

    tileXYToChess(tileX, tileY) {
        return this.boardData.getChess(tileX, tileY);
    }

    getChessData(gameObject) {
        if (!gameObject.hasOwnProperty('rexChess')) {
            gameObject.rexChess = new ChessData(gameObject);
        }

        return gameObject.rexChess;
    }

    getChessUID(gameObject) {
        // game object or uid
        var uid;
        var type = typeof (gameObject);
        if ((type === 'number') || (type === 'string')) {
            uid = gameObject;
        } else {
            uid = this.getChessData(gameObject).$uid;
        }
        return uid;
    }

    getChessXYZ(gameObject) {
        // game object or uid
        return this.boardData.getChessXYZ(this.getChessUID(gameObject));
    }
}

var methods = {
    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,
    addChess: AddChess,
    gridAlign: GridAlign,
    removeChess: RemoveChess,
    moveChess: MoveChess,
    swapChess: SwapChess,
    forEachTileXY: ForEachTileXY,
    contains: Contains,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;