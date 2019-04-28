import BoardPlugin from '../../plugins/board-plugin.js';
import PathFinder from '../../plugins/board/pathfinder/PathFinder.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Create board
        var config = {
            grid: this.rexBoard.add.hexagonGrid({
                x: 50,
                y: 50,
                size: 24,
                staggeraxis: 'x',
                staggerindex: 'odd'
            }),
            width: 15,
            height: 15,
            // wrap: true
        }
        var board = new Board(this, config);
        // Add chess
        var chessA = new ChessA(board, { x: 7, y: 7 });
        chessA.showMoveableArea();

        // Enable touch events
        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                var chess = this.tileXYZToChess(tileXY.x, tileXY.y, 0);
                if (!chess) {
                    new ChessB(this, tileXY);
                } else if (chess instanceof ChessB) {
                    chess.destroy();
                }
                chessA.showMoveableArea();
            }, board);
    }
}

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_PRIMARY,
                alpha: 1
            }
        })
            .setDepth(1);
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        });
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_LIGHT);
        scene.add.existing(this);

        // add behaviors
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            cacheCost: false,
        });

        // private members
        this._markers = [];
    }

    showMoveableArea() {
        this.hideMoveableArea();

        // Clear dirFlags variable
        var board = this.rexChess.board;
        var chess = board.tileZToChessArray(0);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            chess[i].setData('dirFlags', 0);
        }

        // Get area of 1 step
        var tileXYArray = this.pathFinder.setCostFunction(1).findArea(1);
        // Get area of jumping steps
        this.pathFinder.setCostFunction(function (curTile, preTile, pathFinder) {
            var board = pathFinder.board;
            var dir = board.getNeighborTileDirection(preTile, curTile);
            if ((preTile.pathCost & 1) === 0) { // Even
                // Current tileXY has chess
                if (board.contains(curTile.x, curTile.y, 0)) {
                    // Set dirFlags
                    var chess = board.tileXYZToChess(curTile.x, curTile.y, 0);
                    chess.setData('dirFlags', chess.getData('dirFlags') | (1 << dir));
                    return 1;
                }
            } else { // Odd
                // Current tileXY does not have chess
                if (!board.contains(curTile.x, curTile.y, 0)) {
                    // If dirFlag is 1, in previous chess
                    var preChess = board.tileXYZToChess(preTile.x, preTile.y, 0);
                    var dirFlags = preChess.getData('dirFlags');
                    if ((dirFlags >> dir) & 1) {
                        return 1;
                    }
                }
            }
            return pathFinder.BLOCKER;
        }).findArea(undefined, tileXYArray);

        // Place MoveableMarkers
        var tileXY,
            board = this.rexChess.board;
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            // TileXY already has Chess or MoveableMarker
            if (board.contains(tileXY.x, tileXY.y, 0) || board.contains(tileXY.x, tileXY.y, -1)) {
                continue;
            }
            new MoveableMarker(this, tileXY)
        }
        return this;
    }

    hideMoveableArea() {
        var board = this.rexChess.board;
        var markers = board.tileZToChessArray(-1);
        for (var i = 0, cnt = markers.length; i < cnt; i++) {
            markers[i].destroy();
        }
        return this;
    }
}

class ChessB extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
        scene.add.existing(this);
    }
}

class MoveableMarker extends RexPlugins.Board.Shape {
    constructor(chess, tileXY) {
        var board = chess.rexChess.board;
        var scene = board.scene;
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, -1, COLOR2_DARK);
        scene.add.existing(this);
        this.setScale(0.5);
    }
}

const COLOR_PRIMARY = 0x43a047;
const COLOR_LIGHT = 0x76d275;
const COLOR_DARK = 0x00701a;

const COLOR2_PRIMARY = 0xd81b60;
const COLOR2_LIGHT = 0xff5c8d;
const COLOR2_DARK = 0xa00037;

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