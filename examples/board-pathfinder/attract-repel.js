import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // create board
        var config = {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 15,
            height: 15,
            // wrap: true
        }
        var board = new Board(this, config);

        // add chess
        var chessA = new ChessA(board, { x: 1, y: 1 });

        // add attract blockers
        for (var i = 0; i < 5; i++) {
            chessA.addAttractor(
                new Blocker(board, undefined, COLOR_ATTRACT)
            )
        }
        // add repel blockers
        for (var i = 0; i < 5; i++) {
            chessA.addRepelor(
                new Blocker(board, undefined, COLOR_REPEL)
            )
        }
        // add some blockers
        // for (var i = 0; i < 20; i++) {
        //     new Blocker(board);
        // }

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                board.drawPath(chessA.getPath(tileXY));
            })
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
        x: 50,
        y: 50,
        size: 24,
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
                color: COLOR_GRID,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            gridGraphics.strokePoints(points, true);
        });
        scene.add.renderTexture(0, 0, 800, 600)
            .draw(gridGraphics)
            .setDepth(-1);
        gridGraphics.destroy();

        // draw path
        this.pathGraphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_PATH,
                alpha: 1
            }
        })
        this.pathTexture = scene.add.renderTexture(0, 0, 800, 600)
            .setDepth(2);
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
}

class Blocker extends RexPlugins.Board.Shape {
    constructor(board, tileXY, color) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        if (color === undefined) {
            color = COLOR_BLOCKER;
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, color);
        scene.add.existing(this);
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_CHESS);
        scene.add.existing(this);
        this.setDepth(1);

        this.board = board;
        this.attractors = new Phaser.Structs.Set();
        this.repelors = new Phaser.Structs.Set();
        this.factor = 1;

        // add behaviors
        this.pathFinder = scene.rexBoard.add.pathFinder(this, {
            occupiedTest: true,
            pathMode: 'straight',
            costCallback: this.getCost,
            costCallbackScope: this,
        });

        this.textPool = [];
        this.costDisplayTexts = [];
    }

    getPath(endTileXY) {
        for (var i = 0, cnt = this.costDisplayTexts.length; i < cnt; i++) {
            this.costDisplayTexts[i].setVisible(false);
        }
        this.textPool = this.costDisplayTexts;
        this.costDisplayTexts = [];

        var out = [this.board.chessToTileXYZ(this)];
        return this.pathFinder.findPath(endTileXY, undefined, false, out);
    }

    addAttractor(chess) {
        this.attractors.set(chess);
        return this;
    }

    addRepelor(chess) {
        this.repelors.set(chess);
        return this;
    }

    // Cost function of pathFinder
    getCost(curTile, preTile, pathFinder) {
        var board = this.board,
            repelors = this.repelors.entries,
            attractors = this.attractors.entries,
            factor = this.factor;

        var cost = 1;
        for (var i = 0, cnt = repelors.length; i < cnt; i++) {
            cost += factor / board.getDistance(curTile, repelors[i]);
        }
        for (var i = 0, cnt = attractors.length; i < cnt; i++) {
            cost -= factor / board.getDistance(curTile, attractors[i]);
        }

        console.log(`(${curTile.x},${curTile.y}):${cost}`)
        if (cost < 0) {
            cost = 0;
        }

        var worldXY = board.tileXYToWorldXY(curTile.x, curTile.y);
        var displayCost = (Math.floor(cost * 10) / 10).toString();
        var textObject;
        if (this.textPool.length > 0) {
            textObject = this.textPool.pop().setVisible(true);
        } else {
            textObject = this.scene.add.text(0, 0, '', { fontSize: '14px' }).setOrigin(0.5);
        }
        this.costDisplayTexts.push(
            textObject
                .setText(displayCost)
                .setPosition(worldXY.x, worldXY.y)
        )

        return cost;
    }
    // Cost function of pathFinder
}


const COLOR_GRID = 0x320b86;
const COLOR_PATH = 0x9a67ea;
const COLOR_CHESS = 0x6ec6ff;
const COLOR_BLOCKER = 0x00675b;
const COLOR_ATTRACT = 0x5a9216;
const COLOR_REPEL = 0xb0003a;

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