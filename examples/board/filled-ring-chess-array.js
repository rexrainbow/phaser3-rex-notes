import phaser from 'phaser/src/phaser.js';
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
        var gridGraphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        });
        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 16,
            // wrap: true
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                gridGraphics.strokePoints(points, true);
            }, this);

        this.add.renderTexture(0, 0, 800, 600)
            .draw(gridGraphics)
            .setDepth(-1);
        gridGraphics.destroy()

        // create chess
        for (var i = 0; i < 100; i++) {
            var tileXY = board.getRandomEmptyTileXY(0);
            this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0).setFillStyle(COLOR_DARK, 0.75);
        }

        var lastChessArray = [];
        board
            .setInteractive()
            .on('gameobjectdown', function (pointer, gameObject) {
                // Clear selected chess
                for (var i = 0, cnt = lastChessArray.length; i < cnt; i++) {
                    lastChessArray[i].setFillStyle(COLOR_DARK, 0.75);
                }
                lastChessArray.length = 0;

                // Get neighbor chess around target chess
                board.filledRingToChessArray(gameObject, 2, 0, lastChessArray);
                for (var i = 0, cnt = lastChessArray.length; i < cnt; i++) {
                    lastChessArray[i].setFillStyle(COLOR_PRIMARY, 1);
                }
                // Target chess is included in lastChessArray already
                gameObject.setFillStyle(COLOR_LIGHT);
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