import 'phaser';
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
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        });

        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 8,
            height: 8
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this);

        var chessA, neighobrChess;
        this.input
            .on('pointerdown', function (pointer) {
                if (chessA) {
                    chessA.destroy();
                    chessA = undefined;
                }
                if (neighobrChess) {
                    neighobrChess.destroy();
                    neighobrChess = undefined;
                }

                var tileXY = board.worldXYToTileXY(pointer.worldX, pointer.worldY);
                if (!board.contains(tileXY.x, tileXY.y)) {
                    return;
                }
                chessA = this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_LIGHT);
            }, this)
            .on('pointerup', function (pointer) {
                if (!chessA) {
                    return;
                }
                var neighborTileXY = board.getNeighborTileXYAtAngle(chessA, pointer.getAngle());
                if (neighborTileXY) {
                    neighobrChess = this.rexBoard.add.shape(board, neighborTileXY.x, neighborTileXY.y, 0, COLOR_PRIMARY);
                }
            }, this)
    }

    update() { }
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
        // size: 30,
        cellWidth: 72,
        cellHeight: 72,
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