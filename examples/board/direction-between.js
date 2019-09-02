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
        var print = this.add.text(0, 0, '');

        var gridGraphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        });

        var board = this.rexBoard.add.board({
            // grid: getHexagonGrid(this),
            grid: getQuadGrid(this),
            width: 10,
            height: 10
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                gridGraphics.strokePoints(points, true);
            }, this);

        var chess0 = this.rexBoard.add.shape(board, 5, 5, 0, COLOR_LIGHT).setScale(0.7);
        var chess1 = this.rexBoard.add.shape(board, 6, 5, 0, COLOR_PRIMARY).setScale(0.7);
        print.text = board.directionBetween(chess0, chess1, false);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                if (board.contains(tileXY.x, tileXY.y, 0)) {
                    return;
                }

                board.addChess(chess1, tileXY.x, tileXY.y, 0);
                print.text = board.directionBetween(chess0, chess1, false);
            }, this)

    }

    update() { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 100,
        y: 100,
        cellWidth: 50,
        cellHeight: 50,
        type: 0,
        dir: 8,
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        cellWidth: 36,
        cellHeight: 36,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

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