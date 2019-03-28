import BoardPlugin from '../../plugins/board-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var board = CreateBoard(this, {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 10,
            height: 10,
        });

        // add chess
        var chessA = CreateChessA(board, {
            x: 4,
            y: 4,

            // FOV parameters
            face: 5,

            coneMode: 'direction',
            cone: 2,

            // coneMode: 'angle',
            // cone: 120,

            costCallback: function (tileXY, fov) {
                var board = fov.board;
                return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
            },

            debug: {
                graphics: this.add.graphics().setDepth(10),
                log: true,
            },
        });

        // add some blockers
        for (var i = 0; i < 10; i++) {
            CreateBlocker(board);
        }

        var marker = CreateMarker(board);
        LOS(chessA, marker);
        board
            .setInteractive()
            .on('tileup', function (pointer, tileXY) {
                board.moveChess(marker, tileXY.x, tileXY.y);
                LOS(chessA, marker);
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

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        // size: 32,
        cellWidth: 64,
        cellHeight: 64,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var CreateBoard = function (scene, config) {
    var board = scene.rexBoard.add.board(config);
    // draw grid
    var graphics = scene.add.graphics({
        lineStyle: {
            width: 1,
            color: COLOR_DARK,
            alpha: 1
        }
    });
    board.forEachTileXY(function (tileXY, board) {
        var points = board.getGridPoints(tileXY.x, tileXY.y, true);
        graphics.strokePoints(points, true);

        var scene = board.scene;
        var out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
        scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y)
            .setOrigin(0.5)
            .setDepth(3);
    });
    return board;
}

var CreateBlocker = function (board, tileXY) {
    var scene = board.scene;
    if (tileXY === undefined) {
        tileXY = board.getRandomEmptyTileXY(0);
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    var blocker = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_DARK);
    return blocker;
}

var CreateChessA = function (board, config) {
    var tileX = GetValue(config, 'x', undefined),
        tileY = GetValue(config, 'y', undefined);
    if (tileX === undefined) {
        var tileXY = board.getRandomEmptyTileXY(0, true);
        tileX = tileXY.x;
        tileY = tileXY.y;
    }
    var scene = board.scene;
    var chessA = scene.rexBoard.add.shape(board, tileX, tileY, 0, COLOR_LIGHT)
        .setDepth(1);
    chessA.fov = scene.rexBoard.add.fieldOfView(chessA, config);
    return chessA;
}

var CreateMarker = function (board, tileXY) {
    var scene = board.scene;
    if (tileXY === undefined) {
        tileXY = board.getRandomEmptyTileXY(0);
    }
    var marker = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1)
        .setScale(0.7)
        .setDepth(2);
    return marker;
}

var LOS = function (chessA, marker) {
    var isInLOS = chessA.fov.clearDebugGraphics().isInLOS(marker);
    marker.setFillStyle((isInLOS) ? COLOR_VISIBLE : COLOR_INVISIBLE);
}

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const COLOR_VISIBLE = 0xc49000;
const COLOR_INVISIBLE = 0xc41c00;

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