import BoardPlugin from '../../plugins/board-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var board = CreateBoard(this, {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 24,
            height: 24,
        })

        // add chess
        var chessA = CreateChessA(board, {
            x: 12,
            y: 12,

            fov: {
                coneMode: 'direction',
                face: 0,
                cone: 2,

                costCallback: function (tileXY, fov) {
                    var board = fov.board;
                    return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 1;
                },

                debug: {
                    graphics: this.add.graphics().setDepth(10),
                },
            },

            pathFinder: {
                costCallback: function (curTile, preTile, pathFinder) {
                    var board = pathFinder.board;
                    var chess = pathFinder.gameObject;
                    var fov = chess.fov;

                    if (board.contains(curTile.x, curTile.y, 0)) {
                        return pathFinder.BLOCKER;
                    }
                    var tileXYB = { x: curTile.x, y: curTile.y }; // curTile is not a plain object
                    var isInCone = board.isDirectionInCone(chess, tileXYB, fov.face, fov.cone);
                    return (isInCone) ? 1 : pathFinder.BLOCKER;
                }
            }
        });

        // add some blockers
        //for (var i = 0; i < 50; i++) {
        //    CreateBlocker(board);
        //}

        // Interactive logic
        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                var chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
                if (!chess) {
                    ClearResult(board, chessA);
                    CreateBlocker(board, tileXY);
                } else if (chess.name === 'blocker') {
                    ClearResult(board, chessA);
                    chess.destroy();
                } else if (chess.name === 'chessA') {
                    FindFOV(chess);
                }
            })
    }

    update() { }
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 20,
        y: 20,
        cellWidth: 32,
        cellHeight: 32,
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
    });
    return board;
}

var CreateBlocker = function (board, tileXY) {
    var scene = board.scene;
    if (tileXY === undefined) {
        tileXY = board.getRandomEmptyTileXY(0);
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    var blocker = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_DARK)
        .setName('blocker');
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
        .setDepth(1)
        .setName('chessA');

    chessA.fov = scene.rexBoard.add.fieldOfView(chessA, GetValue(config, 'fov', undefined));
    chessA.pathFinder = scene.rexBoard.add.pathFinder(chessA, GetValue(config, 'pathFinder', undefined));
    return chessA;
}

var ClearResult = function (board, chessA) {
    var chessArray = board.tileZToChessArray(-1);
    for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
        chessArray[i].destroy();
    }
    chessA.fov.clearDebugGraphics();
}

var FindFOV = function (chessA) {
    var board = chessA.rexChess.board;
    var scene = board.scene;

    ClearResult(board, chessA);

    var tileXYArray = chessA.pathFinder.findArea(10);
    tileXYArray = chessA.fov.LOS(tileXYArray);
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1, COLOR_VISIBLE, 0.5);
    }
}

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const COLOR_VISIBLE = 0xc49000;

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