import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });

        var rexBoardAdd = this.rexBoard.add;
        var board = rexBoardAdd.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 16,
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this)
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                if (!board.isEmptyTileXYZ(tileXY.x, tileXY.y, 0)) {
                    return;
                }

                var color = Phaser.Math.Between(0, 0xffffff)
                var chess = rexBoardAdd.shape(board, tileXY.x, tileXY.y, 0, color);
                for (var i = 0; i < 5; i++) {
                    tileXY = board.getRandomEmptyTileXYInRange(chess, 1, 0);
                    if (!tileXY) {
                        break;
                    }

                    chess = rexBoardAdd.shape(board, tileXY.x, tileXY.y, 0, color);
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