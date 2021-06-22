import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var config = {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 16,
            // wrap: true
        }
        var board = new Board(this, config);

        // create chess       
        for (var i = 0; i < 80; i++) {
            new ChessA(board);
        }

        // click end tileXY
        var chess, pathTileXYArray = [];
        var state = 'IDLE';
        board
            .setInteractive()
            .on('gameobjectdown', function (pointer, gameObject) {
                if (state === 'IDLE') {
                    chess = gameObject;
                    chess.setFillStyle(COLOR_LIGHT);
                    pathTileXYArray.length = 1;
                    pathTileXYArray[0] = board.chessToTileXYZ(chess);
                    state = 'PICK_CHESS';
                }
            })
            .on('tilemove', function (pointer, tileXY) {
                if (state === 'PICK_CHESS') {
                    pathTileXYArray.length = 1;
                    board.drawPath(board.getPath(chess, tileXY, pathTileXYArray));
                }
            })

        this.input
            .on('pointerup', function (pointer, tileXY) {
                if (state === 'PICK_CHESS') {
                    chess
                        .once('move.complete', function () {
                            this
                                .setDepth(0)
                                .setFillStyle(COLOR_DARK);
                            board.clearPath();
                            state = 'IDLE';
                        })
                        .setDepth(1)
                        .moveAlongPath(pathTileXYArray);
                    state = 'MOVE_CHESS';
                }
            })
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 50,
        cellHeight: 25,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        size: 20,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);
        // draw grid
        var gridGraphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        })
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            gridGraphics.strokePoints(points, true);
        })
        scene.add.renderTexture(0, 0, 800, 600)
            .draw(gridGraphics)
            .setDepth(-1);
        gridGraphics.destroy()

        this.pathGraphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_LIGHT,
                alpha: 1
            }
        })
        this.pathTexture = scene.add.renderTexture(0, 0, 800, 600)
            .setDepth(2);

        this.pathFinder = scene.rexBoard.add.pathFinder({
            occupiedTest: true,
            pathMode: 'A*',
        });
    }

    clearPath() {
        this.pathTexture.clear();
        return this;
    }

    drawPath(tileXYArray) {
        this.pathGraphics
            .strokePoints(this.tileXYArrayToWorldXYArray(tileXYArray));
        this.pathTexture
            .clear()
            .draw(this.pathGraphics);
        this.pathGraphics.clear();
        return this;
    }

    getPath(chess, endTileXY, out) {
        return this.pathFinder
            .setChess(chess)
            .findPath(endTileXY, undefined, false, out);
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
        scene.add.existing(this);

        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this);
    }

    moveAlongPath(path) {
        if (path.length === 0) {
            this.emit('move.complete');
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        this.moveTo.moveTo(path.shift());
        return this;
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);