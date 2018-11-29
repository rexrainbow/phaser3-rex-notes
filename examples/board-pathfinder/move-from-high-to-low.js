import BoardPlugin from 'rexPlugins/board-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var config = {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8,
            // wrap: true
        }
        var board = new Board(this, config);

        // create chess
        var chessA = new ChessA(board);
        chessA.showMoveableArea();
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        super(scene, config);

        this
            // Fill tiles
            .forEachTileXY(function (tileXY, board) {
                new Tile(board, tileXY);
            })
            // Enable touch events
            .setInteractive();
    }
}

const LevelToColor = [0x388e3c, 0x6abf69];
class Tile extends RexPlugins.Board.Shape {
    constructor(board, tileXY, level) {
        var scene = board.scene;
        if (level === undefined) {
            level = Random(0, 1);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, LevelToColor[level]);
        scene.add.existing(this);
        this.setStrokeStyle(1, 0xffffff);
        this.setData('level', level); // Store level value for cost function
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(1);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 1, 0xfa5788);
        scene.add.existing(this);
        this
            .setScale(0.7)
            .setDepth(1);

        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this);
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            occupiedTest: true,
            pathMode: 'random',
            cost: function (curTile, preTile, pathFinder) {
                var board = pathFinder.board;
                curTile = board.tileXYZToChess(curTile.x, curTile.y, 0);
                preTile = board.tileXYZToChess(preTile.x, preTile.y, 0);
                var curLevel = curTile.getData('level');
                var preLevel = preTile.getData('level');
                return (preLevel >= curLevel) ? 0 : pathFinder.BLOCKER;
            },
            cacheCost: false,
        });

        // private members
        this._markers = [];
    }

    showMoveableArea() {
        this.hideMoveableArea();
        var tileXYArray = this.pathFinder.findArea(1);
        for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            this._markers.push(
                new MoveableMarker(this, tileXYArray[i])
            );
        }
        return this;
    }

    hideMoveableArea() {
        for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
            this._markers[i].destroy();
        }
        this._markers.length = 0;
        return this;
    }

    moveToTile(endTile) {
        if (this.moveTo.isRunning) {
            return false;
        }
        var tileXYArray = this.pathFinder.getPath(endTile.rexChess.tileXYZ);
        this.moveAlongPath(tileXYArray);
        return true;
    }

    moveAlongPath(path) {
        if (path.length === 0) {
            this.showMoveableArea();
            return;
        }

        this.moveTo.once('complete', function () {
            this.moveAlongPath(path);
        }, this);
        this.moveTo.moveTo(path.shift());
        return this;
    }
}


class MoveableMarker extends RexPlugins.Board.Shape {
    constructor(chess, tileXY) {
        var board = chess.rexChess.board;
        var scene = board.scene;
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, -1, 0x8c0032, 0.5);
        scene.add.existing(this);
        this.setScale(0.5);

        // on pointer down, move to this tile
        this.on('board.pointerdown', function () {
            if (!chess.moveToTile(this)) {
                return;
            }
            this.setFillStyle(0x8c0032, 1);
        }, this);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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