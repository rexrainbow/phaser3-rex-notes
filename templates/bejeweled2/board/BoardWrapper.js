import Methods from './methods/Methods.js';
import { MovingDirectionMap } from '../const.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BoardWrapper {
    constructor(scene, config) {
        this.scene = scene;
        this.rexBoard = scene[GetValue(config, 'rexBoard', 'rexBoard')];

        var boardConfig = GetValue(config, 'board', {});
        var x = GetValue(boardConfig, 'x', 0);
        var y = GetValue(boardConfig, 'y', 0);
        var cellSize = GetValue(boardConfig, 'cellSize', 0);
        var cellWidth = GetValue(boardConfig, 'cellWidth', cellSize);
        var cellHeight = GetValue(boardConfig, 'cellHeight', cellSize);
        this.board = this.rexBoard.add.board({
            grid: {
                x: x - (cellWidth / 2),
                y: y - (cellHeight / 2),
                cellWidth: cellWidth,
                cellHeight: cellHeight
            }
        })
        this.setActivateBoardWidth(boardConfig.width).setActivateBoardHeight(boardConfig.height);

        this.match = this.rexBoard.add.match(GetValue(config, 'match'));
        this.match.setBoard(this.board);

        this.initSymbols = GetValue(config, 'initSymbols'); // 2d array
        // configuration of chess
        this.chessTileZ = GetValue(config, 'chess.tileZ', 1);
        this.candidateSymbols = GetValue(config, 'chess.symbols');
        this.chessCallbackScope = GetValue(config, 'chess.scope');
        this.chessCreateCallback = GetValue(config, 'chess.create');
        this.chessMoveTo = GetValue(config, 'chess.moveTo', {});
        this.chessMoveTo.occupiedTest = true;

        // Mask & layer
        this.activateAreaMaskGameObject = undefined;
        this.activateAreaMask = undefined;
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
            this.layer.setMask();
            this.activateAreaMaskGameObject.destroy();
            this.activateAreaMask.destroy();
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
        return this.board.width - 2;
    }

    get activateBoardHeight() {
        return this.board.height - 2;
    }

    setInitSymbols(symbols) {
        this.initSymbols = symbols; // 2d array
        return this;
    }

    setMovingDirection(direction) {
        if (
            (typeof (direction) === 'string') &&
            MovingDirectionMap.hasOwnProperty(direction)
        ) {
            direction = MovingDirectionMap[direction];
        }

        this.movingDirection = direction;
        return this;
    }

    worldXYToChess(worldX, worldY) {
        return this.board.worldXYToChess(worldX, worldY, this.chessTileZ);
    }

    tileXYToChess(tileX, tileY) {
        return this.board.tileXYZToChess(tileX, tileY, this.chessTileZ);
    }

    getNeighborChessAtAngle(chess, angle) {
        var direction = this.board.angleSnapToDirection(chess, angle);
        return this.getNeighborChessAtDirection(chess, direction);
    }

    getNeighborChessAtDirection(chess, direction) {
        var neighborTileXY = this.board.getNeighborTileXY(chess, direction);
        var neighborChess = (neighborTileXY) ?
            this.board.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, this.chessTileZ) :
            null;
        return neighborChess;
    }
}

Object.assign(
    BoardWrapper.prototype,
    Methods
);
export default BoardWrapper;