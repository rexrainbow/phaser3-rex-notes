import BoardPlugin from 'rexPlugins/board-plugin.js';

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

        // add chess
        var chessA = new ChessA(board, {
            x: 3,
            y: 3
        });
        // add some blockers
        for (var i = 0; i < 10; i++) {
            new Blocker(board);
        }

        chessA.moveAway(0, 0);
    }
}

var getQuadGrid = function (scene) {
    return {
        gridType: 'quadGrid',
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    };
}

var getHexagonGrid = function (scene) {
    return {
        gridType: 'hexagonGrid',
        x: 100,
        y: 100,
        size: 30,
        staggeraxis: 'x',
        staggerindex: 'odd'
    };
};

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        })
    }
}

class Blocker extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, 0x555555);
        scene.add.existing(this);

        // set blocker
        this.rexChess.setBlocker();
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, 0x00CC00);
        scene.add.existing(this);
        this.setDepth(1);

        // add behaviors        
        this.moveTo = scene.rexBoard.add.moveTo(this, {
            speed: 200,
            blockerTest: true
        });
    }

    moveAway(tileX, tileY) {
        if (this.moveTo.isRunning) {
            return;
        }
        this.moveTo
            .once('complete', function () {
                this.moveAway(tileX, tileY);
            }, this)
            .moveAway(tileX, tileY);
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