import phaser from 'phaser/src/phaser.js';
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
        var board = new Board(this, {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 16,
            wrap: true
        });

        var chessArray = [];
        var targetChess = new ChessA(board);
        chessArray.push(targetChess);

        for (var i = 0; i < 10; i++) {
            chessArray.push(
                new ChessA(board, undefined, COLOR_DARK, targetChess)
            )
        }

        for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
            var chess = chessArray[i];
            this.time.delayedCall(Phaser.Math.Between(0, 1000), chess.wander, undefined, chess);
        }
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
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY, color, followTarget) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        if (color === undefined) {
            color = COLOR_LIGHT;
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, color);
        scene.add.existing(this);

        this.followTarget = followTarget;
        this.followDistance = 5;

        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this, {
            occupiedTest: true
        });
    }

    wander() {
        if (this.moveTo.isRunning) {
            return;
        }

        if (!this.followTarget) {
            this.moveTo
                .once('complete', this.wander, this)
                .moveToRandomNeighbor();

        } else {
            var board = RexPlugins.Board.Board.GetBoard(this);
            var neighborXY = board.mapNeighbors(this, function (tileXY) {
                var neighborX = tileXY.x,
                    neighborY = tileXY.y;
                if (this.moveTo.canMoveTo(neighborX, neighborY)) {
                    return {
                        x: neighborX,
                        y: neighborY,
                        distance: Math.abs(board.getDistance(tileXY, this.followTarget) - this.followDistance),
                    }
                } else {
                    return null;
                }

            }, this)
                .filter(function (item) {
                    return item !== null;
                })

            if (neighborXY.length > 0) {
                neighborXY.sort(function (tileA, tileB) {
                    return tileA.distance - tileB.distance;
                })

                this.moveTo
                    .once('complete', this.wander, this)
                    .moveTo(neighborXY[0]);
            } {
                // Can't move now, try wander later
                this.scene.time.delayedCall(Phaser.Math.Between(0, 100), this.wander, undefined, this);
            }
        }

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