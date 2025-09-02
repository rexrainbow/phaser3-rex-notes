import Methods from './methods/Methods.js';
import { ClearMask } from '../../../plugins/utils/mask/MaskMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BoardWrapper {
    constructor(scene, config) {
        this.scene = scene;
        this.rexBoard = scene[GetValue(config, 'rexBoard', 'rexBoard')];

        var boardConfig = GetValue(config, 'board', {});
        if (boardConfig.hasOwnProperty('grid')) {
            // Backward compatible
            this.board = this.rexBoard.add.board(boardConfig);

        } else {
            // New version
            var x = GetValue(boardConfig, 'x', 0);
            var y = GetValue(boardConfig, 'y', 0);
            var cellSize = GetValue(boardConfig, 'cellSize', 0);
            var cellWidth = GetValue(boardConfig, 'cellWidth', cellSize);
            var cellHeight = GetValue(boardConfig, 'cellHeight', cellSize);
            var boardWidth = boardConfig.width;
            var boardHeight = boardConfig.height;
            this.board = this.rexBoard.add.board({
                grid: {
                    x: x + (cellWidth / 2),
                    y: y + (cellHeight / 2) - (boardHeight * cellHeight),
                    cellWidth: cellWidth,
                    cellHeight: cellHeight
                }
            })
            this.setActivateBoardWidth(boardWidth).setActivateBoardHeight(boardHeight);
        }


        var matchConfig = config.match || {};

        this.matchAcceptList = matchConfig.accept;
        delete matchConfig.accept;
        this.matchIgnoreList = matchConfig.ignore;
        delete matchConfig.ignore;

        this.match = this.rexBoard.add.match(matchConfig);
        this.match.setBoard(this.board);


        this.initSymbols = GetValue(config, 'initSymbols'); // 2d array
        // configuration of chess
        var chessConfig = config.chess;
        this.chessTileZ = GetValue(chessConfig, 'tileZ', 1);
        this.candidateSymbols = chessConfig.symbols;
        this.chessCallbackScope = chessConfig.scope;
        this.chessCreateCallback = chessConfig.create;
        this.chessMoveTo = chessConfig.moveTo || {};
        this.chessMoveTo.occupiedTest = true;

        // Mask & layer
        this.activateAreaMaskGameObject = undefined;
        this.layer = undefined;

        var layer = GetValue(config, 'layer', false);
        if (layer) {
            this.enableBoardLayer(layer);
        }

        if (GetValue(config, 'mask', true)) {
            this.resetBoardMask();
        }
    }

    shutdown() {
        this.match.destroy();
        this.board.destroy();

        if (this.activateAreaMaskGameObject) {
            ClearMask(this.layer)
            this.activateAreaMaskGameObject.destroy();
        }
        if (this.layer) {
            this.layer.destroy();
        }

        this.board = undefined;
        this.match = undefined;

        this.initSymbols = undefined;
        this.candidateSymbols = undefined;
        this.chessCallbackScope = undefined;
        this.chessCreateCallback = undefined;
        this.chessMoveTo = undefined;

        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setBoardWidth(width) {
        this.board.setBoardWidth(width);
        return this;
    }

    setBoardHeight(height) {
        this.board.setBoardHeight(height);
        return this;
    }

    get activateBoardWidth() {
        return this.board.width;
    }

    get activateBoardHeight() {
        return this.board.height / 2;
    }

    setInitSymbols(symbols) {
        this.initSymbols = symbols; // 2d array
        return this;
    }

    chessToTileXYZ(chess) {
        return this.board.chessToTileXYZ(chess);
    }

    worldXYToChess(worldX, worldY) {
        return this.board.worldXYToChess(worldX, worldY, this.chessTileZ);
    }

    tileXYToChess(tileX, tileY) {
        return this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
    }
}

Object.assign(
    BoardWrapper.prototype,
    Methods
);
export default BoardWrapper;