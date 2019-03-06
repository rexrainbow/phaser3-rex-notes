import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const COLOR_VISIBLE = 0xffff6b;
const COLOR_INVISIBLE = 0xc41c00;

const GetValue = Phaser.Utils.Objects.GetValue;

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
            width: 10,
            height: 10,
            // wrap: true
        }
        var board = new Board(this, config);

        // add chess
        var chessA = new ChessA(board, {
            x: 4,
            y: 4,
            face: 0,
            cone: 120,
            occupiedTest: true
        });
        // add some blockers
        for (var i = 0; i < 10; i++) {
            new Blocker(board);
        }

        var marker = new Marker(board, chessA);
        board
            .setInteractive()
            .on('tilemove', function (pointer, tileXY) {
                marker.setTileXY(tileXY.x, tileXY.y);
            });
    }

    update() {}
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

class Board extends RexPlugins.Board.Board {
    constructor(scene, config) {
        // create board
        super(scene, config);
        // draw grid
        var graphics = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        });
        this.forEachTileXY(function (tileXY, board) {
            var points = board.getGridPoints(tileXY.x, tileXY.y, true);
            graphics.strokePoints(points, true);
        });
    }
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        size: 32,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

class Blocker extends RexPlugins.Board.Shape {
    constructor(board, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
        scene.add.existing(this);
    }
}

class ChessA extends RexPlugins.Board.Shape {
    constructor(board, config) {
        var scene = board.scene;
        var tileX = GetValue(config, 'x', undefined),
            tileY = GetValue(config, 'y', undefined);
        if (tileX === undefined) {
            var tileXY = board.getRandomEmptyTileXY(0, true);
            tileX = tileXY.x;
            tileY = tileXY.y;
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileX, tileY, 0, COLOR_LIGHT);
        scene.add.existing(this);
        this.setDepth(1);

        // add behaviors
        this.fov = scene.rexBoard.add.fieldOfView(this, config);
    }

    isInLOS(chess) {
        return this.fov.isInLOS(chess.rexChess.tileXYZ);
    }
}

class Marker extends RexPlugins.Board.Shape {
    constructor(board, source, tileXY) {
        var scene = board.scene;
        if (tileXY === undefined) {
            tileXY = board.getRandomEmptyTileXY(0);
        }
        // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
        super(board, tileXY.x, tileXY.y, -1);
        scene.add.existing(this);
        this
            .setScale(0.7)
            .setDepth(2);
        this.source = source;
        this.lineGraphics = scene.add.graphics({
                lineStyle: {
                    width: 2,
                    color: 0xff0000,
                    alpha: 1
                }
            })
            .setDepth(2);
        this.setTileXY(tileXY.x, tileXY.y);
    }

    setTileXY(tileX, tileY) {
        var board = this.rexChess.board;
        board.moveChess(this, tileX, tileY);
        var color = (this.source.isInLOS(this)) ? COLOR_VISIBLE : COLOR_INVISIBLE;
        this.setFillStyle(color);

        var myTileXYZ = this.rexChess.tileXYZ;
        var sourceTileXYZ = board.chessToTileXYZ(this.source);
        this.lineGraphics
            .clear()
            .lineBetween(
                board.tileXYToWorldX(myTileXYZ.x, myTileXYZ.y),
                board.tileXYToWorldY(myTileXYZ.x, myTileXYZ.y),
                board.tileXYToWorldX(sourceTileXYZ.x, sourceTileXYZ.y),
                board.tileXYToWorldY(sourceTileXYZ.x, sourceTileXYZ.y)
            );
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